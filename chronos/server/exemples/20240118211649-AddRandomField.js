'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Fonction up -> Modification(s) à effectuer 
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'EXEMPLE', // Table name
      'champTropCool', // New field name
      {
        type: Sequelize.BOOLEAN,
      },
    );
  },

  // Fonction down -> 'Inverse' de up, on revert les modifications faites par up
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('EXEMPLE', 'champTropCool');
  }
};
