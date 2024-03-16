'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PROFESSEUR_MODULE', 'presences');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'PROFESSEUR_MODULE',
      'presences',
      {
        type: Sequelize.DECIMAL,
        null: true
      },
    );
  }
};
