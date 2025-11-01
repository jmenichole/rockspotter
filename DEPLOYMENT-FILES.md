# 🚀 Deployment Files Overview

This directory contains all the configuration files needed to deploy Rock Spotter to various platforms.

## 📁 File Structure

```
Rock-Spotter/
├── backend/
│   ├── Dockerfile                   # Docker image configuration
│   ├── .dockerignore               # Files to exclude from Docker build
│   ├── .env.example                # Development environment template
│   └── .env.production.example     # Production environment template
├── docker-compose.yml              # Full stack Docker setup (API + MongoDB)
├── render.yaml                     # Render platform configuration
├── railway.json                    # Railway platform configuration
├── Procfile                        # Heroku/similar platforms configuration
├── deploy-setup.sh                 # Interactive deployment setup script
├── verify-deployment.sh            # Deployment verification script
├── DEPLOYMENT.md                   # Complete deployment guide
└── .github/
    └── workflows/
        └── ci.yml                  # GitHub Actions CI/CD pipeline
```

## 📄 File Descriptions

### Docker Files

#### `backend/Dockerfile`
- **Purpose**: Creates a containerized version of the Rock Spotter API
- **Base Image**: `node:18-alpine` (lightweight Node.js)
- **What it does**:
  - Installs production dependencies only
  - Copies application code
  - Exposes port 3000
  - Sets NODE_ENV to production
  - Runs the API server

**When to use**: 
- Deploying to any platform that supports Docker
- Local development with Docker
- VPS deployments (DigitalOcean, AWS EC2, etc.)

#### `backend/.dockerignore`
- **Purpose**: Excludes unnecessary files from Docker image
- **Excludes**: 
  - `node_modules` (reinstalled in container)
  - `.env` files (set via environment)
  - Git files
  - Development files
  - Logs

**Why it's important**: Keeps Docker images small and fast to build

#### `docker-compose.yml`
- **Purpose**: Orchestrates both API and MongoDB containers
- **Services**:
  - `mongodb`: MongoDB 7.0 database
  - `backend`: Rock Spotter API
- **Features**:
  - Automatic networking between services
  - Persistent data storage for MongoDB
  - Environment variable configuration
  - Port mapping (3000 for API, 27017 for MongoDB)

**When to use**:
- Local development with Docker
- VPS deployments with Docker
- Testing full stack locally
- Production on your own server

**Quick start**:
```bash
docker-compose up -d
```

### Platform Configuration Files

