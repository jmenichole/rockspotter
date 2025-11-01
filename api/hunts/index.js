// Get all rock hunts with filtering
import mongoose from 'mongoose';

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
  isActive: { type: Boolean, default: true },
  completedBy: [{ 
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    completedAt: { type: Date, default: Date.now },
    rocksFound: [{ type: String }]
  }]
}, {
  timestamps: true
});

const Hunt = mongoose.models.Hunt || mongoose.model('Hunt', HuntSchema);

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

    const { 
      page = 1, 
      limit = 10, 
      difficulty, 
      location, 
      upcoming = 'true',
      sortBy = 'date',
      sortOrder = 'asc'
    } = req.query;

    // Build query
    const query = { isActive: true };
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Filter for upcoming hunts
    if (upcoming === 'true') {
      query.date = { $gte: new Date() };
    }

    // Sort options
    const sortOptions = {};
    sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Execute query with pagination
    const hunts = await Hunt.find(query)
      .populate('organizer', 'username profilePicture')
      .populate('participants', 'username profilePicture')
      .sort(sortOptions)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    // Add participant count and availability
    const huntsWithInfo = hunts.map(hunt => ({
      ...hunt.toObject(),
      participantCount: hunt.participants.length,
      spotsAvailable: hunt.maxParticipants - hunt.participants.length,
      isUpcoming: hunt.date > new Date()
    }));

    // Get total count
    const total = await Hunt.countDocuments(query);

    res.status(200).json({
      hunts: huntsWithInfo,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        count: huntsWithInfo.length,
        totalHunts: total
      }
    });

  } catch (error) {
    console.error('Error fetching hunts:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}