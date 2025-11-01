/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

const Achievement = require('../models/Achievement');
const User = require('../models/User');

// Create a new achievement (admin only - simplified for now)
exports.createAchievement = async (req, res) => {
  try {
    const { name, description, icon, type, criteria, rarity } = req.body;

    const achievement = new Achievement({
      name,
      description,
      icon,
      type,
      criteria,
      rarity
    });

    await achievement.save();

    res.status(201).json({
      message: 'Achievement created successfully',
      achievement
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all achievements
exports.getAchievements = async (req, res) => {
  try {
    const { type, rarity } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (rarity) filter.rarity = rarity;

    const achievements = await Achievement.find(filter).sort({ createdAt: -1 });

    res.json({ achievements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get achievement by ID
exports.getAchievementById = async (req, res) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    res.json({ achievement });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Award achievement to user
exports.awardAchievement = async (req, res) => {
  try {
    const { achievementId } = req.body;

    const achievement = await Achievement.findById(achievementId);
    if (!achievement) {
      return res.status(404).json({ error: 'Achievement not found' });
    }

    const user = await User.findById(req.userId);
    
    // Check if user already has this achievement
    if (user.achievements.includes(achievementId)) {
      return res.status(400).json({ error: 'Achievement already awarded' });
    }

    user.achievements.push(achievementId);
    await user.save();

    res.json({
      message: 'Achievement awarded successfully',
      achievement
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get user's achievements
exports.getUserAchievements = async (req, res) => {
  try {
    const userId = req.params.userId || req.userId;
    const user = await User.findById(userId).populate('achievements');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ achievements: user.achievements });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
