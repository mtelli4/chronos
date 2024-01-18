'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const eleves = await queryInterface.sequelize.query(
      'SELECT id FROM ELEVE;'
    )

    const evaluations = await queryInterface.sequelize.query(
      'SELECT id FROM EVALUATION;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          note: faker.random.number({ min: 0, max: 20, precision: 0.01 }),
          eleveId: eleves[0][Math.floor(Math.random() * eleves[0].length)].id,
          evaluationId: evaluations[0][Math.floor(Math.random() * evaluations[0].length)].id
        }
      )
    }
    return queryInterface.bulkInsert('NOTE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NOTE', null, {});
  }
};
