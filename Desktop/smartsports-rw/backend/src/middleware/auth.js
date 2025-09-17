const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { db } = require('../config/database');
const { cache } = require('../config/redis');
const logger = require('../utils/logger');

// Generate JWT token
const generateToken = (payload, expiresIn = process.env.JWT_EXPIRE || '7d') => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Generate refresh token
const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { 
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' 
  });
};

// Verify JWT token
const verifyToken = (token, secret = process.env.JWT_SECRET) => {
  return jwt.verify(token, secret);
};

// Hash password
const hashPassword = async (password) => {
  const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;
  return await bcrypt.hash(password, saltRounds);
};

// Compare password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Authentication middleware
const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access token required'
      });
    }
    
    const token = authHeader.substring(7);
    
    // Check if token is blacklisted
    const isBlacklisted = await cache.get(`blacklist:${token}`);
    if (isBlacklisted) {
      return res.status(401).json({
        success: false,
        message: 'Token has been revoked'
      });
    }
    
    // Verify token
    const decoded = verifyToken(token);
    
    // Get user from database
    const user = await db('users')
      .where({ id: decoded.userId, status: 'active' })
      .first();
    
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User not found or inactive'
      });
    }
    
    // Check if user account is locked
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return res.status(423).json({
        success: false,
        message: 'Account is temporarily locked'
      });
    }
    
    // Add user to request object
    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      verified: user.email_verified && user.phone_verified
    };
    
    // Update last activity
    await db('users')
      .where({ id: user.id })
      .update({ 
        last_login: new Date(),
        last_login_ip: req.ip
      });
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }
    
    logger.error('Authentication error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication failed'
    });
  }
};

// Authorization middleware - check user roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required'
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions'
      });
    }
    
    next();
  };
};

// Verify email/phone middleware
const requireVerification = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: 'Authentication required'
    });
  }
  
  if (!req.user.verified) {
    return res.status(403).json({
      success: false,
      message: 'Email and phone verification required'
    });
  }
  
  next();
};

// Team admin authorization - check if user can manage specific team
const authorizeTeamAdmin = async (req, res, next) => {
  try {
    const teamId = req.params.teamId || req.body.teamId;
    
    if (!teamId) {
      return res.status(400).json({
        success: false,
        message: 'Team ID required'
      });
    }
    
    // Super admin can access any team
    if (req.user.role === 'super_admin') {
      return next();
    }
    
    // Check if user is team admin for this specific team
    const team = await db('teams')
      .where({ id: teamId })
      .first();
    
    if (!team) {
      return res.status(404).json({
        success: false,
        message: 'Team not found'
      });
    }
    
    // Check if user is owner, manager, or in admin_users array
    const isAuthorized = team.owner_id === req.user.id ||
                        team.manager_id === req.user.id ||
                        (team.admin_users && team.admin_users.includes(req.user.id));
    
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to manage this team'
      });
    }
    
    req.team = team;
    next();
  } catch (error) {
    logger.error('Team authorization error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authorization failed'
    });
  }
};

// Venue admin authorization
const authorizeVenueAdmin = async (req, res, next) => {
  try {
    const venueId = req.params.venueId || req.body.venueId;
    
    if (!venueId) {
      return res.status(400).json({
        success: false,
        message: 'Venue ID required'
      });
    }
    
    // Super admin can access any venue
    if (req.user.role === 'super_admin') {
      return next();
    }
    
    const venue = await db('venues')
      .where({ id: venueId })
      .first();
    
    if (!venue) {
      return res.status(404).json({
        success: false,
        message: 'Venue not found'
      });
    }
    
    const isAuthorized = venue.owner_id === req.user.id ||
                        venue.manager_id === req.user.id ||
                        (venue.admin_users && venue.admin_users.includes(req.user.id));
    
    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to manage this venue'
      });
    }
    
    req.venue = venue;
    next();
  } catch (error) {
    logger.error('Venue authorization error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authorization failed'
    });
  }
};

// Rate limiting for sensitive operations
const sensitiveOperationLimit = async (req, res, next) => {
  try {
    const key = `sensitive:${req.user.id}:${req.route.path}`;
    const limit = 5; // 5 attempts
    const window = 3600; // 1 hour
    
    const current = await cache.incr(key);
    if (current === 1) {
      await cache.expire(key, window);
    }
    
    if (current > limit) {
      return res.status(429).json({
        success: false,
        message: 'Too many attempts. Please try again later.'
      });
    }
    
    next();
  } catch (error) {
    logger.error('Rate limiting error:', error);
    next(); // Continue on error
  }
};

// Blacklist token (for logout)
const blacklistToken = async (token) => {
  try {
    const decoded = verifyToken(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
    
    if (expiresIn > 0) {
      await cache.set(`blacklist:${token}`, true, expiresIn);
    }
  } catch (error) {
    logger.error('Token blacklist error:', error);
  }
};

module.exports = {
  generateToken,
  generateRefreshToken,
  verifyToken,
  hashPassword,
  comparePassword,
  authenticate,
  authorize,
  requireVerification,
  authorizeTeamAdmin,
  authorizeVenueAdmin,
  sensitiveOperationLimit,
  blacklistToken
};
