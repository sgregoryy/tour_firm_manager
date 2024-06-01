// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./back/models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Синхронизация с базой данных
db.sequelize.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.error('Failed to sync database:', err));

// Маршруты
const clientRoutes = require('./back/routes/client');
const tourRoutes = require('./back/routes/tour');
const bookingRoutes = require('./back/routes/booking');
const userRoutes = require('./back/routes/user');
const authRoutes = require('./back/routes/auth');

app.use('/api/clients', clientRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
