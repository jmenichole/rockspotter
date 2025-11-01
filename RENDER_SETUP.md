# Rock Spotter Backend - Render Deployment

This backend API is designed to run on Render's free tier.

## Quick Deploy to Render

1. **Create Render Account**: Go to [render.com](https://render.com) and sign up
2. **Connect GitHub**: Link your GitHub account 
3. **Create Web Service**: 
   - Repository: `jmenichole/Rock-Spotter`
   - Branch: `main`
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

## Environment Variables for Render

Add these in Render dashboard:

```
NODE_ENV=production
MONGODB_URI=mongodb+srv://rockspotter:wIVyuRnSur6EJHZp@cluster0.0z3jtr.mongodb.net/rock-spotter
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
PORT=10000
```

## Free Tier Limits
- ✅ 512MB RAM
- ✅ Shared CPU  
- ✅ 750 hours/month (always on)
- ✅ Custom domains
- ❌ No hibernation on free tier

## After Deployment
Once deployed on Render, update your Vercel environment variable:
- `VITE_API_URL` = `https://your-render-url.onrender.com/api`

## Estimated Setup Time: 5-10 minutes