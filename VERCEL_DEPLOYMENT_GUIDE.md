# 🚀 Rock Spotter Vercel Deployment Guide

## ✅ Pre-Deployment Checklist
- ✅ MongoDB Atlas configured and active
- ✅ Environment variables ready
- ✅ Frontend builds successfully
- ✅ API routes configured for serverless

## 🎯 Step-by-Step Deployment

### Step 1: Push to GitHub (if not already done)
```bash
# Make sure all changes are committed
git add .
git commit -m "Prepare Rock Spotter for Vercel deployment"
git push origin main
```

### Step 2: Vercel Account Setup
1. **Go to vercel.com** (opened in browser)
2. **Sign up with GitHub** (recommended for easy integration)
3. **Authorize Vercel** to access your repositories

### Step 3: Import Rock Spotter Project
1. **Click "Add New..." → "Project"**
2. **Find and select** your `Rock-Spotter` repository
3. **Framework Preset**: Should auto-detect as **Vite**
4. **Root Directory**: Leave blank
5. **Build Command**: `cd frontend && npm run build`
6. **Output Directory**: `frontend/dist`
7. **Install Command**: `cd frontend && npm install`

### Step 4: Configure Environment Variables
**CRITICAL**: Add these environment variables in Vercel:

| Variable | Value |
|----------|-------|
| `MONGODB_URI` | `mongodb+srv://USERNAME:PASSWORD@YOUR-CLUSTER.mongodb.net/rock-spotter?retryWrites=true&w=majority` |
| `JWT_SECRET` | `YOUR-SECURE-JWT-SECRET-KEY-HERE` |
| `NODE_ENV` | `production` |
| `VITE_API_URL` | `/api` |

**How to add variables:**
- In project settings → "Environment Variables"
- Add each variable individually
- Set environment: **Production**, **Preview**, **Development**

### Step 5: Deploy
1. **Click "Deploy"**
2. **Wait for build** (2-3 minutes)
3. **Success!** Your app will be live

### Step 6: Test Deployment
Visit your deployed URLs:
- **Frontend**: `https://your-project-name.vercel.app`
- **API Health**: `https://your-project-name.vercel.app/api/health`
- **Test Registration**: Create a new account

## 🎉 Expected Results
- ✅ Frontend loads with Rock Spotter theme
- ✅ API health check returns "ok"
- ✅ User registration/login works
- ✅ MongoDB Atlas connection successful
- ✅ Rock posts can be created and viewed

## 🔧 If Issues Occur
1. **Check build logs** in Vercel dashboard
2. **Verify environment variables** are set correctly
3. **Check function logs** for API errors
4. **MongoDB Atlas connection** should work (unlike local)

## 📱 Bonus: GitHub Pages Demo
Your GitHub Actions will automatically deploy a static demo to:
`https://jmenichole.github.io/Rock-Spotter`

Ready to deploy? Let's do this! 🚀