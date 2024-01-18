'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.dropTable('Formation_Module');
    await queryInterface.createTable(
      'Formation_Module',
      {
        createdAt:{
          allowNull:false,
          type: Sequelize.DATE,
        },
        updatedAt:{
          allowNull:false,
          type:Sequelize.DATE,
        },
        FormationId:{
          type:Sequelize.INTEGER,
          primaryKey: true,
        },
        ModuleCoursId: {
          type : Sequelize.INTEGER,
          primaryKey: true,
        }
      }
    );
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('Formation_Module');
    await queryInterface.createTable(
      'Formation_Module',
      {
        formationId:{
          primaryKey:true,
          allowNull:false,
          type: Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'FORMATION',
            key: 'id'
          }
        },
        moduleId:{
          primaryKey:true,
          allowNull:false,
          type:Sequelize.INTEGER,
          onDelete: 'CASCADE',
          references: {
            model: 'MODULE_COURS',
            key: 'id'
          }
        },
      }
    );
  }
};
