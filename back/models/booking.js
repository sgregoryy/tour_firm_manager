module.exports = (sequelize, DataTypes) => {
    const Booking = sequelize.define('Booking', {
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      details: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Booking;
  };
  