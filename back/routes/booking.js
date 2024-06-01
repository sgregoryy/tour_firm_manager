const express = require('express');
const router = express.Router();
const db = require('../models');
const Booking = db.Booking;

// Получение всех бронирований
router.get('/allbookings', async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Создание нового бронирования
router.post('/newbooking', async (req, res) => {
  try {
    const newBooking = await Booking.create(req.body);
    console.log(req.body);
    res.json(newBooking);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
