'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const eleves = await queryInterface.sequelize.query(
      'SELECT id FROM ELEVE;'
    )

    const absences = await queryInterface.sequelize.query(
      'SELECT id FROM ABSENCE;'
    )

    const evaluations = await queryInterface.sequelize.query(
      'SELECT id FROM EVALUATION;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          type: faker.lorem.word(),
          eleveId: eleves[0][Math.floor(Math.random() * (eleves[0].length - 1))].id,
          absenceId: absences[0][Math.floor(Math.random() * (absences[0].length - 1))].id,
          evaluationId: evaluations[0][Math.floor(Math.random() * (evaluations[0].length - 1))].id
        }
      )
    }
    return queryInterface.bulkInsert('NOTIFICATION', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('NOTIFICATION', null, {});
  }
};
