/*
 * Rock Spotter - Simplified Server for Render Deployment
 * Copyright (c) 2025 Rock Spotter Community
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://rock-spotter-1.vercel.app', 'https://jmenichole.github.io']
    : true,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

// Simple Rock Schema
const RockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: String,
  location: String,
  rockType: { type: String, enum: ['igneous', 'sedimentary', 'metamorphic', 'mineral'] },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Rock = mongoose.model('Rock', RockSchema);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Rock Spotter API is running!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Basic user routes
app.post('/api/users/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Simple validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if user exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user (in production, hash password)
    const user = new User({ username, email, password });
    await user.save();

    // Create a simple token (in production, use JWT)
    const token = `user_${user._id}_${Date.now()}`;

    res.status(201).json({
      message: 'User created successfully',
      token: token,
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a simple token (in production, use JWT)
    const token = `user_${user._id}_${Date.now()}`;

    res.json({
      message: 'Login successful',
      token: token,
      user: { 
        id: user._id, 
        username: user.username, 
        email: user.email 
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Basic rock routes
app.get('/api/rocks', async (req, res) => {
  try {
    const rocks = await Rock.find()
      .populate('user', 'username')
      .sort({ createdAt: -1 })
      .limit(50);
    
    res.json(rocks);
  } catch (error) {
    console.error('Get rocks error:', error);
    res.status(500).json({ message: 'Server error fetching rocks' });
  }
});

app.post('/api/rocks', async (req, res) => {
  try {
    const { title, description, imageUrl, location, rockType, userId } = req.body;
    
    const rock = new Rock({
      title,
      description,
      imageUrl,
      location,
      rockType,
      user: userId
    });

    await rock.save();
    await rock.populate('user', 'username');
    
    res.status(201).json(rock);
  } catch (error) {
    console.error('Create rock error:', error);
    res.status(500).json({ message: 'Server error creating rock' });
  }
});

// Database connection
const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;
    if (!mongoURI) {
      throw new Error('MONGODB_URI environment variable is required');
    }

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    console.error('Make sure MONGODB_URI environment variable is set');
    process.exit(1);
  }
};

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ message: 'Internal server error' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Start server
const PORT = process.env.PORT || 10000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Rock Spotter API server running on port ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  mongoose.connection.close(() => {
    process.exit(0);
  });
});

if (require.main === module) {
  startServer();
}

module.exports = app;