// Join a rock hunt
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const HuntSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  difficulty: { type: String, required: true, enum: ['Beginner', 'Intermediate', 'Advanced'] },
  maxParticipants: { type: Number, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  targetRocks: [{ type: String }],
  coordinates: {
    lat: { type: Number },
    lng: { type: Number }
  },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  huntCount: { type: Number, default: 0 },
  achievements: [{ type: String }],
}, {
  timestamps: true
});

const Hunt = mongoose.models.Hunt || mongoose.model('Hunt', HuntSchema);
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

    const { huntId } = req.body;

    if (!huntId) {
      return res.status(400).json({ error: 'Hunt ID is required' });
    }

    // Find the hunt
    const hunt = await Hunt.findById(huntId);
    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    // Check if hunt is still active and upcoming
    if (!hunt.isActive) {
      return res.status(400).json({ error: 'Hunt is no longer active' });
    }

    if (hunt.date < new Date()) {
      return res.status(400).json({ error: 'Cannot join past hunts' });
    }

    // Check if user is already a participant
    if (hunt.participants.includes(userId)) {
      return res.status(400).json({ error: 'Already joined this hunt' });
    }

    // Check if hunt is full
    if (hunt.participants.length >= hunt.maxParticipants) {
      return res.status(400).json({ error: 'Hunt is full' });
    }

    // Add user to participants
    hunt.participants.push(userId);
    await hunt.save();

    // Update user's hunt count
    await User.findByIdAndUpdate(userId, {
      $inc: { huntCount: 1 }
    });

    // Check for achievements
    const user = await User.findById(userId);
    const newAchievements = [];

    // First hunt achievement
    if (user.huntCount === 1 && !user.achievements.includes('First Hunt')) {
      newAchievements.push('First Hunt');
    }

    // Hunt enthusiast achievements
    if (user.huntCount === 5 && !user.achievements.includes('Hunt Enthusiast')) {
      newAchievements.push('Hunt Enthusiast');
    }

    if (user.huntCount === 20 && !user.achievements.includes('Hunt Master')) {
      newAchievements.push('Hunt Master');
    }

    // Update achievements if any
    if (newAchievements.length > 0) {
      await User.findByIdAndUpdate(userId, {
        $addToSet: { achievements: { $each: newAchievements } }
      });
    }

    // Get updated hunt with populated data
    const updatedHunt = await Hunt.findById(huntId)
      .populate('organizer', 'username profilePicture')
      .populate('participants', 'username profilePicture');

    res.status(200).json({
      message: 'Successfully joined hunt',
      hunt: updatedHunt,
      newAchievements
    });

  } catch (error) {
    console.error('Error joining hunt:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.message === 'No token provided') {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    res.status(500).json({ error: 'Internal server error' });
  }
}