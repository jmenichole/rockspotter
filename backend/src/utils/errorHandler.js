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
    // Try to extract field name from keyPattern or keyValue
    let field = 'This value';
    if (error.keyPattern) {
      field = Object.keys(error.keyPattern)[0];
    } else if (error.keyValue) {
      field = Object.keys(error.keyValue)[0];
    }
    return res.status(400).json({ error: `${field} already exists` });
  }
  
  // Handle cast errors (invalid ObjectId)
  if (error.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  
  // Handle other errors - log full error but return generic message
  console.error('Server error:', error);
  res.status(500).json({ error: 'An internal server error occurred' });
};
