/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

const mongoose = require('mongoose');

const huntSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rocks: [{
    rock: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rock',
      required: true
    },
    hint: {
      type: String,
      default: ''
    },
    order: {
      type: Number,
      required: true
    }
  }],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rocksFound: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rock'
    }],
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date,
    startedAt: {
      type: Date,
      default: Date.now
    }
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  maxParticipants: {
    type: Number,
    default: 0 // 0 means unlimited
  }
}, { timestamps: true });

// Method to check if hunt is currently active
huntSchema.methods.isCurrentlyActive = function() {
  const now = new Date();
  return this.isActive && now >= this.startDate && now <= this.endDate;
};

module.exports = mongoose.model('Hunt', huntSchema);
