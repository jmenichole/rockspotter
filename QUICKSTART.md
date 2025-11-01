# Quick Start Guide

Get Rock Spotter up and running in 5 minutes!

## Prerequisites

- Node.js v14+ installed
- MongoDB installed and running (or MongoDB Atlas account)

## Setup in 3 Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` if needed (defaults work for local development):
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/rock-spotter
JWT_SECRET=rock-spotter-secret-key-change-this-in-production
```

### 3. Start the Server

```bash
npm start
```

You should see:
```
MongoDB connected successfully
Rock Spotter API server running on port 3000
```

## Test It Out

### 1. Check Health
```bash
curl http://localhost:3000/api/health
```

### 2. Register a User
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "rockfan",
    "email": "fan@rocks.com",
    "password": "rocks123"
  }'
```

Save the `token` from the response!

### 3. Create a Rock Post
```bash
curl -X POST http://localhost:3000/api/rocks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "My First Rock",
    "description": "A beautiful granite specimen",
    "location": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749],
      "address": "San Francisco, CA"
    },
    "rockType": "igneous",
    "tags": ["granite", "first"],
    "isPublic": true
  }'
```

### 4. View All Rocks
```bash
curl http://localhost:3000/api/rocks
```

## What's Next?

### Explore the API
- 📚 Read [API Documentation](docs/API.md)
- 🏃 Learn about [Rock Hunts](docs/HUNTS.md)
- 🔧 See [Full Setup Guide](docs/SETUP.md)

### Try More Features

**Create a Hunt:**
```bash
curl -X POST http://localhost:3000/api/hunts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "First Hunt",
    "description": "Find 3 rocks!",
    "rocks": [],
    "difficulty": "easy",
    "startDate": "2025-10-17T00:00:00Z",
    "endDate": "2025-10-24T23:59:59Z"
  }'
```

**View Achievements:**
```bash
curl http://localhost:3000/api/achievements
```

## Common Issues

**MongoDB not running?**
```bash
# Start MongoDB (macOS)
brew services start mongodb-community

# Start MongoDB (Linux)
sudo systemctl start mongod
```

**Port 3000 already in use?**

Change the PORT in `.env` file to 3001 or another available port.

**Need help?**

Check the full documentation:
- [Setup Guide](docs/SETUP.md)
- [API Documentation](docs/API.md)
- [Hunts Guide](docs/HUNTS.md)

---

## Quick Deploy with Docker 🐳

Want to deploy quickly? Use Docker!

### Option 1: Docker Compose (Easiest)

```bash
# Clone and start everything
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter
docker-compose up -d

# Check if it's running
curl http://localhost:3000/api/health
```

This starts both the API and MongoDB automatically!

### Option 2: Deploy to Cloud

**Render (Free tier available):**
1. Fork this repository
2. Create MongoDB Atlas free database
3. Click: [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com)
4. Connect GitHub and deploy!

**Railway ($5 free credit):**
```bash
npm install -g railway
railway login
railway init
railway add  # Add MongoDB
railway up   # Deploy!
```

**See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed cloud deployment guides.**

---

**You're all set! Start sharing rocks! 🪨✨**
