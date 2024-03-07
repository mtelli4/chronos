'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'ABSENCE',
      'retard',
      {
        type: Sequelize.INTEGER,
        null: true
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ABSENCE', 'retard');
  }
};
