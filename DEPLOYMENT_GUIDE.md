# SmartSports Rwanda - Professional Deployment Guide

## 🚀 Overview

This guide provides comprehensive instructions for deploying SmartSports Rwanda in both development and production environments using Docker containers.

## 📋 Prerequisites

### System Requirements
- **Docker**: Version 20.10 or higher
- **Docker Compose**: Version 2.0 or higher
- **Git**: Latest version
- **Node.js**: Version 18 or higher (for local development)

### Hardware Requirements

#### Development Environment
- **RAM**: Minimum 8GB, Recommended 16GB
- **CPU**: 2+ cores
- **Storage**: 20GB free space
- **Network**: Stable internet connection

#### Production Environment
- **RAM**: Minimum 16GB, Recommended 32GB
- **CPU**: 4+ cores, Recommended 8+ cores
- **Storage**: 100GB+ SSD storage
- **Network**: High-speed internet with static IP
- **SSL Certificate**: For HTTPS (Let's Encrypt recommended)

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/newtechnology12/smart-sport2.git
cd smart-sport2
```

### 2. Environment Configuration

#### Development Environment
```bash
# Copy development environment template
cp .env.development .env

# Edit the environment file
nano .env
```

#### Production Environment
```bash
# Copy production environment template
cp .env.production .env

# Edit with your production values
nano .env
```

**Important**: Update all placeholder values in the environment file:
- Database passwords
- JWT secrets
- API keys
- Email/SMS credentials
- Payment gateway credentials

### 3. SSL Certificate Setup (Production Only)

Create SSL certificates directory:
```bash
mkdir -p nginx/ssl
```

#### Option A: Let's Encrypt (Recommended)
```bash
# Install certbot
sudo apt-get install certbot

# Generate certificates
sudo certbot certonly --standalone -d smartsports.rw -d www.smartsports.rw

# Copy certificates
sudo cp /etc/letsencrypt/live/smartsports.rw/fullchain.pem nginx/ssl/smartsports.rw.crt
sudo cp /etc/letsencrypt/live/smartsports.rw/privkey.pem nginx/ssl/smartsports.rw.key
```

#### Option B: Self-Signed (Development/Testing)
```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout nginx/ssl/smartsports.rw.key \
  -out nginx/ssl/smartsports.rw.crt
```

## 🚀 Deployment Methods

### Method 1: Using Deployment Scripts (Recommended)

#### Linux/macOS
```bash
# Make script executable
chmod +x deploy.sh

# Development deployment
./deploy.sh development start

# Production deployment
./deploy.sh production deploy
```

#### Windows PowerShell
```powershell
# Development deployment
.\deploy-docker.ps1 -Environment development -Action start

# Production deployment
.\deploy-docker.ps1 -Environment production -Action deploy
```

### Method 2: Manual Docker Compose

#### Development
```bash
# Start development environment
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

#### Production
```bash
# Start production environment
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f

# Stop services
docker-compose -f docker-compose.prod.yml down
```

## 🔧 Configuration Details

### Database Configuration

The application uses PostgreSQL with the following default settings:

**Development:**
- Host: localhost (or postgres container)
- Port: 5432
- Database: smartsports_dev
- User: smartsports
- Password: smartsports_dev_password

**Production:**
- Host: postgres container
- Port: 5432
- Database: smartsports_prod
- User: smartsports
- Password: (set in .env file)

### Redis Configuration

Redis is used for caching and session management:

**Development:**
- Host: localhost (or redis container)
- Port: 6379
- Password: (none)

**Production:**
- Host: redis container
- Port: 6379
- Password: (set in .env file)

### Environment Variables

Key environment variables to configure:

```bash
# Database
DB_HOST=postgres
DB_PORT=5432
DB_NAME=smartsports_prod
DB_USER=smartsports
DB_PASSWORD=your-secure-password

# JWT Security
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_REFRESH_SECRET=your-super-secure-refresh-secret-key

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Payment Gateway
PAYMENT_API_KEY=your-payment-api-key
PAYMENT_SECRET=your-payment-secret
```

## 🌐 Service URLs

### Development Environment
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Documentation**: http://localhost:5000/api-docs
- **Database**: localhost:5432
- **Redis**: localhost:6379

### Production Environment
- **Frontend**: https://smartsports.rw
- **Backend API**: https://api.smartsports.rw
- **API Documentation**: https://api.smartsports.rw/api-docs

## 🔍 Health Checks & Monitoring

### Health Check Endpoints
- **Backend Health**: `/health`
- **API Status**: `/api/v1/status`

### Monitoring Commands
```bash
# Check service status
docker-compose ps

# View real-time logs
docker-compose logs -f

# Check resource usage
docker stats

# Health check
curl -f http://localhost:5000/health
```

### Optional Monitoring Stack
Enable Prometheus and Grafana monitoring:
```bash
# Start with monitoring
docker-compose --profile monitoring up -d

# Access Grafana
# URL: http://localhost:3001
# Default: admin/admin
```

## 🔒 Security Considerations

### Production Security Checklist
- [ ] Strong database passwords
- [ ] Secure JWT secrets (32+ characters)
- [ ] SSL certificates properly configured
- [ ] Firewall rules configured
- [ ] Regular security updates
- [ ] Backup strategy implemented
- [ ] Rate limiting enabled
- [ ] CORS properly configured

### Firewall Configuration
```bash
# Allow HTTP and HTTPS
sudo ufw allow 80
sudo ufw allow 443

# Allow SSH (if needed)
sudo ufw allow 22

# Enable firewall
sudo ufw enable
```

## 📊 Performance Optimization

### Production Optimizations
- Multi-stage Docker builds
- Image layer caching
- Resource limits and reservations
- Database connection pooling
- Redis caching
- Nginx load balancing
- Gzip compression

### Scaling Considerations
- Horizontal scaling with multiple replicas
- Load balancer configuration
- Database read replicas
- CDN for static assets
- Monitoring and alerting

## 🔄 Backup & Recovery

### Database Backup
```bash
# Create backup
docker-compose exec postgres pg_dump -U smartsports smartsports_prod > backup.sql

# Restore backup
docker-compose exec -T postgres psql -U smartsports smartsports_prod < backup.sql
```

### Full System Backup
```bash
# Backup volumes
docker run --rm -v smartsports_postgres_data:/data -v $(pwd):/backup alpine tar czf /backup/postgres_backup.tar.gz /data
docker run --rm -v smartsports_redis_data:/data -v $(pwd):/backup alpine tar czf /backup/redis_backup.tar.gz /data
```

## 🚨 Troubleshooting

### Common Issues

#### 1. Port Already in Use
```bash
# Find process using port
sudo lsof -i :3000
sudo lsof -i :5000

# Kill process
sudo kill -9 <PID>
```

#### 2. Database Connection Issues
```bash
# Check database logs
docker-compose logs postgres

# Test database connection
docker-compose exec postgres psql -U smartsports -d smartsports_prod
```

#### 3. Memory Issues
```bash
# Check memory usage
docker stats

# Increase Docker memory limit in Docker Desktop
```

#### 4. SSL Certificate Issues
```bash
# Check certificate validity
openssl x509 -in nginx/ssl/smartsports.rw.crt -text -noout

# Renew Let's Encrypt certificate
sudo certbot renew
```

### Log Locations
- **Application logs**: `backend/logs/`
- **Nginx logs**: `nginx_logs` volume
- **Container logs**: `docker-compose logs <service>`

## 📞 Support

For deployment issues or questions:
1. Check the troubleshooting section above
2. Review container logs: `docker-compose logs`
3. Verify environment configuration
4. Check system resources and requirements

## 🔄 Updates & Maintenance

### Regular Maintenance Tasks
- Update Docker images
- Renew SSL certificates
- Database maintenance
- Log rotation
- Security updates
- Performance monitoring

### Update Process
```bash
# Pull latest code
git pull origin main

# Rebuild and redeploy
./deploy.sh production deploy
```

This deployment guide ensures a professional, secure, and scalable deployment of SmartSports Rwanda.
