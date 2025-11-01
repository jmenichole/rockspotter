/*
 * Rock Spotter - A social platform for rock enthusiasts
 * Copyright (c) 2025 Rock Spotter Community
 * 
 * This software is licensed under the MIT License.
 * See the LICENSE file in the root directory for full license text.
 */

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

// Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/:id', userController.getUserById);

// Protected routes
router.get('/profile/me', auth, userController.getProfile);
router.put('/profile/me', auth, userController.updateProfile);

// Admin routes
router.get('/admin/all', auth, userController.getAllUsers);
router.put('/admin/:userId/role', auth, userController.updateUserRole);

// Admin routes
router.get('/admin/all', auth, userController.getAllUsers);
router.put('/admin/:userId/role', auth, userController.updateUserRole);

module.exports = router;
