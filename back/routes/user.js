const express = require('express');
const router = express.Router();
const db = require('../models');
const User = db.User;

// Получение всех пользователей
router.get('/allusers', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создание нового пользователя
router.post('/newuser', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    console.log(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
