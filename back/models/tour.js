module.exports = (sequelize, DataTypes) => {
    const Tour = sequelize.define('Tour', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
    });
  
    return Tour;
  };
  