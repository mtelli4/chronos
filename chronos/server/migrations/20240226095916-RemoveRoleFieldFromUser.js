'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UTILISATEUR', 'role');
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('UTILISATEUR', 'role', {
      type: Sequelize.INTEGER,
    });
  },
};
