# 🔐 Environment Variables Template for Rock Spotter
# COPY THIS FILE AND REPLACE WITH YOUR ACTUAL VALUES
# NEVER commit the actual values to git!

# Database Connection - Get from MongoDB Atlas
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/rock-spotter?retryWrites=true&w=majority

# JWT Secret - Generate a secure random string (64+ characters)
JWT_SECRET=YOUR_SECURE_JWT_SECRET_KEY_HERE

# Environment
NODE_ENV=production

# API Configuration
VITE_API_URL=/api

# Instructions:
# 1. Copy this file to create your actual .env file
# 2. Replace ALL placeholder values with your real credentials
# 3. NEVER commit files with real credentials to git
# 4. Use these in your Vercel environment variables settings

# Security Note:
# The .gitignore file prevents .env files from being committed
# Always verify your credentials are not in git history before pushing