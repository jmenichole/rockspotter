# 🚀 Rock Spotter Production Deployment Guide

## Option 1: Vercel Full-Stack (Recommended)

### Prerequisites
- MongoDB Atlas account and database
- Vercel account
- Node.js 18+ installed

### Step 1: Prepare MongoDB Atlas
1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a cluster (if you haven't already)
3. Create a database user with read/write permissions
4. Whitelist all IP addresses (0.0.0.0/0) for serverless deployment
5. Get your connection string: `mongodb+srv://username:password@cluster.mongodb.net/rockspotter`

### Step 2: Deploy to Vercel
```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy from your project root
vercel --prod
```

### Step 3: Configure Environment Variables
In your Vercel dashboard (https://vercel.com/dashboard):

1. Go to your project → Settings → Environment Variables
2. Add these variables:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rockspotter
JWT_SECRET=your_super_secure_random_32_character_string
NODE_ENV=production
```

### Step 4: Update API Configuration
Your API is already configured to work with Vercel serverless functions.

---

## Option 2: Railway (Alternative)

### Prerequisites
- GitHub account
- Railway account

### Steps
1. Go to [Railway](https://railway.app/)
2. Connect your GitHub account
3. Deploy from GitHub repository
4. Add environment variables in Railway dashboard
5. Railway will auto-detect and deploy both frontend and backend

---

## Option 3: DigitalOcean App Platform

### Prerequisites
- DigitalOcean account
- MongoDB Atlas or DigitalOcean Managed Database

### Steps
1. Go to DigitalOcean App Platform
2. Connect your GitHub repository
3. Configure build settings:
   - **Frontend**: Static Site, build command: `cd frontend && npm run build`, output: `frontend/dist`
   - **Backend**: Web Service, build command: `cd backend && npm install`, run command: `npm start`
4. Add environment variables
5. Deploy

---

## Option 4: Self-Hosted VPS

### Prerequisites
- VPS (Ubuntu/Debian recommended)
- Domain name (optional)
- SSH access

### Steps
1. Set up server with Node.js, Nginx, and PM2
2. Clone repository and install dependencies
3. Configure environment variables
4. Set up reverse proxy with Nginx
5. Use PM2 for process management
6. Configure SSL with Let's Encrypt

---

## 🔧 Environment Variables Required

All deployment options need these environment variables:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_secret
NODE_ENV=production
FRONTEND_URL=your_frontend_domain
CORS_ORIGINS=your_frontend_domain
```

---

## 🧪 Testing Your Deployment

1. **API Health Check**: Visit `https://your-domain.com/api/health`
2. **Frontend Load**: Visit `https://your-domain.com`
3. **Authentication**: Try registering/logging in
4. **Database**: Create a test rock post
5. **Features**: Test all main features (albums, hunts, etc.)

---

## 🛠️ Troubleshooting

### Common Issues:

1. **API 500 Errors**: Check MongoDB connection string and network access
2. **CORS Errors**: Update CORS_ORIGINS environment variable
3. **Frontend 404s**: Ensure SPA routing is configured
4. **Auth Issues**: Verify JWT_SECRET is set and consistent

### Debug Steps:
1. Check Vercel function logs in dashboard
2. Test API endpoints with Postman/curl
3. Check browser console for errors
4. Verify environment variables are set correctly

---

## 📱 Mobile App Deployment (Future)

Your React Native mobile app can be deployed to:
- **iOS**: Apple App Store (requires Apple Developer account)
- **Android**: Google Play Store (requires Google Play Developer account)
- **Expo**: Quick deployment with Expo Go app

---

## 💰 Cost Estimates

### Vercel (Recommended)
- **Free Tier**: Perfect for getting started
- **Pro**: $20/month for custom domains and more bandwidth

### Railway
- **Free Tier**: $5 worth of usage monthly
- **Pro**: $20/month unlimited usage

### DigitalOcean
- **Basic Droplet**: $5/month
- **App Platform**: $5-12/month depending on usage

### MongoDB Atlas
- **Free Tier**: 512MB storage (perfect for testing)
- **Shared**: $9/month for 2GB-5GB storage

---

## 🎯 Recommended Setup for Production

**Best Option**: Vercel + MongoDB Atlas
- Total cost: $0-29/month depending on usage
- Automatic scaling
- Built-in CDN
- Easy deployment
- Great performance