const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import the User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// @route POST /api/register
// @desc Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with that email already exists.' });
    }

    user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: 'User with that username already exists.' });
    }

    // Create new user
    user = new User({
      username,
      email,
      password, // Password will be hashed by the pre-save hook in the User model
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    console.error('Registration error:', err.message);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// @route POST /api/login
// @desc Authenticate user & get token
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Credentials' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1h' }, // Token expires in 1 hour
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error('Login error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route GET /api/auth/me
// @desc Get current user profile
router.get('/auth/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Profile fetch error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route PUT /api/auth/profile
// @desc Update user profile
router.put('/auth/profile', auth, async (req, res) => {
  const { name, phone, organization, position } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update user fields
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (organization) user.organization = organization;
    if (position) user.position = position;

    await user.save();
    
    const updatedUser = await User.findById(req.user.id).select('-password');
    res.json(updatedUser);
  } catch (err) {
    console.error('Profile update error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 