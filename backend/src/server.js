const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require('redis');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const { Server } = require('socket.io');
const http = require('http');

require('dotenv').config();
require('express-async-errors');

const logger = require('./utils/logger');
const { errorHandler } = require('./middleware/errorHandler');
const { connectDB } = require('./config/database');
const { connectRedis } = require('./config/redis');

// Import routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');
const ticketRoutes = require('./routes/tickets');
const paymentRoutes = require('./routes/payments');
const reservationRoutes = require('./routes/reservations');
const walletRoutes = require('./routes/wallet');
const teamRoutes = require('./routes/teams');
const venueRoutes = require('./routes/venues');
const analyticsRoutes = require('./routes/analytics');
const notificationRoutes = require('./routes/notifications');
const scannerRoutes = require('./routes/scanner');
const adminRoutes = require('./routes/admin');
const webhookRoutes = require('./routes/webhooks');

// Import security middleware
const {
  rateLimits,
  speedLimiter,
  correlationId,
  requestLogger,
  sanitizeInput,
  securityHeaders,
  suspiciousActivityDetection
} = require('./middleware/security');

// Import monitoring services
const metricsService = require('./services/metricsService');
const healthService = require('./services/healthService');

const app = express();
const server = http.createServer(app);

// Socket.IO setup for real-time features
const io = new Server(server, {
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
    credentials: true
  }
});

// Make io accessible to routes
app.set('io', io);

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'"],
    },
  },
}));

// Apply security middleware
app.use(correlationId);
app.use(securityHeaders);
app.use(sanitizeInput);
app.use(suspiciousActivityDetection);
app.use(speedLimiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Apply general rate limiting
app.use('/api/', rateLimits.general);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(process.env.COOKIE_SECRET));

// Data sanitization
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());

// Compression
app.use(compression());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined', {
    stream: { write: message => logger.info(message.trim()) }
  }));
}

// Request logging middleware
app.use(requestLogger);

// Metrics collection middleware
app.use((req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = (Date.now() - start) / 1000;
    const route = req.route?.path || req.path;

    metricsService.recordHttpRequest(
      req.method,
      route,
      res.statusCode.toString(),
      duration
    );
  });

  next();
});

// Session configuration (for admin dashboard)
let redisClient;
if (process.env.NODE_ENV === 'production') {
  redisClient = createClient({
    url: process.env.REDIS_URL
  });
  
  redisClient.connect().catch(console.error);
  
  app.use(session({
    store: new RedisStore({ client: redisClient }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
  }));
}

// Swagger documentation
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SmartSports Rwanda API',
      version: '1.0.0',
      description: 'Professional Sports Ticketing Platform API',
      contact: {
        name: 'SmartSports Rwanda Team',
        email: 'api@smartsports.rw'
      }
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 5000}/api/v1`,
        description: 'Development server'
      },
      {
        url: 'https://api.smartsports.rw/api/v1',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './src/models/*.js']
};

const specs = swaggerJsdoc(swaggerOptions);
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SmartSports Rwanda API Documentation'
}));

// Health check endpoints
app.get('/health', async (req, res) => {
  try {
    const health = await healthService.runHealthCheck();
    const statusCode = health.status === 'healthy' ? 200 :
                      health.status === 'degraded' ? 200 : 503;

    res.status(statusCode).json(health);
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Detailed health check
app.get('/health/:check', async (req, res) => {
  try {
    const result = await healthService.runHealthCheck(req.params.check);
    const statusCode = result.status === 'healthy' ? 200 : 503;
    res.status(statusCode).json(result);
  } catch (error) {
    res.status(404).json({
      error: error.message
    });
  }
});

// Metrics endpoint for Prometheus
app.get('/metrics', async (req, res) => {
  try {
    const metrics = await metricsService.getMetrics();
    res.set('Content-Type', metricsService.register.contentType);
    res.end(metrics);
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate metrics'
    });
  }
});

// Internal metrics endpoint (JSON format)
app.get('/internal/metrics', async (req, res) => {
  try {
    const metrics = await metricsService.getMetricsJson();
    res.json({
      success: true,
      data: metrics,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to generate metrics'
    });
  }
});

// API routes
const apiVersion = process.env.API_VERSION || 'v1';
app.use(`/api/${apiVersion}/auth`, rateLimits.auth, authRoutes);
app.use(`/api/${apiVersion}/users`, userRoutes);
app.use(`/api/${apiVersion}/events`, eventRoutes);
app.use(`/api/${apiVersion}/tickets`, ticketRoutes);
app.use(`/api/${apiVersion}/payments`, paymentRoutes);
app.use(`/api/${apiVersion}/reservations`, reservationRoutes);
app.use(`/api/${apiVersion}/wallet`, walletRoutes);
app.use(`/api/${apiVersion}/teams`, teamRoutes);
app.use(`/api/${apiVersion}/venues`, venueRoutes);
app.use(`/api/${apiVersion}/analytics`, analyticsRoutes);
app.use(`/api/${apiVersion}/notifications`, notificationRoutes);
app.use(`/api/${apiVersion}/scanner`, scannerRoutes);
app.use(`/api/${apiVersion}/admin`, adminRoutes);
app.use(`/api/${apiVersion}/webhooks`, webhookRoutes);

// 404 handler
app.all('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found`
  });
});

// Global error handler
app.use(errorHandler);

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info(`Client connected: ${socket.id}`);
  
  socket.on('join_room', (room) => {
    socket.join(room);
    logger.info(`Client ${socket.id} joined room: ${room}`);
  });
  
  socket.on('disconnect', () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  logger.info('SIGTERM received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  logger.info('SIGINT received, shutting down gracefully');
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
});

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // For testing purposes, skip database connection
    logger.info('⚠️  Skipping database connection for testing');

    // Skip Redis connection for testing
    logger.info('⚠️  Skipping Redis connection for testing');

    // Start server
    server.listen(PORT, () => {
      logger.info(`🚀 SmartSports Rwanda API Server running on port ${PORT}`);
      logger.info(`📚 API Documentation: http://localhost:${PORT}/api/docs`);
      logger.info(`🏥 Health Check: http://localhost:${PORT}/health`);
      logger.info(`🌍 Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

module.exports = { app, server, io };
