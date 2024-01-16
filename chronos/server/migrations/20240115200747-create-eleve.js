'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Eleves', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      prenom: {
        type: Sequelize.STRING
      },
      mdp: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      numeroEtudiant: {
        type: Sequelize.STRING
      },
      trombinoscope: {
        type: Sequelize.STRING
      },
      tiersTemps: {
        type: Sequelize.BOOLEAN
      },
      formationId: {
        type: Sequelize.INTEGER
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Eleves');
  }
};