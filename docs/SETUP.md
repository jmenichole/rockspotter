# Rock Spotter Setup Guide

Complete guide to setting up the Rock Spotter platform for development or production.

## Prerequisites

### Required Software
- **Node.js**: v14.x or higher (v18.x recommended)
- **MongoDB**: v4.4 or higher
- **npm**: v6.x or higher (comes with Node.js)
- **Git**: For version control

### Optional but Recommended
- **MongoDB Compass**: GUI for MongoDB
- **Postman**: For API testing
- **nodemon**: Auto-reload during development (included in dev dependencies)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/jmenichole/Rock-Spotter.git
cd Rock-Spotter
```

### 2. Backend Setup

#### Install Dependencies

```bash
cd backend
npm install
```

This will install:
- express - Web framework
- mongoose - MongoDB ODM
- jsonwebtoken - JWT authentication
- bcryptjs - Password hashing
- cors - Cross-origin resource sharing
- dotenv - Environment variables
- multer - File uploads (future use)

#### Configure Environment

Create a `.env` file in the backend directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/rock-spotter

# JWT Secret (IMPORTANT: Change this in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this

# File Upload
UPLOAD_PATH=./uploads
MAX_FILE_SIZE=5242880
```

**Important Security Notes:**
- Never commit `.env` to version control (already in .gitignore)
- Use a strong, random JWT_SECRET in production
- Consider using environment-specific secrets

### 3. Database Setup

#### Option A: Local MongoDB

1. Install MongoDB:
   - **macOS**: `brew install mongodb-community`
   - **Ubuntu**: `sudo apt-get install mongodb`
   - **Windows**: Download from [mongodb.com](https://www.mongodb.com/try/download/community)

2. Start MongoDB:
   ```bash
   # macOS/Linux
   mongod --dbpath /path/to/data/directory
   
   # Or as a service
   brew services start mongodb-community  # macOS
   sudo systemctl start mongod             # Linux
   ```

3. Verify connection:
   ```bash
   mongo
   > show dbs
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/rock-spotter?retryWrites=true&w=majority
   ```

### 4. Start the Backend Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will start on `http://localhost:3000` (or your configured PORT).

You should see:
```
MongoDB connected successfully
Rock Spotter API server running on port 3000
```

### 5. Verify Installation

Test the health check endpoint:
```bash
curl http://localhost:3000/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Rock Spotter API is running!"
}
```

## Testing the API

### Using cURL

#### Register a user:
```bash
curl -X POST http://localhost:3000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
  }'
```

#### Login:
```bash
curl -X POST http://localhost:3000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the token from the response for authenticated requests.

#### Create a rock (authenticated):
```bash
curl -X POST http://localhost:3000/api/rocks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "title": "Test Rock",
    "description": "A test rock",
    "photo": "https://example.com/rock.jpg",
    "location": {
      "type": "Point",
      "coordinates": [-122.4194, 37.7749],
      "address": "San Francisco, CA"
    },
    "rockType": "igneous",
    "tags": ["test"],
    "isPublic": true
  }'
```

### Using Postman

1. Import the API endpoints (see docs/API.md)
2. Create an environment with:
   - `base_url`: `http://localhost:3000/api`
   - `token`: (will be set after login)
3. Test the endpoints

## Development Workflow

### Running in Development

```bash
cd backend
npm run dev
```

This uses nodemon to auto-reload on file changes.

### Making Changes

1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes to the code

3. Test your changes

4. Commit and push:
   ```bash
   git add .
   git commit -m "Add your feature"
   git push origin feature/your-feature-name
   ```

### Project Structure

```
backend/
├── src/
│   ├── controllers/     # Business logic
│   │   ├── userController.js
│   │   ├── rockController.js
│   │   ├── huntController.js
│   │   └── achievementController.js
│   ├── models/          # Database models
│   │   ├── User.js
│   │   ├── Rock.js
│   │   ├── Hunt.js
│   │   └── Achievement.js
│   ├── routes/          # API routes
│   │   ├── userRoutes.js
│   │   ├── rockRoutes.js
│   │   ├── huntRoutes.js
│   │   └── achievementRoutes.js
│   ├── middleware/      # Custom middleware
│   │   └── auth.js
│   └── server.js        # Main application file
├── .env.example         # Environment template
├── .gitignore
├── package.json
└── README.md
```

