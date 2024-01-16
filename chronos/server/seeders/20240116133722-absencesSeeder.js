'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const eleves = await queryInterface.sequelize.query(
      'SELECT id FROM ELEVE;'
    )

    const cours = await queryInterface.sequelize.query(
      'SELECT id FROM COURS;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          valide: faker.random.boolean(),
          justificatif: faker.lorem.word(),
          message: faker.lorem.sentence(),
          eleveId: eleves[0][Math.floor(Math.random() * eleves[0].length)].id,
          coursId: cours[0][Math.floor(Math.random() * cours[0].length)].id
        }
      )
    }
    return queryInterface.bulkInsert('ABSENCE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ABSENCE', null, {});
  }
};
