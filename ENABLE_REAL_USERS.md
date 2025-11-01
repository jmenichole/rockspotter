# 🚀 How to Enable Real User Signups

## 🎭 Current Status: Demo Mode

Your app currently shows "Demo Mode" because it's using **mock data** instead of a real database. Here's how to enable real user signups:

## ✅ **Step 1: Add Environment Variables to Vercel**

1. Go to [Vercel Dashboard](https://vercel.com/jmenicholes-projects/rock-spotter-1)
2. Click **Settings** → **Environment Variables**
3. Add these three variables:

```env
MONGODB_URI=mongodb+srv://rockspotter:wIVyuRnSur6EJHZp@cluster0.0z3jtr.mongodb.net/rock-spotter?retryWrites=true&w=majority
JWT_SECRET=19b102082b7930d043fe88bf9f40d54bd1f1d39c1d97546f8fe8668e8b03a456fba60e2031307253b7cb3bd22803667b85fd9df023484b58187be15725daa4b7
NODE_ENV=production
```

## ✅ **Step 2: Redeploy**

After adding the environment variables, redeploy your app:
```bash
npx vercel --prod
```

## 🔄 **What Will Change:**

### **Before (Demo Mode):**
- 🎭 Shows "Demo Mode" 
- ❌ Fake user accounts
- ❌ Sample data only
- ❌ No real signups

### **After (Production Mode):**
- 🟢 Shows "Live System"
- ✅ Real user registration
- ✅ Real login/logout
- ✅ Database storage
- ✅ User-generated content

## 🗄️ **Database Requirements:**

Your MongoDB Atlas cluster needs:
- ✅ Network access from `0.0.0.0/0` (all IPs for serverless)
- ✅ User `rockspotter` with read/write permissions
- ✅ Database name: `rock-spotter`

## 🎯 **Quick Test:**

Once environment variables are added:
1. Visit your app: https://rock-spotter-1.vercel.app
2. Click "Sign Up"
3. Create a real account
4. Status should change from "🎭 Demo Mode" to "🟢 Live System"

## 📋 **Current Features Ready for Real Users:**

✅ User registration/login  
✅ Rock photo sharing  
✅ Albums & collections  
✅ Social feed  
✅ Profile management  
✅ Authentication system  

Your app is **fully ready** for real users - just needs the database connection! 🚀