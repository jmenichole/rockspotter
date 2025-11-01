/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

const Hunt = require('../models/Hunt');
const User = require('../models/User');

// Create a new hunt
exports.createHunt = async (req, res) => {
  try {
    const { title, description, rocks, difficulty, startDate, endDate, maxParticipants } = req.body;

    const hunt = new Hunt({
      title,
      description,
      rocks,
      difficulty,
      startDate,
      endDate,
      maxParticipants,
      creator: req.userId
    });

    await hunt.save();

    res.status(201).json({
      message: 'Hunt created successfully',
      hunt
    });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    // Handle other errors
    res.status(500).json({ error: error.message });
  }
};

// Get all hunts
exports.getHunts = async (req, res) => {
  try {
    const { isActive, difficulty, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (difficulty) filter.difficulty = difficulty;

    const hunts = await Hunt.find(filter)
      .populate('creator', 'username profilePicture')
      .populate('rocks.rock', 'title photo')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Hunt.countDocuments(filter);

    res.json({
      hunts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get hunt by ID
exports.getHuntById = async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id)
      .populate('creator', 'username profilePicture')
      .populate('rocks.rock')
      .populate('participants.user', 'username profilePicture');

    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    res.json({ hunt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Join a hunt
exports.joinHunt = async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id);

    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    // Check if hunt is active
    if (!hunt.isCurrentlyActive()) {
      return res.status(400).json({ error: 'Hunt is not currently active' });
    }

    // Check if already joined
    const alreadyJoined = hunt.participants.some(
      p => p.user.toString() === req.userId.toString()
    );

    if (alreadyJoined) {
      return res.status(400).json({ error: 'Already joined this hunt' });
    }

    // Check max participants
    if (hunt.maxParticipants > 0 && hunt.participants.length >= hunt.maxParticipants) {
      return res.status(400).json({ error: 'Hunt is full' });
    }

    hunt.participants.push({
      user: req.userId,
      rocksFound: [],
      completed: false
    });

    await hunt.save();

    res.json({ message: 'Joined hunt successfully', hunt });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark rock as found in hunt
exports.markRockFound = async (req, res) => {
  try {
    const { huntId, rockId } = req.params;

    const hunt = await Hunt.findById(huntId);

    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    // Find participant
    const participant = hunt.participants.find(
      p => p.user.toString() === req.userId.toString()
    );

    if (!participant) {
      return res.status(400).json({ error: 'Not participating in this hunt' });
    }

    // Check if rock is part of this hunt
    const huntRock = hunt.rocks.find(r => r.rock.toString() === rockId);

    if (!huntRock) {
      return res.status(400).json({ error: 'Rock is not part of this hunt' });
    }

    // Check if already found
    if (participant.rocksFound.includes(rockId)) {
      return res.status(400).json({ error: 'Rock already marked as found' });
    }

    participant.rocksFound.push(rockId);

    // Check if all rocks found
    if (participant.rocksFound.length === hunt.rocks.length) {
      participant.completed = true;
      participant.completedAt = new Date();
      
      // Update user's hunt count
      await User.findByIdAndUpdate(req.userId, { $inc: { huntCount: 1 } });
    }

    await hunt.save();

    res.json({
      message: 'Rock marked as found',
      completed: participant.completed,
      progress: {
        found: participant.rocksFound.length,
        total: hunt.rocks.length
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's hunt progress
exports.getMyHunts = async (req, res) => {
  try {
    const hunts = await Hunt.find({
      'participants.user': req.userId
    })
      .populate('creator', 'username profilePicture')
      .populate('rocks.rock', 'title photo');

    // Filter to only show user's progress
    const myHunts = hunts.map(hunt => {
      const participant = hunt.participants.find(
        p => p.user.toString() === req.userId.toString()
      );

      return {
        hunt: {
          _id: hunt._id,
          title: hunt.title,
          description: hunt.description,
          difficulty: hunt.difficulty,
          totalRocks: hunt.rocks.length,
          creator: hunt.creator
        },
        progress: {
          rocksFound: participant.rocksFound.length,
          totalRocks: hunt.rocks.length,
          completed: participant.completed,
          completedAt: participant.completedAt,
          startedAt: participant.startedAt
        }
      };
    });

    res.json({ hunts: myHunts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update hunt
exports.updateHunt = async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id);

    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    if (hunt.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, description, difficulty, isActive } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (difficulty) updates.difficulty = difficulty;
    if (isActive !== undefined) updates.isActive = isActive;

    Object.assign(hunt, updates);
    await hunt.save();

    res.json({ message: 'Hunt updated successfully', hunt });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    // Handle other errors
    res.status(500).json({ error: error.message });
  }
};

// Delete hunt
exports.deleteHunt = async (req, res) => {
  try {
    const hunt = await Hunt.findById(req.params.id);

    if (!hunt) {
      return res.status(404).json({ error: 'Hunt not found' });
    }

    if (hunt.creator.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Hunt.findByIdAndDelete(req.params.id);

    res.json({ message: 'Hunt deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
