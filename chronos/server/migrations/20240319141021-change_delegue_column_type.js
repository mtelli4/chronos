'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('ELEVE', 'delegue', {
              type: Sequelize.BOOLEAN,
              allowNull: true,
          })
      ])
  },

  down: (queryInterface, Sequelize) => {
      return Promise.all([
          queryInterface.changeColumn('ELEVE', 'delegue', {
              type: Sequelize.DECIMAL,
              allowNull: true,
          })
      ])
  }
};
