/*
 * Rock Spotter - Magic Code Authentication
 * SMS-based authentication using magic codes
 */

const User = require('../models/User');
const jwt = require('jsonwebtoken');

// In-memory store for magic codes (in production, use Redis or database)
const magicCodes = new Map();

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate 6-digit magic code
const generateMagicCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Request magic code
exports.requestMagicCode = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    
    // Validate phone number format
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ error: 'Invalid phone number format' });
    }

    // Check if this is the admin phone number
    const isAdminPhone = cleanPhone === '8508670087';
    
    if (!isAdminPhone) {
      return res.status(403).json({ error: 'Magic code authentication is currently only available for admin' });
    }

    // Generate magic code
    const code = generateMagicCode();
    
    // Store code with 5-minute expiration
    magicCodes.set(phoneNumber, {
      code,
      expires: Date.now() + 5 * 60 * 1000, // 5 minutes
      attempts: 0
    });

    // In a real app, you'd send SMS here using Twilio, AWS SNS, etc.
    // For now, we'll just log it and return it in development
    console.log(`Magic code for ${phoneNumber}: ${code}`);
    
    // In development, return the code. In production, only send via SMS
    const response = {
      message: 'Magic code sent successfully',
      phoneNumber: phoneNumber
    };
    
    // Only include code in development
    if (process.env.NODE_ENV !== 'production') {
      response.code = code; // Remove this in production
    }

    res.json(response);
  } catch (error) {
    console.error('Magic code request error:', error);
    res.status(500).json({ error: 'Failed to send magic code' });
  }
};

// Verify magic code and login
exports.verifyMagicCode = async (req, res) => {
  try {
    const { phoneNumber, code } = req.body;
    
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    
    // Check if code exists and is valid
    const storedData = magicCodes.get(phoneNumber);
    if (!storedData) {
      return res.status(400).json({ error: 'No magic code found for this phone number' });
    }

    // Check if code has expired
    if (Date.now() > storedData.expires) {
      magicCodes.delete(phoneNumber);
      return res.status(400).json({ error: 'Magic code has expired' });
    }

    // Check attempts limit
    if (storedData.attempts >= 3) {
      magicCodes.delete(phoneNumber);
      return res.status(400).json({ error: 'Too many failed attempts' });
    }

    // Verify code
    if (storedData.code !== code) {
      storedData.attempts++;
      return res.status(400).json({ error: 'Invalid magic code' });
    }

    // Code is valid, clear it
    magicCodes.delete(phoneNumber);

    // Find or create admin user
    let user = await User.findOne({ 
      $or: [
        { email: 'jmenichole007@outlook.com' },
        { username: 'jmenichole' },
        { phoneNumber: cleanPhone }
      ]
    });

    if (!user) {
      // Create admin user if doesn't exist
      user = new User({
        username: 'jmenichole',
        email: 'jmenichole007@outlook.com',
        phoneNumber: cleanPhone,
        password: 'magic-auth-' + Date.now(), // Random password since we're using magic codes
        role: 'admin',
        isAdmin: true,
        isModerator: true
      });
      await user.save();
    } else {
      // Update existing user to ensure admin privileges
      user.role = 'admin';
      user.isAdmin = true;
      user.isModerator = true;
      user.phoneNumber = cleanPhone;
      await user.save();
    }

    // Generate token
    const token = generateToken(user._id);

    res.json({
      message: 'Magic code verified successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,
        isModerator: user.isModerator
      },
      token
    });
  } catch (error) {
    console.error('Magic code verification error:', error);
    res.status(500).json({ error: 'Failed to verify magic code' });
  }
};

// Get active magic codes (admin only, for debugging)
exports.getActiveCodes = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(404).json({ error: 'Not found' });
    }

    const activeCodes = Array.from(magicCodes.entries()).map(([phone, data]) => ({
      phone,
      code: data.code,
      expires: new Date(data.expires),
      attempts: data.attempts
    }));

    res.json({ activeCodes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};