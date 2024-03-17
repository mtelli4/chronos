'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'ABSENCE',
      'envoye',
      {
        type: Sequelize.TINYINT(1),
        null: true
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('ABSENCE', 'envoye');
  }
};