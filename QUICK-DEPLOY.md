# 🚀 Quick Deploy Commands

One-line commands to deploy Rock Spotter to any platform.

## 🐳 Docker (Fastest - 1 minute)

```bash
git clone https://github.com/jmenichole/Rock-Spotter.git && cd Rock-Spotter && docker-compose up -d
```

Then visit: http://localhost:3000/api/health

## 🎨 Render (Free - 5 minutes)

1. **Create MongoDB Atlas**: https://www.mongodb.com/cloud/atlas (free tier)
2. **One-click deploy**: Fork repo → https://dashboard.render.com → New Blueprint → Connect repo
3. **Add MONGODB_URI** in environment variables
4. **Done!** ✅

## 🚂 Railway (Easiest - 2 minutes)

```bash
npm i -g railway && railway login && railway init && railway add && railway up
```

MongoDB included! No external setup needed.

## 🟣 Heroku (Classic - 5 minutes)

```bash
heroku login && \
heroku create rock-spotter-api && \
heroku addons:create mongolab:sandbox && \
heroku config:set JWT_SECRET=$(openssl rand -hex 32) && \
git push heroku main
```

## 🌊 DigitalOcean App Platform

**Via Dashboard** (10 minutes):
1. Create account: https://www.digitalocean.com (get $200 credit)
2. Apps → Create App → GitHub → Select repo
3. Set build: `cd backend && npm install`
4. Set run: `cd backend && npm start`
5. Add MONGODB_URI and JWT_SECRET
6. Deploy!

## ⚡ Vercel (Not Recommended)

**Note**: Vercel is for frontend/serverless. Rock Spotter uses Express with persistent connections. Use Render/Railway instead.

## 🏗️ AWS Elastic Beanstalk

```bash
pip install awsebcli && \
eb init -p node.js rock-spotter-api && \
eb create rock-spotter-env && \
eb setenv MONGODB_URI="your-uri" JWT_SECRET="your-secret"
```

## 🔷 Azure App Service

```bash
az login && \
az webapp up --name rock-spotter-api --runtime "NODE:18-lts" && \
az webapp config appsettings set --settings MONGODB_URI="your-uri" JWT_SECRET="your-secret"
```

## ☁️ Google Cloud Platform (Cloud Run)

```bash
gcloud run deploy rock-spotter-api \
  --source ./backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars MONGODB_URI="your-uri",JWT_SECRET="your-secret"
```

## 📦 Fly.io

```bash
fly launch --name rock-spotter-api && \
fly secrets set MONGODB_URI="your-uri" JWT_SECRET="your-secret" && \
fly deploy
```

## 🔧 VPS (Ubuntu/Debian) with PM2

```bash
# On your VPS
git clone https://github.com/jmenichole/Rock-Spotter.git && \
cd Rock-Spotter/backend && \
npm install && \
npm install -g pm2 && \
cp .env.example .env && \
# Edit .env with your settings
pm2 start src/server.js --name rock-spotter && \
pm2 startup && \
pm2 save
```

## 🏠 Local Development

```bash
cd Rock-Spotter/backend && \
npm install && \
cp .env.example .env && \
npm start
```

## 🧪 Test Any Deployment

```bash
./verify-deployment.sh https://your-api-url.com
```

## 📊 Platform Recommendations

| Your Need | Platform | Why |
|-----------|----------|-----|
| **Quick test** | Docker | Instant local setup |
| **Free forever** | Render | 750 hrs/month free |
| **Easiest** | Railway | MongoDB included, $5 credit |
| **Production** | DigitalOcean | $200 credit, professional |
| **Enterprise** | AWS/Azure/GCP | Scalable, full control |
| **Hobby** | Heroku | Classic, reliable |

## 🎯 Recommended Path

### For Learning/Testing:
```bash
docker-compose up -d  # Start locally
```

### For Personal Project:
```bash
# Railway (easiest with MongoDB)
npm i -g railway && railway login && railway up
```

### For Production:
1. **MongoDB Atlas** (free tier)
2. **Render or DigitalOcean** (reliable hosting)
3. **Set up monitoring and backups**

## 🔐 Don't Forget!

Before deploying:
```bash
# Generate secure JWT secret
openssl rand -hex 32

# Or with Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Set this as JWT_SECRET in your deployment platform!

## 📚 Need Help?

- **Detailed guides**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Interactive setup**: Run `./deploy-setup.sh`
- **Verify deployment**: Run `./verify-deployment.sh YOUR_URL`
- **File explanations**: See [DEPLOYMENT-FILES.md](DEPLOYMENT-FILES.md)

## ⚡ Super Quick Start (Absolute Fastest)

Already have Docker? Just run:
```bash
curl -s https://raw.githubusercontent.com/jmenichole/Rock-Spotter/main/docker-compose.yml | docker-compose -f - up -d
```

Want Railway? Just run:
```bash
npx railway login && npx railway up
```

---

**Pick a platform, copy-paste, deploy! 🚀**

Most platforms take 2-5 minutes to get your API live!
