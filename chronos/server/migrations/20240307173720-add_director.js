'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DIRECTEUR', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      utilisateurId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'UTILISATEUR',
            key: 'id',
          },
        },
    });

    await queryInterface.createTable('FORMATION_DIRECTEUR',{
      directeurId:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'DIRECTEUR',
          key: 'id',
        },
      },
      formationId :{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'FORMATION',
          key: 'id',
        },
      },
      createdAt:{
        allowNull:false,
        type: Sequelize.DATE,
      },
      updatedAt:{
        allowNull:false,
        type:Sequelize.DATE,
      },
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('FORMATION_DIRECTEUR');
    await queryInterface.dropTable('DIRECTEUR');
  }
};
