#!/bin/bash

<<<<<<< HEAD
# Rock Spotter Deployment Setup Script
# This script helps prepare the environment for deployment

set -e

echo "🪨 Rock Spotter Deployment Setup"
echo "================================"
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."

command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed. Visit https://nodejs.org"; exit 1; }
echo "✅ Node.js: $(node --version)"

command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }
echo "✅ npm: $(npm --version)"

command -v git >/dev/null 2>&1 || { echo "❌ git is required but not installed."; exit 1; }
echo "✅ git: $(git --version | head -n1)"

echo ""
echo "🔧 Installation Options:"
echo ""
echo "1) Local Development (with local MongoDB)"
echo "2) Local Development (with Docker)"
echo "3) Deploy to Render"
echo "4) Deploy to Railway"
echo "5) Deploy to Heroku"
echo ""

read -p "Choose an option (1-5): " choice

case $choice in
  1)
    echo ""
    echo "🏠 Setting up for Local Development..."
    echo ""
    
    cd backend
    
    echo "📦 Installing dependencies..."
    npm install
    
    if [ ! -f .env ]; then
      echo "📝 Creating .env file..."
      cp .env.example .env
      echo "✅ .env file created. Please edit it with your MongoDB connection string."
    else
      echo "ℹ️  .env file already exists"
    fi
    
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "To start the server:"
    echo "  cd backend"
    echo "  npm start"
    echo ""
    ;;
    
  2)
    echo ""
    echo "🐳 Setting up with Docker..."
    echo ""
    
    command -v docker >/dev/null 2>&1 || { echo "❌ Docker is required. Visit https://docker.com"; exit 1; }
    echo "✅ Docker: $(docker --version)"
    
    command -v docker-compose >/dev/null 2>&1 || { echo "❌ docker-compose is required."; exit 1; }
    echo "✅ docker-compose: $(docker-compose --version)"
    
    if [ ! -f .env ]; then
      echo "📝 Creating .env file..."
      echo "JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo 'please-change-this-secret')" > .env
      echo "✅ .env file created"
    fi
    
    echo ""
    echo "🚀 Starting containers..."
    docker-compose up -d
    
    echo ""
    echo "✅ Containers started!"
    echo ""
    echo "API available at: http://localhost:3000"
    echo ""
    echo "To view logs:"
    echo "  docker-compose logs -f backend"
    echo ""
    echo "To stop:"
    echo "  docker-compose down"
    echo ""
    ;;
    
  3)
    echo ""
    echo "🎨 Deploy to Render"
    echo ""
    echo "Follow these steps:"
    echo ""
    echo "1. Create a MongoDB Atlas database:"
    echo "   https://www.mongodb.com/cloud/atlas"
    echo ""
    echo "2. Push your code to GitHub"
    echo ""
    echo "3. Go to Render Dashboard:"
    echo "   https://dashboard.render.com/"
    echo ""
    echo "4. Click 'New' → 'Blueprint'"
    echo ""
    echo "5. Connect your GitHub repository"
    echo ""
    echo "6. Render will detect render.yaml and deploy automatically"
    echo ""
    echo "7. Add environment variables:"
    echo "   - MONGODB_URI (your MongoDB Atlas connection string)"
    echo "   - JWT_SECRET (will be auto-generated)"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    echo ""
    ;;
    
  4)
    echo ""
    echo "🚂 Deploy to Railway"
    echo ""
    
    if ! command -v railway >/dev/null 2>&1; then
      echo "📦 Installing Railway CLI..."
      npm install -g railway
    fi
    
    echo "✅ Railway CLI ready"
    echo ""
    echo "Follow these steps:"
    echo ""
    echo "1. Login to Railway:"
    echo "   railway login"
    echo ""
    echo "2. Initialize project:"
    echo "   railway init"
    echo ""
    echo "3. Add MongoDB:"
    echo "   railway add"
    echo ""
    echo "4. Set JWT_SECRET:"
    echo "   railway variables set JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo 'your-secret-here')"
    echo ""
    echo "5. Deploy:"
    echo "   railway up"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    echo ""
    ;;
    
  5)
    echo ""
    echo "🟣 Deploy to Heroku"
    echo ""
    
    if ! command -v heroku >/dev/null 2>&1; then
      echo "❌ Heroku CLI not installed."
      echo "Install from: https://devcenter.heroku.com/articles/heroku-cli"
      exit 1
    fi
    
    echo "✅ Heroku CLI ready"
    echo ""
    echo "Follow these steps:"
    echo ""
    echo "1. Login to Heroku:"
    echo "   heroku login"
    echo ""
    echo "2. Create app:"
    echo "   heroku create rock-spotter-api"
    echo ""
    echo "3. Add MongoDB:"
    echo "   heroku addons:create mongolab:sandbox"
    echo ""
    echo "4. Set environment variables:"
    echo "   heroku config:set JWT_SECRET=$(openssl rand -hex 32 2>/dev/null || echo 'your-secret-here')"
    echo "   heroku config:set NODE_ENV=production"
    echo ""
    echo "5. Deploy:"
    echo "   git push heroku main"
    echo ""
    echo "📖 See DEPLOYMENT.md for detailed instructions"
    echo ""
    ;;
    
  *)
    echo "Invalid option"
    exit 1
    ;;
esac

echo "🎉 Setup complete! Happy rock spotting! 🪨✨"
=======
# 🚀 Rock Spotter Deployment Helper Script
# Run this script to prepare your project for deployment

echo "🪨 Rock Spotter Deployment Setup"
echo "================================="

# Check Node.js version
NODE_VERSION=$(node --version)
echo "✅ Node.js version: $NODE_VERSION"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd frontend
npm install
if [ $? -eq 0 ]; then
    echo "✅ Frontend dependencies installed"
else
    echo "❌ Frontend dependency installation failed"
    exit 1
fi

# Install API dependencies
echo "📦 Installing API dependencies..."
cd ../api
npm install
if [ $? -eq 0 ]; then
    echo "✅ API dependencies installed"
else
    echo "❌ API dependency installation failed"
    exit 1
fi

# Build frontend for production
echo "🔨 Building frontend for production..."
cd ../frontend
npm run build
if [ $? -eq 0 ]; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi

cd ..

echo ""
echo "🎉 Setup Complete!"
echo "=================="
echo ""
echo "Next steps:"
echo "1. 🗄️  Set up MongoDB Atlas (see DEPLOYMENT.md)"
echo "2. ☁️  Deploy to Vercel:"
echo "   - Fork this repository to your GitHub"
echo "   - Connect to Vercel"
echo "   - Add environment variables"
echo "3. 📱 Enable GitHub Pages for static demo"
echo ""
echo "📖 Full instructions: DEPLOYMENT.md"
echo "📧 Support: jmenichole007@outlook.com"
>>>>>>> origin/main
