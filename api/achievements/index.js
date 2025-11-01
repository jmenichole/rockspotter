// Get user achievements and available achievements
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  achievements: [{ type: String }],
  rockCount: { type: Number, default: 0 },
  huntCount: { type: Number, default: 0 },
  profilePicture: { type: String, default: '' },
}, {
  timestamps: true
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

// Define all available achievements
const AVAILABLE_ACHIEVEMENTS = [
  {
    id: 'First Rock',
    name: 'First Rock',
    description: 'Share your first rock discovery',
    rarity: 'common',
    icon: '🗿',
    requirement: 'Share 1 rock'
  },
  {
    id: 'Rock Collector',
    name: 'Rock Collector',
    description: 'Share 10 rock discoveries',
    rarity: 'uncommon',
    icon: '💎',
    requirement: 'Share 10 rocks'
  },
  {
    id: 'Rock Master',
    name: 'Rock Master',
    description: 'Share 50 rock discoveries',
    rarity: 'rare',
    icon: '👑',
    requirement: 'Share 50 rocks'
  },
  {
    id: 'First Hunt',
    name: 'First Hunt',
    description: 'Join your first rock hunt',
    rarity: 'common',
    icon: '🏔️',
    requirement: 'Join 1 hunt'
  },
  {
    id: 'Hunt Enthusiast',
    name: 'Hunt Enthusiast',
    description: 'Join 5 rock hunts',
    rarity: 'uncommon',
    icon: '🎯',
    requirement: 'Join 5 hunts'
  },
  {
    id: 'Hunt Master',
    name: 'Hunt Master',
    description: 'Join 20 rock hunts',
    rarity: 'rare',
    icon: '🏆',
    requirement: 'Join 20 hunts'
  },
  {
    id: 'Community Member',
    name: 'Community Member',
    description: 'Welcome to Rock Spotter!',
    rarity: 'common',
    icon: '🌟',
    requirement: 'Join the community'
  },
  {
    id: 'Explorer',
    name: 'Explorer',
    description: 'Visit 5 different locations',
    rarity: 'uncommon',
    icon: '🧭',
    requirement: 'Post from 5 locations'
  },
  {
    id: 'Social Butterfly',
    name: 'Social Butterfly',
    description: 'Get 100 likes on your posts',
    rarity: 'uncommon',
    icon: '🦋',
    requirement: 'Receive 100 likes'
  },
  {
    id: 'Legendary Geologist',
    name: 'Legendary Geologist',
    description: 'The ultimate rock enthusiast',
    rarity: 'legendary',
    icon: '⚡',
    requirement: 'Complete all other achievements'
  }
];

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
    return null; // Optional auth
  }
  
  try {
    const token = authHeader.substring(7);
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
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

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await connectDB();

    const { userId } = req.query;
    
    // If userId is provided, get specific user achievements
    if (userId) {
      const user = await User.findById(userId).select('username achievements rockCount huntCount profilePicture createdAt');
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Calculate progress for locked achievements
      const userAchievements = AVAILABLE_ACHIEVEMENTS.map(achievement => {
        const isUnlocked = user.achievements.includes(achievement.id);
        let progress = 0;
        let progressMax = 1;

        // Calculate progress based on achievement type
        if (!isUnlocked) {
          switch (achievement.id) {
            case 'First Rock':
              progress = Math.min(user.rockCount, 1);
              progressMax = 1;
              break;
            case 'Rock Collector':
              progress = Math.min(user.rockCount, 10);
              progressMax = 10;
              break;
            case 'Rock Master':
              progress = Math.min(user.rockCount, 50);
              progressMax = 50;
              break;
            case 'First Hunt':
              progress = Math.min(user.huntCount, 1);
              progressMax = 1;
              break;
            case 'Hunt Enthusiast':
              progress = Math.min(user.huntCount, 5);
              progressMax = 5;
              break;
            case 'Hunt Master':
              progress = Math.min(user.huntCount, 20);
              progressMax = 20;
              break;
          }
        }

        return {
          ...achievement,
          isUnlocked,
          progress,
          progressMax,
          progressPercent: progressMax > 0 ? Math.round((progress / progressMax) * 100) : 0
        };
      });

      const stats = {
        totalAchievements: AVAILABLE_ACHIEVEMENTS.length,
        unlockedAchievements: user.achievements.length,
        completionPercent: Math.round((user.achievements.length / AVAILABLE_ACHIEVEMENTS.length) * 100)
      };

      return res.status(200).json({
        user: {
          id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
          memberSince: user.createdAt,
          rockCount: user.rockCount,
          huntCount: user.huntCount
        },
        achievements: userAchievements,
        stats
      });
    }

    // If no userId, check if user is authenticated and return their achievements
    const decoded = verifyToken(req.headers.authorization);
    
    if (decoded) {
      const user = await User.findById(decoded.userId).select('username achievements rockCount huntCount profilePicture createdAt');
      
      if (user) {
        const userAchievements = AVAILABLE_ACHIEVEMENTS.map(achievement => {
          const isUnlocked = user.achievements.includes(achievement.id);
          return {
            ...achievement,
            isUnlocked,
            unlockedAt: isUnlocked ? new Date() : null // You might want to store actual unlock dates
          };
        });

        return res.status(200).json({
          user: {
            id: user._id,
            username: user.username,
            profilePicture: user.profilePicture,
            memberSince: user.createdAt,
            rockCount: user.rockCount,
            huntCount: user.huntCount
          },
          achievements: userAchievements
        });
      }
    }

    // Return all available achievements (public view)
    res.status(200).json({
      achievements: AVAILABLE_ACHIEVEMENTS.map(achievement => ({
        ...achievement,
        isUnlocked: false
      }))
    });

  } catch (error) {
    console.error('Error fetching achievements:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}