const knex = require('knex');
const logger = require('../utils/logger');

// Database configuration
const dbConfig = {
  client: 'postgresql',
  connection: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'smartsports_rwanda',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  },
  pool: {
    min: 2,
    max: 10,
    createTimeoutMillis: 3000,
    acquireTimeoutMillis: 30000,
    idleTimeoutMillis: 30000,
    reapIntervalMillis: 1000,
    createRetryIntervalMillis: 100,
    propagateCreateError: false
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'knex_migrations'
  },
  seeds: {
    directory: './src/database/seeds'
  }
};

// Create database connection
const db = knex(dbConfig);

// Test database connection
async function connectDB() {
  try {
    await db.raw('SELECT 1+1 as result');
    logger.info('✅ PostgreSQL Database connected successfully');
    return db;
  } catch (error) {
    logger.error('❌ Database connection failed:', error.message);
    throw error;
  }
}

// Close database connection
async function closeDB() {
  try {
    await db.destroy();
    logger.info('Database connection closed');
  } catch (error) {
    logger.error('Error closing database connection:', error.message);
  }
}

// Database health check
async function checkDBHealth() {
  try {
    const result = await db.raw('SELECT NOW() as current_time');
    return {
      status: 'healthy',
      timestamp: result.rows[0].current_time,
      connection_count: await db.raw('SELECT count(*) FROM pg_stat_activity WHERE state = ?', ['active'])
    };
  } catch (error) {
    return {
      status: 'unhealthy',
      error: error.message
    };
  }
}

// Transaction wrapper
async function withTransaction(callback) {
  const trx = await db.transaction();
  try {
    const result = await callback(trx);
    await trx.commit();
    return result;
  } catch (error) {
    await trx.rollback();
    throw error;
  }
}

// Common database operations
const dbOperations = {
  // Generic CRUD operations
  async create(table, data) {
    const [result] = await db(table).insert(data).returning('*');
    return result;
  },

  async findById(table, id) {
    return await db(table).where('id', id).first();
  },

  async findOne(table, conditions) {
    return await db(table).where(conditions).first();
  },

  async findMany(table, conditions = {}, options = {}) {
    let query = db(table);
    
    if (Object.keys(conditions).length > 0) {
      query = query.where(conditions);
    }
    
    if (options.orderBy) {
      query = query.orderBy(options.orderBy.column, options.orderBy.direction || 'asc');
    }
    
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.offset(options.offset);
    }
    
    return await query;
  },

  async update(table, id, data) {
    const [result] = await db(table)
      .where('id', id)
      .update({ ...data, updated_at: db.fn.now() })
      .returning('*');
    return result;
  },

  async delete(table, id) {
    return await db(table).where('id', id).del();
  },

  async count(table, conditions = {}) {
    const result = await db(table).where(conditions).count('* as count');
    return parseInt(result[0].count);
  },

  // Pagination helper
  async paginate(table, conditions = {}, page = 1, limit = 10, orderBy = 'created_at', direction = 'desc') {
    const offset = (page - 1) * limit;
    
    const [data, totalCount] = await Promise.all([
      db(table)
        .where(conditions)
        .orderBy(orderBy, direction)
        .limit(limit)
        .offset(offset),
      db(table).where(conditions).count('* as count')
    ]);
    
    const total = parseInt(totalCount[0].count);
    const totalPages = Math.ceil(total / limit);
    
    return {
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      }
    };
  }
};

// Database schema validation
async function validateSchema() {
  try {
    const tables = [
      'users', 'teams', 'venues', 'events', 'tickets', 'payments',
      'wallets', 'wallet_transactions', 'notifications', 'analytics',
      'qr_codes', 'scanner_logs', 'user_sessions'
    ];
    
    for (const table of tables) {
      const exists = await db.schema.hasTable(table);
      if (!exists) {
        logger.warn(`⚠️  Table '${table}' does not exist`);
      }
    }
    
    logger.info('✅ Database schema validation completed');
  } catch (error) {
    logger.error('❌ Database schema validation failed:', error.message);
  }
}

// Export database instance and utilities
module.exports = {
  db,
  connectDB,
  closeDB,
  checkDBHealth,
  withTransaction,
  dbOperations,
  validateSchema
};
