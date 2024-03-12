'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('STATUT_NOTE', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      libelle: {
        type: Sequelize.STRING
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

    await queryInterface.addColumn(
      'NOTE', // table name
      'statutId', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'STATUT_NOTE',
          key: 'id',
        },
      },
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('NOTE', 'statutId');
    await queryInterface.dropTable('STATUT_NOTE');
  }
};
