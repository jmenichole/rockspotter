# ✅ Deployment Checklist

Use this checklist to ensure your Rock Spotter deployment is production-ready.

## Pre-Deployment Checklist

### 📋 Code & Configuration

- [ ] All code committed to Git
- [ ] No `.env` files committed (check `.gitignore`)
- [ ] Dependencies up to date (`npm audit` run)
- [ ] No console.log statements in production code
- [ ] Environment variables documented

### 🔐 Security

- [ ] Strong JWT_SECRET generated (32+ characters)
- [ ] MongoDB connection string uses authentication
- [ ] Database user has appropriate permissions (not admin)
- [ ] CORS configured for your domain (if applicable)
- [ ] Rate limiting considered/implemented
- [ ] Input validation in place
- [ ] Passwords hashed with bcrypt
- [ ] Environment variables not hardcoded

### 🗄️ Database

- [ ] MongoDB Atlas account created (or other managed database)
- [ ] Database cluster created and running
- [ ] Database user created with strong password
- [ ] IP whitelist configured (0.0.0.0/0 or specific IPs)
- [ ] Connection string tested and working
- [ ] Automated backups enabled
- [ ] Database name set to "rock-spotter" (or your choice)

### 🚀 Deployment Platform

- [ ] Platform account created (Render/Railway/Heroku/etc.)
- [ ] Repository connected to platform
- [ ] Build command configured: `cd backend && npm install`
- [ ] Start command configured: `cd backend && npm start`
- [ ] Health check endpoint configured: `/api/health`

### 🔧 Environment Variables

Required variables set on platform:

- [ ] `NODE_ENV=production`
- [ ] `MONGODB_URI=<your-connection-string>`
- [ ] `JWT_SECRET=<your-secure-secret>`
- [ ] `PORT` (usually auto-set by platform)

Optional variables:
- [ ] `JWT_EXPIRES_IN=7d` (default)
- [ ] `CORS_ORIGIN` (if restricting domains)
- [ ] `LOG_LEVEL=info` (default)

## Deployment Checklist

### 🎯 Initial Deployment

- [ ] Code pushed to main branch
- [ ] Platform deployment triggered
- [ ] Build completed successfully
- [ ] No build errors in logs
- [ ] Application started successfully
- [ ] Health check passing

### 🧪 Testing

- [ ] Health endpoint responds: `GET /api/health`
- [ ] Root endpoint responds: `GET /`
- [ ] Can register a user: `POST /api/users/register`
- [ ] Can login: `POST /api/users/login`
- [ ] Authentication works with JWT token
- [ ] Can create a rock post (authenticated)
- [ ] Can list rocks: `GET /api/rocks`
- [ ] Can list hunts: `GET /api/hunts`
- [ ] Can list achievements: `GET /api/achievements`
- [ ] Database connection confirmed in logs

### 🔍 Verification

Run the verification script:
```bash
./verify-deployment.sh https://your-api-url.com
```

- [ ] All verification tests pass
- [ ] No error messages in output
- [ ] Response times acceptable (<2s)

## Post-Deployment Checklist

### 📊 Monitoring

- [ ] Application logs accessible
- [ ] Error tracking set up (optional: Sentry)
- [ ] Uptime monitoring configured (optional: UptimeRobot)
- [ ] Performance monitoring enabled (platform-specific)
- [ ] Database monitoring enabled (MongoDB Atlas)

### 🌐 Domain & SSL

- [ ] Custom domain added (optional)
- [ ] DNS records configured (if using custom domain)
- [ ] SSL/HTTPS enabled (usually automatic)
- [ ] SSL certificate valid and active

### 📚 Documentation

- [ ] API URL documented in README
- [ ] Team notified of deployment
- [ ] Environment variables documented
- [ ] Deployment process documented
- [ ] Rollback procedure documented

### 🔄 CI/CD

- [ ] GitHub Actions workflow running
- [ ] Tests passing on push
- [ ] Docker build succeeds
- [ ] Auto-deploy configured (optional)

### 💾 Backup & Recovery

- [ ] Database backups enabled (daily recommended)
- [ ] Backup retention policy set
- [ ] Recovery procedure tested
- [ ] Backup location secured

### 🎯 Performance

- [ ] Response times monitored (<2s target)
- [ ] Database queries optimized
- [ ] Indexes created on MongoDB collections
- [ ] Connection pooling configured
- [ ] Memory usage acceptable (<512MB for free tier)
- [ ] CPU usage acceptable (<50% avg)

### 📱 Integration

- [ ] API accessible from mobile app (if applicable)
- [ ] CORS working for frontend (if applicable)
- [ ] WebSocket endpoints working (if applicable)
- [ ] File uploads working (if implemented)

## Ongoing Maintenance Checklist

### Daily

- [ ] Check error logs for issues
- [ ] Monitor uptime status
- [ ] Review performance metrics

