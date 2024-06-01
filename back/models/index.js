const { Sequelize } = require('sequelize');
const config = require('../config/config.json');

const sequelize = new Sequelize({
  dialect: config.development.dialect,
  storage: config.development.storage,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Импортируйте модели
db.Client = require('./client')(sequelize, Sequelize);
db.Tour = require('./tour')(sequelize, Sequelize);
db.Booking = require('./booking')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);

// Связи между моделями
db.Client.hasMany(db.Booking);
db.Tour.hasMany(db.Booking);
db.User.hasMany(db.Booking);
db.Booking.belongsTo(db.Client);
db.Booking.belongsTo(db.Tour);
db.Booking.belongsTo(db.User);

module.exports = db;
