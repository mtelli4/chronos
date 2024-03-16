'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('PERIODE', {
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
      'EVALUATION', // table name
      'periodeId', // new field name
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'PERIODE',
          key: 'id',
        },
      },
    );

    await queryInterface.addColumn(
      'EVALUATION', // table name
      'noteMaximale', // new field name
      {
        type: Sequelize.INTEGER,
        defaultValue : 20,
      },
    );

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('PERIODE', 'periodeId');
    await queryInterface.removeColumn('EVALUATION', 'noteMaximale');
    await queryInterface.dropTable('PERIODE');
  }
};
