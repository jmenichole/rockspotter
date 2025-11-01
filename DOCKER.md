# 🐳 Docker Setup for Rock Spotter

This directory contains Docker configuration for running Rock Spotter in containers.

## Quick Start

### Prerequisites
- Docker Desktop installed on your machine
- Docker Compose (included with Docker Desktop)

### 🚀 Start the Application

```bash
# Build and start all services
npm run docker:up

# Or use docker-compose directly
docker-compose up -d
```

### 🛑 Stop the Application

```bash
# Stop all services
npm run docker:down

# Or use docker-compose directly
docker-compose down
```

## 📋 Available Commands

```bash
# Start services in detached mode
npm run docker:up

# Stop all services
npm run docker:down

# Build/rebuild images
npm run docker:build
npm run docker:rebuild

# View logs
npm run docker:logs           # All services
npm run docker:logs:backend   # Backend only
npm run docker:logs:db       # MongoDB only

# Check service status
npm run docker:status

# Clean up everything (volumes, images)
npm run docker:clean
```

## 🏗️ Architecture

The Docker setup includes:

- **Backend API** (`rock-spotter-api`)
  - Node.js application
  - Runs on port 3000
  - Connected to MongoDB

- **MongoDB Database** (`rock-spotter-db`)
  - MongoDB 7.0
  - Runs on port 27017
  - Persistent data storage
  - Automatic database initialization

## 🔧 Configuration

### Environment Variables

The application uses these environment variables in Docker:

```env
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb://rockspotter:rocks123@mongodb:27017/rock-spotter?authSource=admin
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
UPLOAD_PATH=/app/uploads
MAX_FILE_SIZE=5242880
```

### Volumes

- `mongodb_data`: Persistent MongoDB data
- `uploads_data`: File uploads storage

## 🧪 Testing the API

Once running, test the API:

```bash
# Health check
curl http://localhost:3000/api/health

# Register a user
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "rockfan",
    "email": "fan@rocks.com", 
    "password": "rocks123"
  }'
```

## 🔍 Monitoring

```bash
# View all service logs
npm run docker:logs

# Check service health
npm run docker:status

# MongoDB shell access
docker exec -it rock-spotter-db mongosh -u rockspotter -p rocks123
```

## 🚀 Deployment

For production deployment:

1. **Change JWT Secret**: Update `JWT_SECRET` in docker-compose.yml
2. **Update MongoDB Credentials**: Change default MongoDB username/password
3. **Configure CORS**: Set appropriate CORS_ORIGIN
4. **SSL/HTTPS**: Add reverse proxy (nginx) for HTTPS
5. **Backup Strategy**: Set up MongoDB backup schedule

### Production Docker Compose Override

Create `docker-compose.prod.yml`:

```yaml
version: '3.8'
services:
  backend:
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
  mongodb:
    environment:
      - MONGO_INITDB_ROOT_USERNAME=${DB_USER}
      - MONGO_INITDB_ROOT_PASSWORD=${DB_PASSWORD}
```

Run with: `docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d`

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Stop local MongoDB/Node.js services first
brew services stop mongodb/brew/mongodb-community
# Kill any node processes on port 3000
lsof -ti:3000 | xargs kill -9
```

**Permission errors:**
```bash
# Fix file permissions
sudo chown -R $(whoami) ./
```

**Database connection issues:**
```bash
# Check MongoDB logs
npm run docker:logs:db

# Restart services
npm run docker:down && npm run docker:up
```

**Clean restart:**
```bash
# Remove all containers, volumes, and images
npm run docker:clean

# Rebuild everything
npm run docker:rebuild
npm run docker:up
```

## 🔐 Security Notes

- Change default JWT secret in production
- Update MongoDB credentials
- Use environment variables for sensitive data
- Consider adding rate limiting
- Implement proper logging
- Set up monitoring and alerts