#### `render.yaml`
- **Purpose**: Blueprint for deploying to Render
- **Platform**: [Render.com](https://render.com)
- **Features**:
  - Auto-detects Node.js environment
  - Configures build and start commands
  - Sets up environment variables
  - Includes health check endpoint
  - Free tier available (750 hours/month)

**Deployment**:
1. Push code to GitHub
2. Connect repository to Render
3. Render auto-detects `render.yaml`
4. Add MongoDB connection string
5. Deploy!

#### `railway.json`
- **Purpose**: Configuration for Railway platform
- **Platform**: [Railway.app](https://railway.app)
- **Features**:
  - Uses Nixpacks builder (automatic detection)
  - Custom build and start commands
  - Health check configuration
  - Restart policy
  - Free $5 credit monthly

**Deployment**:
```bash
railway login
railway init
railway up
```

#### `Procfile`
- **Purpose**: Process configuration for Heroku and similar platforms
- **Platform**: Heroku, DigitalOcean App Platform, and others
- **Content**: `web: cd backend && npm start`
- **What it does**: Tells the platform how to start the web server

**Platforms that use Procfile**:
- Heroku
- DigitalOcean App Platform
- Dokku
- Flynn

**Deployment** (Heroku):
```bash
heroku create rock-spotter-api
git push heroku main
```

### Environment Configuration

#### `backend/.env.example`
- **Purpose**: Template for local development
- **Contains**: 
  - PORT=3000
  - MONGODB_URI (localhost)
  - JWT_SECRET (development key)
  - Upload configuration

**Usage**:
```bash
cd backend
cp .env.example .env
# Edit .env with your settings
```

#### `backend/.env.production.example`
- **Purpose**: Template for production deployment
- **Contains**:
  - Production MongoDB URI (MongoDB Atlas)
  - Strong JWT secret
  - CORS configuration
  - Optional services (email, cloud storage)
  - Logging configuration
  - Feature flags

**Usage**: Reference this when setting environment variables in your deployment platform

### Helper Scripts

#### `deploy-setup.sh`
- **Purpose**: Interactive deployment setup wizard
- **Features**:
  - Checks prerequisites (Node.js, npm, git)
  - Guides through deployment options
  - Installs necessary tools
  - Sets up environment variables
  - Provides platform-specific instructions

**Usage**:
```bash
chmod +x deploy-setup.sh
./deploy-setup.sh
```

**Options**:
1. Local Development (local MongoDB)
2. Local Development (Docker)
3. Deploy to Render
4. Deploy to Railway
5. Deploy to Heroku

#### `verify-deployment.sh`
- **Purpose**: Tests deployed API is working
- **Tests**:
  1. Health check endpoint
  2. Root endpoint
  3. User registration
  4. Authentication
  5. Public endpoints (rocks, hunts, achievements)

**Usage**:
```bash
chmod +x verify-deployment.sh
./verify-deployment.sh https://your-api-url.com
```

**Example**:
```bash
./verify-deployment.sh https://rock-spotter-api.onrender.com
```

### CI/CD

#### `.github/workflows/ci.yml`
- **Purpose**: Automated testing and building
- **Triggers**: Push to main/develop, Pull Requests
- **Jobs**:
  1. **test**: Tests backend on Node 16, 18, 20
  2. **docker**: Builds and verifies Docker image
  3. **lint**: Checks code syntax and configuration
- **Features**:
  - MongoDB service for testing
  - Multi-version Node.js testing
  - Docker build verification
  - Syntax checking

**What it does**:
- Runs automatically on every push
- Catches errors before deployment
- Ensures Docker builds work
- Tests on multiple Node versions

## 🎯 Quick Start Guides

### Deploy with Docker (Easiest)

```bash
# Clone repository
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter

# Start with Docker Compose
docker-compose up -d

# Verify
curl http://localhost:3000/api/health
```

### Deploy to Render (Free)

1. **Create MongoDB Atlas database** (free tier)
2. **Fork repository** to your GitHub
3. **Go to Render Dashboard**
4. **New → Blueprint**
5. **Connect repository** (auto-detects `render.yaml`)
6. **Add environment variables**:
   - `MONGODB_URI`: Your MongoDB Atlas URI
   - `JWT_SECRET`: Auto-generated or set manually
7. **Deploy!**

### Deploy to Railway (Fast)

```bash
# Install CLI
npm install -g railway

# Login and init
railway login
railway init

# Add MongoDB
railway add

# Set secret
railway variables set JWT_SECRET=$(openssl rand -hex 32)

# Deploy
railway up
```

### Deploy to Heroku (Classic)

```bash
# Install CLI
npm install -g heroku

# Login and create app
heroku login
heroku create rock-spotter-api

# Add MongoDB
heroku addons:create mongolab:sandbox

# Set environment
heroku config:set JWT_SECRET=$(openssl rand -hex 32)

# Deploy
git push heroku main
```

## 🔐 Security Checklist

Before deploying to production:

- [ ] Change JWT_SECRET to a strong random value (32+ characters)
- [ ] Use MongoDB Atlas or managed database (not local MongoDB)
- [ ] Set NODE_ENV to "production"
- [ ] Never commit `.env` files to Git
- [ ] Use platform secret management for sensitive values
- [ ] Enable HTTPS (usually automatic on platforms)
- [ ] Set up database backups
- [ ] Configure CORS for your frontend domain
- [ ] Enable rate limiting (optional)
- [ ] Set up error monitoring (Sentry, etc.)

## 📊 Platform Comparison

| Platform | Free Tier | Setup Time | Auto-Deploy | MongoDB | Best For |
|----------|-----------|------------|-------------|---------|----------|
| **Render** | 750 hrs/mo | 5 min | ✅ | Need Atlas | Beginners |
| **Railway** | $5 credit | 2 min | ✅ | ✅ Included | Speed |
| **Heroku** | 1000 hrs/mo | 5 min | ✅ | Add-on | Classic |
| **Docker** | N/A | 1 min | ❌ | ✅ Included | Full control |
| **DigitalOcean** | $200/60d | 10 min | ✅ | Separate | Production |

## 🆘 Troubleshooting

### "Cannot connect to MongoDB"
**Solution**: 
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify connection string format
- Ensure database user has correct permissions

### "Port already in use"
**Solution**: 
- Change PORT in environment variables
- Most platforms auto-set PORT (don't hardcode)

### "Build failed"
**Solution**:
- Check platform logs for specific error
- Verify all dependencies in `package.json`
- Ensure build command is correct

### "API returns 502/503"
**Solution**:
- Check if database is connected
- Verify environment variables are set
- Review application logs
- Ensure health check endpoint works

## 📚 Additional Resources

- **[DEPLOYMENT.md](DEPLOYMENT.md)**: Complete deployment guide with step-by-step instructions
- **[README.md](README.md)**: Project overview and features
- **[QUICKSTART.md](QUICKSTART.md)**: Get started in 5 minutes
- **[backend/README.md](backend/README.md)**: API documentation

## 🤝 Contributing

Found an issue with deployment? Please:
1. Check existing issues
2. Create a new issue with:
   - Platform name
   - Error messages
   - Steps to reproduce
   - Your environment details

## 📞 Support

Need help deploying?
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for detailed guides
- Run `./deploy-setup.sh` for interactive help
- Review platform documentation
- Open a GitHub issue

---

**Happy Deploying! 🚀🪨**

Choose your platform, follow the guide, and get your Rock Spotter API live in minutes!
