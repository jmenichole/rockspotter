# 🔍 MongoDB Atlas Connection Troubleshooting

## Current Issue: DNS Resolution Failure

Your connection string format is correct, but the hostname `cluster0.0z3jtr.mongodb.net` cannot be resolved.

## ✅ Steps to Fix:

### Step 1: Verify Cluster URL in MongoDB Atlas
1. **Go to MongoDB Atlas Dashboard**
2. **Navigate to "Database"**  
3. **Click "Connect" on your cluster**
4. **Choose "Connect your application"**
5. **Copy the NEW connection string** - it might have changed

### Step 2: Check Cluster Status
- In MongoDB Atlas, verify your cluster shows as "Active"
- If it shows "Paused" or "Pausing", click "Resume" 

### Step 3: Alternative Connection Methods

**Try Standard Connection (non-SRV):**
Sometimes the SRV record fails but standard connection works:
```
mongodb://rockspotter:wIVyuRnSur6EJHZp@cluster0-shard-00-00.0z3jtr.mongodb.net:27017,cluster0-shard-00-01.0z3jtr.mongodb.net:27017,cluster0-shard-00-02.0z3jtr.mongodb.net:27017/rock-spotter?ssl=true&replicaSet=atlas-default&authSource=admin&retryWrites=true&w=majority
```

### Step 4: Network Diagnostics
Test if you can reach MongoDB Atlas:
```bash
# Test DNS resolution
nslookup cluster0.0z3jtr.mongodb.net

# Test network connectivity  
ping cluster0.0z3jtr.mongodb.net
```

### Step 5: Firewall Check
- Corporate/school networks sometimes block MongoDB Atlas
- Try from a different network (mobile hotspot) to test

## 🎯 Most Likely Solution:
The cluster URL may have changed in MongoDB Atlas. **Get a fresh connection string from the Atlas dashboard.**

## 📱 Quick Test:
1. Go to MongoDB Atlas
2. Get fresh connection string
3. Replace the MONGODB_URI in your .env file
4. Run: `node mongodb-diagnostic.js`