### Weekly

- [ ] Review and resolve any errors
- [ ] Check disk space usage
- [ ] Monitor database size
- [ ] Review slow queries

### Monthly

- [ ] Update dependencies: `npm update`
- [ ] Run security audit: `npm audit`
- [ ] Review and optimize database
- [ ] Test backup restoration
- [ ] Review access logs for unusual activity
- [ ] Update documentation if needed

### Quarterly

- [ ] Review and update Node.js version
- [ ] Review and update MongoDB version
- [ ] Review and update platform services
- [ ] Security review and penetration testing
- [ ] Performance optimization review
- [ ] Cost optimization review

## Emergency Procedures

### 🚨 If Deployment Fails

1. [ ] Check platform logs for error messages
2. [ ] Verify environment variables are set
3. [ ] Check database connection
4. [ ] Verify build command is correct
5. [ ] Check start command is correct
6. [ ] Review recent code changes
7. [ ] Rollback to last working version if needed

### 🔄 Rollback Procedure

1. [ ] Identify last working deployment
2. [ ] Access platform dashboard
3. [ ] Select previous deployment or commit
4. [ ] Trigger redeployment
5. [ ] Verify application is working
6. [ ] Investigate and fix issue
7. [ ] Redeploy with fix

### 🐛 Common Issues & Solutions

**Issue**: Cannot connect to database
- [ ] Check MongoDB Atlas IP whitelist
- [ ] Verify connection string format
- [ ] Check database user credentials
- [ ] Ensure database is running

**Issue**: Application crashes on start
- [ ] Check environment variables
- [ ] Review startup logs
- [ ] Verify dependencies installed
- [ ] Check Node.js version compatibility

**Issue**: Authentication not working
- [ ] Verify JWT_SECRET is set
- [ ] Check JWT token format
- [ ] Review authentication middleware
- [ ] Test with fresh token

**Issue**: Slow response times
- [ ] Check database connection pooling
- [ ] Review slow queries in MongoDB
- [ ] Check for N+1 query problems
- [ ] Consider adding database indexes
- [ ] Review and optimize API endpoints

## Platform-Specific Checklists

### Render

- [ ] Blueprint (render.yaml) detected and applied
- [ ] Web service created and running
- [ ] Environment variables added
- [ ] Health checks passing
- [ ] Custom domain configured (optional)
- [ ] Auto-deploy from Git enabled

### Railway

- [ ] Railway CLI installed (optional)
- [ ] Project initialized
- [ ] MongoDB plugin added
- [ ] Environment variables set
- [ ] Service deployed and running
- [ ] Logs accessible via dashboard

### Heroku

- [ ] Heroku CLI installed
- [ ] App created
- [ ] Procfile detected
- [ ] MongoDB addon added
- [ ] Environment variables configured
- [ ] Dyno formation set correctly
- [ ] SSL enabled

### Docker

- [ ] Docker installed and running
- [ ] docker-compose.yml configured
- [ ] .dockerignore configured
- [ ] Containers started: `docker-compose up -d`
- [ ] Containers running: `docker ps`
- [ ] Logs accessible: `docker-compose logs`
- [ ] Volumes configured for data persistence
- [ ] Network configuration correct

## Success Criteria

Your deployment is successful when:

- [x] ✅ Application accessible via URL
- [x] ✅ Health check endpoint returns 200 OK
- [x] ✅ Can create and login users
- [x] ✅ Database connection stable
- [x] ✅ Authentication working
- [x] ✅ All API endpoints responding
- [x] ✅ No errors in logs
- [x] ✅ Response times acceptable
- [x] ✅ SSL/HTTPS enabled
- [x] ✅ Monitoring in place

## Final Steps

- [ ] Add API URL to project documentation
- [ ] Share access credentials with team (securely)
- [ ] Schedule first backup
- [ ] Set up monitoring alerts
- [ ] Create runbook for common operations
- [ ] Celebrate successful deployment! 🎉

---

## Resources

- [DEPLOYMENT.md](DEPLOYMENT.md) - Complete deployment guide
- [QUICK-DEPLOY.md](QUICK-DEPLOY.md) - One-line deploy commands
- [DEPLOYMENT-FILES.md](DEPLOYMENT-FILES.md) - File explanations
- [verify-deployment.sh](verify-deployment.sh) - Automated verification

## Need Help?

If you encounter issues:

1. Check the [DEPLOYMENT.md](DEPLOYMENT.md) troubleshooting section
2. Review platform logs for error messages
3. Run `./verify-deployment.sh` to diagnose issues
4. Check platform status pages
5. Review MongoDB Atlas status
6. Open a GitHub issue with details

---

**Ready to deploy? Start checking boxes! ✓**

Print this checklist or keep it open while deploying to ensure nothing is missed!
