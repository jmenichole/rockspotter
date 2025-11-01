# ☁️ Vercel Deployment Checklist

## Prerequisites
- [ ] MongoDB Atlas setup completed (see MONGODB_SETUP.md)
- [ ] GitHub account
- [ ] Vercel account (free)

## Step 1: Prepare Repository
- [ ] Fork this repository to your GitHub account
- [ ] Or push your local changes to your own repository

## Step 2: Connect to Vercel
- [ ] Sign up/login at vercel.com (use GitHub login for convenience)
- [ ] Click "Add New..." → "Project"
- [ ] Import your Rock-Spotter repository
- [ ] Framework Preset: **Vite** (should auto-detect)
- [ ] Root Directory: **Leave blank**

## Step 3: Configure Environment Variables
Before deploying, add these environment variables in Vercel:

### Required Environment Variables:
```bash
MONGODB_URI=mongodb+srv://rockspotter:<your-password>@rock-spotter.xxxxx.mongodb.net/rock-spotter?retryWrites=true&w=majority
JWT_SECRET=your-super-secure-random-string-here
NODE_ENV=production
VITE_API_URL=/api
```

### How to Add Environment Variables in Vercel:
- [ ] In your project settings, go to "Environment Variables"
- [ ] Add each variable one by one
- [ ] Set Environment: **Production**, **Preview**, **Development** (all)

## Step 4: Deploy
- [ ] Click "Deploy"
- [ ] Wait for build to complete (2-3 minutes)
- [ ] Your app will be live at: `https://your-project-name.vercel.app`

## Step 5: Test Your Deployment
- [ ] Visit your deployed URL
- [ ] Check API health: `https://your-project-name.vercel.app/api/health`
- [ ] Try registering a new account
- [ ] Test creating a rock post

## 🎉 Success URLs:
- **Frontend**: `https://your-project-name.vercel.app`
- **API Health**: `https://your-project-name.vercel.app/api/health`
- **GitHub Pages Demo**: `https://jmenichole.github.io/Rock-Spotter`