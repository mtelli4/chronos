'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'UTILISATEUR', // table name
      'nom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'UTILISATEUR', // table name
      'prenom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.removeColumn('ELEVE', 'nom');
    await queryInterface.removeColumn('ELEVE', 'prenom');
    
    await queryInterface.removeColumn('SECRETAIRE', 'nom');
    await queryInterface.removeColumn('SECRETAIRE', 'prenom');
    
    await queryInterface.removeColumn('PROFESSEUR', 'nom');
    await queryInterface.removeColumn('PROFESSEUR', 'prenom');

    await queryInterface.changeColumn('ELEVE', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:false
    });
    await queryInterface.changeColumn('SECRETAIRE', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:false
    });
    await queryInterface.changeColumn('DIRECTEUR', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:false
    });
    await queryInterface.changeColumn('PROFESSEUR', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UTILISATEUR', 'nom');
    await queryInterface.removeColumn('UTILISATEUR', 'prenom');

    await queryInterface.addColumn(
      'ELEVE', // table name
      'prenom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'ELEVE', // table name
      'nom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'ELEVE', // table name
      'email', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'ELEVE', // table name
      'mdp', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );

    await queryInterface.addColumn(
      'SECRETAIRE', // table name
      'prenom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'SECRETAIRE', // table name
      'nom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'SECRETAIRE', // table name
      'email', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'SECRETAIRE', // table name
      'mdp', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );

    await queryInterface.addColumn(
      'PROFESSEUR', // table name
      'prenom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'PROFESSEUR', // table name
      'nom', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'PROFESSEUR', // table name
      'email', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );
    await queryInterface.addColumn(
      'PROFESSEUR', // table name
      'mdp', // new field name
      {
        type: Sequelize.STRING,
        allowNull: false,
      },
    );

    await queryInterface.changeColumn('ELEVE', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:true
    });
    await queryInterface.changeColumn('SECRETAIRE', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:true
    });
    await queryInterface.changeColumn('DIRECTEUR', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:true
    });
    await queryInterface.changeColumn('PROFESSEUR', 'utilisateurId', {
      type: Sequelize.INTEGER,
      allowNull:true
    });
  }
};
