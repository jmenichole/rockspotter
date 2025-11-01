// Create a new rock post
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const RockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  rockType: { type: String, required: true, enum: ['igneous', 'sedimentary', 'metamorphic', 'mineral'] },
  imageUrl: { type: String },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [{ type: String }],
  isPublic: { type: Boolean, default: true },
  reportCount: { type: Number, default: 0 }
}, {
  timestamps: true
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  rockCount: { type: Number, default: 0 },
  achievements: [{ type: String }],
}, {
  timestamps: true
});

const Rock = mongoose.models.Rock || mongoose.model('Rock', RockSchema);
const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Database connection
let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Auth middleware
function verifyToken(authHeader) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new Error('No token provided');
  }
  
  const token = authHeader.substring(7);
  return jwt.verify(token, process.env.JWT_SECRET);
}

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Verify authentication
    const decoded = verifyToken(req.headers.authorization);
    const userId = decoded.userId;

    const { title, description, location, rockType, imageUrl, coordinates, tags, isPublic = true } = req.body;

    if (!title || !description || !location || !rockType) {
      return res.status(400).json({ error: 'Title, description, location, and rock type are required' });
    }

    // Create new rock
    const rock = new Rock({
      title,
      description,
      location,
      rockType,
      imageUrl,
      coordinates,
      user: userId,
      tags: tags || [],
      isPublic
    });

    await rock.save();

    // Update user's rock count
    await User.findByIdAndUpdate(userId, {
      $inc: { rockCount: 1 }
    });

    // Check for achievements
    const user = await User.findById(userId);
    const newAchievements = [];

    // First rock achievement
    if (user.rockCount === 1 && !user.achievements.includes('First Rock')) {
      newAchievements.push('First Rock');
    }

    // Rock collector achievements
    if (user.rockCount === 10 && !user.achievements.includes('Rock Collector')) {
      newAchievements.push('Rock Collector');
    }

    if (user.rockCount === 50 && !user.achievements.includes('Rock Master')) {
      newAchievements.push('Rock Master');
    }

    // Update achievements if any
    if (newAchievements.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { achievements: { $each: newAchievements } }
      });
    }

    // Populate user data for response
    const populatedRock = await Rock.findById(rock._id)
      .populate('user', 'username profilePicture');

    res.status(201).json({
      message: 'Rock created successfully',
      rock: populatedRock,
      newAchievements
    });

  } catch (error) {
    console.error('Error creating rock:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.message === 'No token provided') {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}