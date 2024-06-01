// routes/auth.js
const express = require('express');
const router = express.Router();
const db = require('../models');
const jwt = require('jsonwebtoken');

const User = db.User;

// Регистрация
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    console.log(username, password);
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Авторизация
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const isMatch = await user.validPassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid password' });
    }

    const payload = { id: user.id, username: user.username };
    const token = jwt.sign(payload, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
