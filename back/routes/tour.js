const express = require('express');
const router = express.Router();
const db = require('../models');
const Tour = db.Tour;

// Получение всех туров
router.get('/alltours', async (req, res) => {
  try {
    const tours = await Tour.findAll();
    res.json(tours);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создание нового тура
router.post('/newtour', async (req, res) => {
  console.log(req.body);
  try {
    const newTour = await Tour.create(req.body);
    console.log(req.body);
    res.json(newTour);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
