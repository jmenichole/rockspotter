/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 * 
 * Error Handler - Centralized error handling utility
 */

/**
 * Handle errors from controller functions
 * @param {Error} error - The error object
 * @param {Object} res - Express response object
 */
exports.handleError = (error, res) => {
  // Handle validation errors
  if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message });
  }
  
  // Handle duplicate key errors
  if (error.code === 11000) {
    const field = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'field';
    return res.status(400).json({ error: `${field} already exists` });
  }
  
  // Handle cast errors (invalid ObjectId)
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  // Handle other errors
  res.status(500).json({ error: error.message });
};
