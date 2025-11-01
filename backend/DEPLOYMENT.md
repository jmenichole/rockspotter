# Deploying Rock-Spotter Backend (Render) and Frontend (Vercel)

This guide helps you deploy the backend (Node/Express) to Render and the frontend to Vercel, then connect them so the magic-code authentication works in production.

## 1) Prepare the backend repo

1. Ensure `package.json` contains a start script:

```json
"scripts": {
  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
}
```

2. Confirm `.env.example` contains required variables:

```
PORT=10000
NODE_ENV=production
MONGODB_URI=<your-mongo-connection-string>
JWT_SECRET=<your-jwt-secret>
UPLOAD_PATH=/tmp/uploads
MAX_FILE_SIZE=5242880
```

3. `render.yaml` is provided for convenience (Render can auto-detect); it defines a web service and a managed DB.

## 2) Deploy backend to Render (Manual steps)

1. Create a new Web Service on Render and connect your GitHub repo.
2. Use the `master`/`main` branch and set the root to the repo root (Render will detect Node).
3. Build & Start Commands:
   - Build: `npm install`
   - Start: `npm start`
4. Environment variables (set via Render dashboard):
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `MONGODB_URI` = your MongoDB Atlas connection string
   - `JWT_SECRET` = a secure random string
   - `UPLOAD_PATH` = `/tmp/uploads`
   - `MAX_FILE_SIZE` = `5242880`
5. (Optional) Configure a managed Postgres DB on Render if you prefer; otherwise use MongoDB Atlas.
6. Deploy. After successful build Render will give you a public URL like `https://rock-spotter-api.onrender.com`.

## 3) Configure frontend on Vercel

1. In the Vercel dashboard, open your project and go to Settings → Environment Variables.
2. Add an environment variable:
   - `VITE_API_URL` = `https://<your-backend-host>` (e.g. `https://rock-spotter-api.onrender.com`)
3. Re-deploy the Vercel project (trigger a new deployment) so the frontend picks up `VITE_API_URL`.

## 4) Verify

- Visit your Vercel frontend URL. The magic-login should now call your Render-hosted backend.
- Request a magic code and confirm the SMS service or logs (if you add Twilio) show the code.

## 5) (Optional) Add Twilio for real SMS

1. Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_FROM_NUMBER` to Render env vars.
2. Update `magicAuthController.js` to send SMS via Twilio SDK instead of returning the code in the response.

---

If you want, I can:
- Push these docs and configuration to the repo (I will commit `backend/DEPLOYMENT.md`).
- Help you run the Render deployment from the CLI (requires Render account & API key).
- Integrate Twilio and test sending real SMS (will need Twilio credentials).

Which of these would you like me to do next?