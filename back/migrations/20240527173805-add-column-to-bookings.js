'use strict';

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Bookings', 'details', {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: ''
    });
  },
};

