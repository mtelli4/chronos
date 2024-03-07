// migration du modèle UtilisateurRole (Many-to-Many)
'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('UTILISATEUR_ROLE', {
      UtilisateurId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'UTILISATEUR',
          key: 'id'
        }
      },
      RoleId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        references: {
          model: 'ROLE',
          key: 'id'
        }
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('UTILISATEUR_ROLE');
  }
};
