# 🚀 Vercel Deployment Steps for Rock Spotter

This guide will walk you through deploying Rock Spotter to Vercel.

## Prerequisites

- GitHub account with access to the Rock Spotter repository
- Vercel account (free tier is sufficient) - sign up at [vercel.com](https://vercel.com)
- MongoDB Atlas account (free tier) - sign up at [mongodb.com/atlas](https://www.mongodb.com/atlas)

## Step 1: Prepare MongoDB Atlas

1. **Create a MongoDB Atlas cluster** (if not already done):
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free M0 cluster
   - Choose a cloud provider and region close to your users

2. **Create database user**:
   - Navigate to "Database Access"
   - Click "Add New Database User"
   - Create username and secure password (save these!)
   - Set privileges to "Read and write to any database"

3. **Configure network access**:
   - Navigate to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - This is necessary for Vercel serverless functions

4. **Get connection string**:
   - Navigate to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string (it looks like):
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your credentials
   - Add database name: `rock-spotter` after `.net/`
   - Final format: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/rock-spotter?retryWrites=true&w=majority`

## Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**:
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Sign in with your GitHub account

2. **Import Rock Spotter project**:
   - Click "Add New..." → "Project"
   - Select your Rock Spotter repository from the list
   - Click "Import"

3. **Configure project settings**:
   Vercel should auto-detect the configuration from `vercel.json`, but verify:
   - **Framework Preset**: Other (vercel.json will handle this)
   - **Root Directory**: Leave blank (uses repository root)
   - **Build Command**: Handled by vercel.json
   - **Output Directory**: Handled by vercel.json

4. **Add environment variables**:
   Click "Environment Variables" and add the following:

   | Variable | Value | Description |
   |----------|-------|-------------|
   | `MONGODB_URI` | Your MongoDB Atlas connection string | Database connection |
   | `JWT_SECRET` | Generate a random 64-character string | Token signing key |
   | `NODE_ENV` | `production` | Environment mode |
   | `VITE_API_URL` | `/api` | API endpoint for frontend |

   **To generate JWT_SECRET**, run this in your terminal:
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for the build to complete
   - Your app will be available at: `https://your-project-name.vercel.app`

## Step 3: Verify Deployment

1. **Test the frontend**:
   - Visit your deployment URL: `https://your-project-name.vercel.app`
   - You should see the Rock Spotter homepage

2. **Test the API**:
   - Visit: `https://your-project-name.vercel.app/api/health`
   - You should see a JSON response with status "ok"

3. **Test registration**:
   - Try creating a new user account
   - If successful, the deployment is working correctly!

## Step 4: Custom Domain (Optional)

1. **Add custom domain** in Vercel:
   - Go to Project Settings → Domains
   - Add your custom domain
   - Follow Vercel's instructions to configure DNS

## Troubleshooting

### Build Fails

- Check the build logs in Vercel dashboard
- Ensure all dependencies are listed in package.json files
- Verify Node.js version compatibility

### API Returns 500 Error

- Check function logs in Vercel dashboard
- Verify `MONGODB_URI` environment variable is set correctly
- Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0
- Check MongoDB Atlas cluster is running

### Database Connection Fails

- Verify MongoDB connection string format
- Ensure username and password are correct
- Check that database user has proper permissions
- Verify network access is configured for 0.0.0.0/0

### Frontend Loads but API Calls Fail

- Check that `VITE_API_URL` is set to `/api` (not a full URL)
- Verify API routes are working by visiting `/api/health`
- Check browser console for CORS errors

## Environment Variables Reference

```bash
# Required for production deployment
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rock-spotter?retryWrites=true&w=majority
JWT_SECRET=your-64-character-random-hex-string-here
NODE_ENV=production
VITE_API_URL=/api
```

## Redeployment

Vercel automatically redeploys when you push to your repository:
- Push to `main` branch triggers production deployment
- Push to other branches triggers preview deployment

To manually redeploy:
1. Go to your project in Vercel dashboard
2. Click "Deployments"
3. Click "..." on any deployment
4. Click "Redeploy"

## Support

If you encounter issues:
1. Check Vercel build logs
2. Check function logs
3. Review MongoDB Atlas connection settings
4. Consult [Vercel Documentation](https://vercel.com/docs)
5. Consult [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)

---

**🎉 Congratulations!** Your Rock Spotter application is now live on Vercel!
