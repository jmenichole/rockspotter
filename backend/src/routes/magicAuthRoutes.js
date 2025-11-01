/*
 * Rock Spotter - Magic Authentication Routes
 * Routes for SMS-based magic code authentication
 */

const express = require('express');
const router = express.Router();
const magicAuthController = require('../controllers/magicAuthController');

// Magic code authentication routes
router.post('/request-code', magicAuthController.requestMagicCode);
router.post('/verify-code', magicAuthController.verifyMagicCode);

// Debug route (development only)
if (process.env.NODE_ENV !== 'production') {
  router.get('/active-codes', magicAuthController.getActiveCodes);
}

module.exports = router;