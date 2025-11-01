#!/bin/bash

# Rock Spotter - Vercel Deployment Script
# This script helps deploy your full-stack Rock Spotter app to Vercel

echo "🚀 Deploying Rock Spotter to Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "📦 Installing Vercel CLI..."
    npm install -g vercel
fi

# Build frontend locally to test
echo "🔨 Testing frontend build..."
cd frontend
npm install
npm run build
cd ..

echo "✅ Frontend build successful!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo ""
echo "🎉 Deployment complete!"
echo ""
echo "📋 Next steps:"
echo "1. Go to your Vercel dashboard: https://vercel.com/dashboard"
echo "2. Click on your Rock-Spotter project"
echo "3. Go to Settings > Environment Variables"
echo "4. Add these variables:"
echo "   - MONGODB_URI: your_mongodb_atlas_connection_string"
echo "   - JWT_SECRET: a_secure_random_string"
echo "   - NODE_ENV: production"
echo ""
echo "🔗 Your app will be available at: https://rock-spotter.vercel.app"