# 🗄️ MongoDB Atlas Setup Checklist

## Step 1: Create Cluster
- [ ] Click "Create" or "Build a Database"
- [ ] Choose **M0 FREE** tier
- [ ] Provider: **AWS** (recommended)
- [ ] Region: Choose closest to your users (e.g., US East for faster access)
- [ ] Cluster Name: `rock-spotter`
- [ ] Click "Create Cluster"

## Step 2: Database Access (Security)
- [ ] Go to "Database Access" in left sidebar
- [ ] Click "Add New Database User"
- [ ] Username: `rockspotter`
- [ ] Password: Generate secure password (SAVE THIS!)
- [ ] Database User Privileges: "Read and write to any database"
- [ ] Click "Add User"

## Step 3: Network Access
- [ ] Go to "Network Access" in left sidebar  
- [ ] Click "Add IP Address"
- [ ] Click "Allow Access from Anywhere" (0.0.0.0/0)
- [ ] Comment: "Vercel Deployment Access"
- [ ] Click "Confirm"

## Step 4: Get Connection String
- [ ] Go to "Database" in left sidebar
- [ ] Click "Connect" on your cluster
- [ ] Choose "Connect your application"
- [ ] Driver: Node.js, Version: 4.1 or later
- [ ] Copy the connection string
- [ ] Replace `<password>` with your actual password

## Your Connection String Format:
```
mongodb+srv://rockspotter:<password>@rock-spotter.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

## ✅ Save These Values for Vercel:
- Database User: `rockspotter`
- Database Password: `[your-generated-password]`
- Connection String: `[full-connection-string-with-password]`