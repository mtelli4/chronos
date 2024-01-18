'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Fonction up -> Modification(s) à effectuer 
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('EXEMPLE', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      champ1: {
        type: Sequelize.STRING
      },
      champ2: {
        type: Sequelize.STRING
      },
      champ3: {
        type: Sequelize.INTEGER
      },
      champ4: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  // Fonction down -> 'Inverse' de up, on revert les modifications faites par up
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('EXEMPLE');
  }
};
