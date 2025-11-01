/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Rock Controller - Handles rock posts, social interactions, and feed logic
 */

const Rock = require('../models/Rock');
const User = require('../models/User');

// Create a new rock post
exports.createRock = async (req, res) => {
  try {
    const { title, description, photo, location, rockType, tags, isPublic } = req.body;

    const rock = new Rock({
      title,
      description,
      photo,
      location,
      rockType,
      tags,
      isPublic,
      user: req.userId
    });

    await rock.save();

    // Update user's rock count
    await User.findByIdAndUpdate(req.userId, { $inc: { rockCount: 1 } });

    res.status(201).json({
      message: 'Rock posted successfully',
      rock
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

// Get all rocks (with filters)
exports.getRocks = async (req, res) => {
  try {
    const { rockType, userId, page = 1, limit = 20 } = req.query;
    const filter = { isPublic: true };

    if (rockType) filter.rockType = rockType;
    if (userId) filter.user = userId;

    const rocks = await Rock.find(filter)
      .populate('user', 'username profilePicture')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Rock.countDocuments(filter);

    res.json({
      rocks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get rock by ID
exports.getRockById = async (req, res) => {
  try {
    const rock = await Rock.findById(req.params.id)
      .populate('user', 'username profilePicture')
      .populate('comments.user', 'username profilePicture');

    if (!rock) {
      return res.status(404).json({ error: 'Rock not found' });
    }

    res.json({ rock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get nearby rocks
exports.getNearbyRocks = async (req, res) => {
  try {
    const { longitude, latitude, maxDistance = 5000 } = req.query;

    if (!longitude || !latitude) {
      return res.status(400).json({ error: 'Longitude and latitude required' });
    }

    const rocks = await Rock.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(longitude), parseFloat(latitude)]
          },
          $maxDistance: parseInt(maxDistance)
        }
      },
      isPublic: true
    }).populate('user', 'username profilePicture');

    res.json({ rocks });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a rock
exports.likeRock = async (req, res) => {
  try {
    const rock = await Rock.findById(req.params.id);

    if (!rock) {
      return res.status(404).json({ error: 'Rock not found' });
    }

    const likeIndex = rock.likes.indexOf(req.userId);

    if (likeIndex > -1) {
      // Unlike
      rock.likes.splice(likeIndex, 1);
    } else {
      // Like
      rock.likes.push(req.userId);
    }

    await rock.save();

    res.json({
      message: likeIndex > -1 ? 'Rock unliked' : 'Rock liked',
      likes: rock.likes.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add comment to rock
exports.addComment = async (req, res) => {
  try {
    const { text } = req.body;
    const rock = await Rock.findById(req.params.id);

    if (!rock) {
      return res.status(404).json({ error: 'Rock not found' });
    }

    rock.comments.push({
      user: req.userId,
      text
    });

    await rock.save();
    await rock.populate('comments.user', 'username profilePicture');

    res.json({
      message: 'Comment added',
      comment: rock.comments[rock.comments.length - 1]
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

// Update rock
exports.updateRock = async (req, res) => {
  try {
    const rock = await Rock.findById(req.params.id);

    if (!rock) {
      return res.status(404).json({ error: 'Rock not found' });
    }

    if (rock.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    const { title, description, rockType, tags, isPublic } = req.body;
    const updates = {};

    if (title) updates.title = title;
    if (description) updates.description = description;
    if (rockType) updates.rockType = rockType;
    if (tags) updates.tags = tags;
    if (isPublic !== undefined) updates.isPublic = isPublic;

    Object.assign(rock, updates);
    await rock.save();

    res.json({ message: 'Rock updated successfully', rock });
  } catch (error) {
    // Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    
    // Handle other errors
    res.status(500).json({ error: error.message });
  }
};

// Delete rock
exports.deleteRock = async (req, res) => {
  try {
    const rock = await Rock.findById(req.params.id);

    if (!rock) {
      return res.status(404).json({ error: 'Rock not found' });
    }

    if (rock.user.toString() !== req.userId.toString()) {
      return res.status(403).json({ error: 'Not authorized' });
    }

    await Rock.findByIdAndDelete(req.params.id);
    await User.findByIdAndUpdate(req.userId, { $inc: { rockCount: -1 } });

    res.json({ message: 'Rock deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
