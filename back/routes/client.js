const express = require('express');
const router = express.Router();
const db = require('../models');
const Client = db.Client;

// Получение всех клиентов
router.get('/allclients', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создание нового клиента
router.post('/newclient', async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    console.log(req.body);
    res.json(newClient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
