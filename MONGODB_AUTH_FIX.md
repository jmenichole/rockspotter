# 🚨 MongoDB Atlas Authentication Fix

## Issue with Your Current Setup
Your connection string uses **X.509 certificate authentication**, which requires:
- Certificate files on the file system
- File path access that Vercel serverless functions don't have

## ✅ Recommended Solution: Username/Password Auth

### Step 1: Create Database User in MongoDB Atlas
1. Go to **Database Access** in your MongoDB Atlas dashboard
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication method (not Certificate)
4. Set username: `rockspotter`
5. Generate a strong password and **save it**
6. Database User Privileges: **"Read and write to any database"**
7. Click **"Add User"**

### Step 2: Get the Correct Connection String
1. Go to **"Database"** → **"Connect"**
2. Choose **"Connect your application"**
3. Select **Node.js** driver
4. Copy the connection string that looks like:
```
mongodb+srv://rockspotter:<password>@cluster0.0z3jtr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
```

### Step 3: Update Your Environment Variable
Replace `<password>` with your actual password:
```
MONGODB_URI=mongodb+srv://rockspotter:YOUR_ACTUAL_PASSWORD@cluster0.0z3jtr.mongodb.net/rock-spotter?retryWrites=true&w=majority&appName=Cluster0
```

## 🔧 Test Connection Locally
```javascript
// Test this connection string with Rock Spotter
const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://rockspotter:YOUR_PASSWORD@cluster0.0z3jtr.mongodb.net/rock-spotter?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection failed:', err));
```

## Why Username/Password is Better for Vercel:
- ✅ No certificate files needed
- ✅ Works with serverless functions  
- ✅ Simpler deployment process
- ✅ Standard for web applications
- ✅ Supported by all hosting platforms