/*
 * Rock Spotter - Enhanced Health Check API Route for Vercel
 */

import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return true;

  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is not set');
    }

    // Fail fast if MongoDB is unreachable to avoid long serverless cold-start timeouts
    await mongoose.connect(mongoURI, {
      // How long the driver will try to select a server before timing out (ms)
      serverSelectionTimeoutMS: 5000,
      // How long to wait for a TCP connection to be established (ms)
      connectTimeoutMS: 5000,
    });
    isConnected = true;
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    return false;
  }
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const dbConnected = await connectDB();
  
  res.status(200).json({ 
    status: 'ok', 
    message: 'Rock Spotter API running on Vercel Serverless!',
    timestamp: new Date().toISOString(),
    environment: 'vercel-serverless',
    database: dbConnected ? 'connected' : 'disconnected',
    endpoints: {
      auth: ['/api/users/register', '/api/users/login'],
      rocks: ['/api/rocks', '/api/rocks/create'],
      hunts: ['/api/hunts', '/api/hunts/join'],
      achievements: ['/api/achievements']
    },
    version: '2.0.0'
  });
}
