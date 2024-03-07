'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MESSAGE', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT('long'), // ou TEXT selon la taille des messages
        allowNull: false
      },
      UtilisateurId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'UTILISATEUR',
          key: 'id'
        }
      },
      ModuleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'MODULE_COURS',
          key: 'id'
        }
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
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('MESSAGE');
  }
};
