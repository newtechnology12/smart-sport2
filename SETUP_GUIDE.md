# SmartSports Rwanda - Complete Setup Guide

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- Redis 6+ installed and running
- Git installed

### 1. Clone and Setup Backend

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
# Minimum required:
DB_HOST=localhost
DB_PORT=5432
DB_NAME=smartsports_rwanda
DB_USER=postgres
DB_PASSWORD=your_password
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_super_secret_jwt_key_make_it_very_long_and_secure
```

### 2. Setup Database

```bash
# Create database
createdb smartsports_rwanda

# Run migrations (creates all tables)
npm run migrate

# Optional: Seed with sample data
npm run seed
```

### 3. Start Backend Server

```bash
# Development mode with hot reload
npm run dev

# Server will start on http://localhost:5000
# API Documentation: http://localhost:5000/api/docs
# Health Check: http://localhost:5000/health
```

### 4. Setup Frontend (Main App)

```bash
# Navigate to main app
cd ../

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev

# App will start on http://localhost:3000
```

### 5. Setup Admin Dashboard

```bash
# Navigate to admin dashboard
cd admin-dashboard

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env

# Start admin dashboard
npm run dev

# Admin dashboard will start on http://localhost:5173
```

### 6. Setup Team Dashboard

```bash
# Navigate to team dashboard
cd ../team-dashboard

# Install dependencies
npm install

# Create environment file
echo "VITE_API_URL=http://localhost:5000/api/v1" > .env

# Start team dashboard
npm run dev --port 3002

# Team dashboard will start on http://localhost:3002
```

## 🎯 You're Ready!

**Access Points:**
- **Main App**: http://localhost:3000 (Customer ticketing)
- **Admin Dashboard**: http://localhost:5173 (Super admin)
- **Team Dashboard**: http://localhost:3002 (Team management)
- **API Documentation**: http://localhost:5000/api/docs
- **Backend Health**: http://localhost:5000/health

## 📱 Next Steps

### Immediate Actions:
1. **Test API endpoints** using the Swagger documentation
2. **Create your first admin user** via API
3. **Set up payment provider credentials**
4. **Configure notification services**
5. **Test the complete flow**

### Payment Provider Setup:
1. **MTN MoMo**: Get sandbox credentials from MTN Developer Portal
2. **Airtel Money**: Register with Airtel Money API
3. **RSwitch**: Contact Rwanda Payment Gateway
4. **Stripe**: Create Stripe account for international cards

### Production Deployment:
1. **Set up cloud infrastructure** (AWS, Google Cloud, or Azure)
2. **Configure production databases**
3. **Set up SSL certificates**
4. **Configure monitoring and logging**
5. **Set up CI/CD pipeline**

Ready to proceed with any of these steps!
