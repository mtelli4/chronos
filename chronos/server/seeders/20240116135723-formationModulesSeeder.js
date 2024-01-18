'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formations = await queryInterface.sequelize.query(
      'SELECT id FROM FORMATION;'
    )

    const modules = await queryInterface.sequelize.query(
      'SELECT id FROM MODULE_COURS;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          formationId: formations[0][Math.floor(Math.random() * formations[0].length)].id,
          moduleId: modules[0][Math.floor(Math.random() * modules[0].length)].id
        }
      )
    }
    return queryInterface.bulkInsert('FORMATION_MODULE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FORMATION_MODULE', null, {});
  }
};
