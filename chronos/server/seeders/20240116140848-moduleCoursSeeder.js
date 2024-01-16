'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const blocCompetences = await queryInterface.sequelize.query(
      'SELECT id FROM BLOC_COMPETENCE;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          libelle: faker.lorem.word(),
          codeApogee: faker.random.alphaNumeric(8),
          blocCompetenceId: blocCompetences[0][Math.floor(Math.random() * blocCompetences[0].length)].id,
        }
      )
    }
    return queryInterface.bulkInsert('MODULE_COURS', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('MODULE_COURS', null, {});
  }
};