## Seeding Sample Data

To test the application, you might want to seed some sample data:

```javascript
// Create a seed script at backend/scripts/seed.js
const mongoose = require('mongoose');
const User = require('../src/models/User');
const Rock = require('../src/models/Rock');
const Achievement = require('../src/models/Achievement');
require('dotenv').config();

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  
  // Clear existing data
  await User.deleteMany({});
  await Rock.deleteMany({});
  await Achievement.deleteMany({});
  
  // Create sample users
  const users = await User.create([
    {
      username: 'rockfan',
      email: 'rockfan@example.com',
      password: 'password123',
      bio: 'Love collecting rocks!'
    },
    // Add more users
  ]);
  
  // Create sample achievements
  const achievements = await Achievement.create([
    {
      name: 'First Rock',
      description: 'Share your first rock photo',
      icon: '🪨',
      type: 'rocks',
      criteria: { type: 'count', target: 1 },
      rarity: 'common'
    },
    // Add more achievements
  ]);
  
  console.log('Database seeded!');
  process.exit(0);
}

seed();
```

Run with:
```bash
node scripts/seed.js
```

## Troubleshooting

### MongoDB Connection Issues

**Error**: `MongoNetworkError: failed to connect to server`

Solutions:
- Verify MongoDB is running: `mongod --version`
- Check connection string in `.env`
- Ensure firewall allows connections
- For Atlas, check IP whitelist

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::3000`

Solutions:
- Change PORT in `.env`
- Kill process using the port:
  ```bash
  # Find process
  lsof -i :3000
  
  # Kill process
  kill -9 <PID>
  ```

### JWT Authentication Issues

**Error**: `Invalid authentication token`

Solutions:
- Ensure token is included in Authorization header
- Verify JWT_SECRET matches between requests
- Check token hasn't expired (7 day expiry)
- Generate new token by logging in again

### Module Not Found

**Error**: `Cannot find module 'express'`

Solution:
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Production Deployment

### Preparation

1. Update environment variables for production
2. Use strong JWT_SECRET
3. Configure production MongoDB
4. Set NODE_ENV=production
5. Enable SSL/HTTPS
6. Configure CORS for your domain

### Deployment Options

#### Option 1: Heroku

```bash
# Install Heroku CLI
brew install heroku/brew/heroku

# Login and create app
heroku login
heroku create rock-spotter-api

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_production_mongodb_uri
heroku config:set JWT_SECRET=your_production_secret

# Deploy
git push heroku main

# Check logs
heroku logs --tail
```

#### Option 2: DigitalOcean

1. Create a Droplet (Ubuntu)
2. Install Node.js and MongoDB
3. Clone repository
4. Install dependencies
5. Set up PM2 for process management
6. Configure nginx as reverse proxy
7. Set up SSL with Let's Encrypt

#### Option 3: AWS

Use Elastic Beanstalk or EC2 with similar setup to DigitalOcean.

### Process Manager (PM2)

For production, use PM2 to keep the app running:

```bash
npm install -g pm2

# Start app
pm2 start src/server.js --name rock-spotter

# Auto-restart on reboot
pm2 startup
pm2 save

# Monitor
pm2 monit

# View logs
pm2 logs rock-spotter
```

## Next Steps

1. ✅ Backend API is running
2. 📱 Set up mobile app (see mobile-app/README.md)
3. 📚 Read API documentation (see docs/API.md)
4. 🏃 Learn about hunts (see docs/HUNTS.md)
5. 🧪 Write tests
6. 🚀 Deploy to production

## Support

For issues or questions:
- Check the documentation in `/docs`
- Review GitHub issues
- Contact the development team

---

Happy rock spotting! 🪨🔍
