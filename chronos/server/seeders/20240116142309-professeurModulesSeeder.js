'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const professeurs = await queryInterface.sequelize.query(
      'SELECT id FROM PROFESSEUR;'
    )

    const modules = await queryInterface.sequelize.query(
      'SELECT id FROM MODULE_COURS;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          presences: faker.random.number({ min: 0, max: 20, precision: 1 }),
          professeurId: professeurs[0][Math.floor(Math.random() * professeurs[0].length)].id,
          moduleId: modules[0][Math.floor(Math.random() * modules[0].length)].id,
        }
      )
    }
    return queryInterface.bulkInsert('PROFESSEUR_MODULE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PROFESSEUR_MODULE', null, {});
  }
};
