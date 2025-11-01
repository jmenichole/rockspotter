<<<<<<< HEAD
# Rock Spotter Deployment Guide

This guide covers deploying the Rock Spotter backend API to various cloud platforms and using Docker.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Variables](#environment-variables)
3. [Docker Deployment](#docker-deployment)
4. [Render Deployment](#render-deployment)
5. [Railway Deployment](#railway-deployment)
6. [Heroku Deployment](#heroku-deployment)
7. [DigitalOcean App Platform](#digitalocean-app-platform)
8. [AWS Elastic Beanstalk](#aws-elastic-beanstalk)
9. [Vercel/Netlify (Serverless)](#vercelnetlify-serverless)
10. [Post-Deployment Checklist](#post-deployment-checklist)

## Prerequisites

- Node.js v14 or higher
- MongoDB database (MongoDB Atlas recommended for production)
- Git
- Account on your chosen deployment platform

## Environment Variables

All deployment platforms require these environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `production` |
| `PORT` | Server port (usually auto-set) | `3000` |
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/rock-spotter` |
| `JWT_SECRET` | Secret key for JWT tokens | `your-random-secret-key-here` |

### Getting MongoDB Connection String

**Option 1: MongoDB Atlas (Recommended)**

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist your IP (or use `0.0.0.0/0` for all IPs)
5. Get connection string from "Connect" button
6. Replace `<password>` with your database password
7. Replace `myFirstDatabase` with `rock-spotter`

**Option 2: Local MongoDB**
```
mongodb://localhost:27017/rock-spotter
```

## Docker Deployment

### Using Docker Compose (Recommended for local/VPS)

The project includes a `docker-compose.yml` that sets up both the API and MongoDB.

1. **Clone the repository:**
```bash
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter
```

2. **Set environment variables:**
Create a `.env` file in the root directory:
```env
JWT_SECRET=your-random-secret-key-here
```

3. **Start services:**
```bash
docker-compose up -d
```

4. **Verify deployment:**
```bash
curl http://localhost:3000/api/health
```

5. **View logs:**
```bash
docker-compose logs -f backend
```

6. **Stop services:**
```bash
docker-compose down
```

### Using Docker Only

1. **Build the image:**
```bash
cd backend
docker build -t rock-spotter-api .
```

2. **Run the container:**
```bash
docker run -d \
  -p 3000:3000 \
  -e MONGODB_URI="your-mongodb-uri" \
  -e JWT_SECRET="your-secret-key" \
  -e NODE_ENV=production \
  --name rock-spotter \
  rock-spotter-api
```

3. **Check status:**
```bash
docker ps
docker logs rock-spotter
```

## Render Deployment

Render offers free hosting for web services and is great for hobby projects.

### Method 1: Using Blueprint (Recommended)

1. **Fork/Clone the repository** to your GitHub account

2. **Create a MongoDB Atlas database** (free tier available)

3. **Deploy to Render:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect `render.yaml` and configure services automatically

4. **Set environment variables:**
   - Go to your web service settings
   - Add `MONGODB_URI` with your MongoDB Atlas connection string
   - `JWT_SECRET` will be auto-generated

5. **Deploy:**
   - Click "Apply" to deploy
   - Wait for deployment to complete
   - Your API will be available at `https://rock-spotter-api.onrender.com`

### Method 2: Manual Setup

1. **Create a new Web Service:**
   - Go to Render Dashboard
   - Click "New" → "Web Service"
   - Connect your repository

2. **Configure the service:**
   - **Name:** `rock-spotter-api`
   - **Environment:** `Node`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Build Command:** `cd backend && npm install`
   - **Start Command:** `cd backend && npm start`

3. **Add environment variables:**
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = `your-mongodb-atlas-uri`
   - `JWT_SECRET` = `your-random-secret-key`

4. **Create the service** and wait for deployment

### Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- First request after inactivity may take 30-60 seconds
- 750 hours/month free (enough for 1 service running 24/7)

## Railway Deployment

Railway offers $5 free credit per month and excellent developer experience.

1. **Install Railway CLI** (optional):
```bash
npm install -g railway
```

2. **Deploy via Dashboard:**
   - Go to [Railway](https://railway.app/)
   - Click "New Project"
   - Choose "Deploy from GitHub repo"
   - Select your repository
   - Railway will detect `railway.json` configuration

3. **Add MongoDB:**
   - Click "New" → "Database" → "Add MongoDB"
   - Railway will automatically set `MONGODB_URI`

4. **Set environment variables:**
   - Go to Variables tab
   - Add `JWT_SECRET`
   - `NODE_ENV` and `PORT` are auto-set

5. **Deploy:**
   - Railway deploys automatically on push
   - Get your URL from Settings → Domains

### CLI Deployment

```bash
# Login
railway login

# Initialize project
cd Rock-Spotter
railway init

# Add MongoDB
railway add

# Set variables
railway variables set JWT_SECRET=your-secret-key

# Deploy
railway up
```

## Heroku Deployment

Heroku is a classic PaaS with free tier (limited).

1. **Install Heroku CLI:**
```bash
npm install -g heroku
```

2. **Login to Heroku:**
```bash
heroku login
```

3. **Create Heroku app:**
```bash
cd Rock-Spotter
heroku create rock-spotter-api
```

4. **Add MongoDB addon:**
```bash
# Option 1: MongoDB Atlas addon (recommended)
heroku addons:create mongolab:sandbox

# Option 2: Set MongoDB URI manually
heroku config:set MONGODB_URI="your-mongodb-atlas-uri"
```

5. **Set environment variables:**
```bash
heroku config:set JWT_SECRET="your-random-secret-key"
heroku config:set NODE_ENV=production
```

6. **Deploy:**
```bash
git push heroku main
```

7. **Open the app:**
```bash
heroku open
heroku logs --tail
```

### Heroku Configuration

The project includes a `Procfile` for Heroku:
```
web: cd backend && npm start
```

## DigitalOcean App Platform

DigitalOcean offers $200 free credit for 60 days.

1. **Create account** at [DigitalOcean](https://www.digitalocean.com/)

2. **Create App:**
   - Go to Apps section
   - Click "Create App"
   - Choose GitHub and select repository
   - Select branch: `main`

3. **Configure app:**
   - **Name:** `rock-spotter-api`
   - **Source Directory:** `backend`
   - **Build Command:** `npm install`
   - **Run Command:** `npm start`
   - **HTTP Port:** `3000`

4. **Add MongoDB:**
   - Create a MongoDB cluster in DigitalOcean
   - Or use MongoDB Atlas
   - Add connection string to environment variables

5. **Set environment variables:**
   ```
   NODE_ENV=production
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   ```

6. **Create resources** and deploy

## AWS Elastic Beanstalk

AWS offers 12 months free tier for new accounts.

1. **Install EB CLI:**
```bash
pip install awsebcli
```

2. **Initialize EB:**
```bash
cd Rock-Spotter
eb init -p node.js rock-spotter-api --region us-west-2
```

3. **Create environment:**
```bash
eb create rock-spotter-env
```

4. **Set environment variables:**
```bash
eb setenv NODE_ENV=production \
  MONGODB_URI="your-mongodb-uri" \
  JWT_SECRET="your-secret-key"
```

5. **Deploy:**
```bash
eb deploy
```

6. **Open app:**
```bash
eb open
eb logs
```

### AWS Configuration

Create `.ebextensions/nodecommand.config`:
```yaml
option_settings:
  aws:elasticbeanstalk:container:nodejs:
    NodeCommand: "cd backend && npm start"
```

## Vercel/Netlify (Serverless)

**Note:** These platforms are optimized for frontend apps and serverless functions. The Rock Spotter backend uses Express with persistent MongoDB connections, which works better on traditional hosting platforms (Render, Railway, Heroku).

If you want to deploy on Vercel/Netlify, you'll need to refactor the backend into serverless functions.

## Post-Deployment Checklist

After deploying to any platform:

### 1. **Test the API**

```bash
# Health check
curl https://your-app-url.com/api/health

# Should return:
# {"status":"ok","message":"Rock Spotter API is running!"}
```

### 2. **Create test user**

```bash
curl -X POST https://your-app-url.com/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. **Test authentication**

```bash
curl -X POST https://your-app-url.com/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 4. **Verify database connection**

Check your platform logs to ensure MongoDB connection is successful:
```
MongoDB connected successfully
Rock Spotter API server running on port 3000
```

### 5. **Set up monitoring** (optional)

- Enable logging in your platform dashboard
- Set up uptime monitoring (e.g., UptimeRobot)
- Configure error tracking (e.g., Sentry)

### 6. **Update CORS** (if needed)

If you have a frontend, update CORS settings in `backend/src/server.js`:
```javascript
app.use(cors({
  origin: ['https://your-frontend-url.com'],
  credentials: true
}));
```

### 7. **Secure your JWT secret**

- Generate a strong random secret
- Never commit secrets to Git
- Use platform secret management

Generate a secure secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 8. **Set up database backups**

- Enable automated backups in MongoDB Atlas
- Schedule regular backup exports
- Test restore procedures

### 9. **Configure custom domain** (optional)

Most platforms allow adding custom domains:
- Add your domain in platform settings
- Update DNS records (CNAME or A record)
- Enable HTTPS/SSL (usually automatic)

### 10. **Update documentation**

Update your README with:
- Production API URL
- API documentation link
- Example requests with production URL

## Common Issues

### Issue: "Cannot connect to MongoDB"

**Solutions:**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format
- Check database user credentials
- Ensure database name is included in URI

### Issue: "Port already in use"

**Solution:** Most platforms auto-set PORT. In server.js:
```javascript
const PORT = process.env.PORT || 3000;
```

### Issue: "JWT authentication fails"

**Solution:** Ensure JWT_SECRET is set and matches on all instances

### Issue: "App crashes after deployment"

**Solutions:**
- Check platform logs for errors
- Verify all dependencies are in `package.json`
- Ensure NODE_ENV is set to "production"
- Check start command is correct

### Issue: "Slow cold starts"

**Solutions:**
- Use paid tier to keep service running
- Implement health check endpoint pinging
- Use CDN for static assets
- Optimize dependencies

## Updating Your Deployment

### Automatic Deployment (CI/CD)

Most platforms support automatic deployment from Git:

1. **Push to main branch:**
```bash
git add .
git commit -m "Update API"
git push origin main
```

2. **Platform auto-deploys** (usually takes 1-3 minutes)

### Manual Deployment

```bash
# Render: Auto-deploys on git push
# Railway: railway up
# Heroku: git push heroku main
# DigitalOcean: Auto-deploys on git push
```

## Scaling Your Application

### Horizontal Scaling

- **Render:** Upgrade plan for multiple instances
- **Railway:** Adjust replicas in settings
- **Heroku:** `heroku ps:scale web=2`

### Vertical Scaling

- Upgrade to larger instance size in platform settings
- Monitor CPU and memory usage
- Consider caching (Redis) for performance

### Database Scaling

- MongoDB Atlas: Upgrade cluster tier
- Enable connection pooling
- Add read replicas for high traffic

## Cost Estimates

| Platform | Free Tier | Paid Tier Starts At |
|----------|-----------|---------------------|
| Render | 750 hrs/month | $7/month |
| Railway | $5 credit/month | $0.000231/GB-hour |
| Heroku | 1000 hrs/month | $7/month |
| DigitalOcean | $200 credit (60 days) | $5/month |
| AWS EB | 12 months free | Varies |
| MongoDB Atlas | 512MB free | $9/month |

## Security Best Practices

1. **Never commit secrets** to Git
2. **Use strong JWT secrets** (32+ random characters)
3. **Enable rate limiting** for API endpoints
4. **Use HTTPS** (usually automatic on platforms)
5. **Keep dependencies updated** (`npm audit`)
6. **Set secure headers** (use `helmet` middleware)
7. **Validate all inputs** (use `express-validator`)
8. **Implement API authentication** for all protected routes
9. **Monitor logs** for suspicious activity
10. **Regular backups** of database

## Support

For deployment issues:
- Check platform documentation
- Review platform status page
- Check GitHub Issues
- Contact platform support

## Next Steps

After successful deployment:
1. ✅ Test all API endpoints
2. ✅ Set up monitoring and alerts
3. ✅ Configure custom domain (optional)
4. ✅ Implement CI/CD pipeline
5. ✅ Set up staging environment
6. ✅ Create mobile app connecting to API
7. ✅ Implement photo upload to cloud storage
8. ✅ Add caching layer (Redis)
9. ✅ Set up API documentation (Swagger)
10. ✅ Implement analytics

---

**Congratulations on deploying Rock Spotter! 🪨🚀**

Your API is now live and ready to serve rock enthusiasts worldwide!
=======
# 🚀 Rock Spotter Deployment Guide

Deploy Rock Spotter to Vercel with MongoDB Atlas for a complete full-stack solution.

## 📋 Prerequisites

- GitHub account
- Vercel account (free tier)
- MongoDB Atlas account (free tier)

## 🎯 Quick Deploy

### Option 1: One-Click Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jmenichole/Rock-Spotter)

### Option 2: Manual Setup

## 🗄️ Database Setup (MongoDB Atlas)

1. **Create MongoDB Atlas Account**
   - Visit [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for free tier (M0 Sandbox - 512 MB)

2. **Create Database Cluster**
   ```bash
   # Cluster Name: rock-spotter
   # Region: Choose closest to your users
   # Tier: M0 Sandbox (Free)
   ```

3. **Configure Database Access**
   - **Database Access** → **Add New Database User**
   - Username: `rockspotter`
   - Password: Generate secure password
   - Database User Privileges: `Read and write to any database`

4. **Configure Network Access**
   - **Network Access** → **Add IP Address**
   - **Allow Access from Anywhere**: `0.0.0.0/0` (for Vercel)
   - **Comment**: "Vercel Deployment Access"

5. **Get Connection String**
   - **Database** → **Connect** → **Connect your application**
   - **Driver**: Node.js
   - **Version**: 4.1 or later
   - Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@rock-spotter.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

## ☁️ Vercel Deployment

### Step 1: Fork Repository
```bash
# Fork this repository to your GitHub account
# https://github.com/jmenichole/Rock-Spotter
```

### Step 2: Connect to Vercel
1. Visit [Vercel Dashboard](https://vercel.com/dashboard)
2. **Import Project** → **Import Git Repository**
3. Select your forked `Rock-Spotter` repository
4. **Framework Preset**: Vite
5. **Root Directory**: Leave blank (uses root)

### Step 3: Configure Environment Variables
In Vercel project settings, add these environment variables:

```bash
# Database
MONGODB_URI=mongodb+srv://rockspotter:<password>@rock-spotter.xxxxx.mongodb.net/rock-spotter?retryWrites=true&w=majority

# JWT Secret (generate a secure random string)
JWT_SECRET=your-super-secure-jwt-secret-key-here

# Node Environment
NODE_ENV=production

# API Configuration
VITE_API_URL=/api
```

### Step 4: Deploy
- Click **Deploy**
- Vercel will automatically build and deploy your app
- Your app will be available at `https://your-project-name.vercel.app`

## 🔧 Environment Variables Explained

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET` | Secret key for JWT token signing | `your-256-bit-secret` |
| `NODE_ENV` | Environment (always `production`) | `production` |
| `VITE_API_URL` | Frontend API URL (relative for Vercel) | `/api` |

## 🛠️ Local Development

### Setup
```bash
# Clone repository
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter

# Install dependencies
cd frontend && npm install
cd ../backend && npm install
cd ../api && npm install

# Create environment files
cp frontend/.env.example frontend/.env.local
cp backend/.env.example backend/.env
```

### Environment Configuration
**Frontend (.env.local):**
```bash
VITE_API_URL=http://localhost:3000/api
```

**Backend (.env):**
```bash
MONGODB_URI=mongodb://localhost:27017/rock-spotter
JWT_SECRET=your-development-jwt-secret
NODE_ENV=development
PORT=3000
```

### Run Development Servers
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend  
cd frontend && npm run dev

# Or use Docker
docker-compose up --build
```

## 📱 GitHub Pages (Static Demo)

For a static portfolio demo without backend functionality:

1. **Enable GitHub Pages**
   - Repository **Settings** → **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (will be created automatically)

2. **Add GitHub Actions Workflow**
   ```yaml
   # .github/workflows/deploy.yml
   name: Deploy to GitHub Pages
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: actions/setup-node@v3
           with:
             node-version: 18
         - run: cd frontend && npm install
         - run: cd frontend && npm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./frontend/dist
   ```

3. **Access Demo**
   - Demo will be available at: `https://jmenichole.github.io/Rock-Spotter/`

## 🔍 Troubleshooting

### Common Issues

**❌ API Connection Failed**
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify connection string format and credentials
- Ensure environment variables are set in Vercel

**❌ Build Failed**
- Check all dependencies are listed in `package.json`
- Verify Node.js version compatibility (18.x)
- Review build logs in Vercel dashboard

**❌ Database Connection Timeout**
- Increase connection timeout in API configuration
- Check MongoDB Atlas cluster status
- Verify network access configuration

### Support Resources

- **MongoDB Atlas Docs**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Contact Developer**: [jmenichole007@outlook.com](mailto:jmenichole007@outlook.com)

## 🎉 Success!

Your Rock Spotter application should now be running at:
- **Production**: `https://your-project-name.vercel.app`
- **API Health**: `https://your-project-name.vercel.app/api/health`

Happy rock spotting! 🪨✨
>>>>>>> origin/main
