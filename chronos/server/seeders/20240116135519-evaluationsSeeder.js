'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const modules = await queryInterface.sequelize.query(
      'SELECT id FROM MODULE_COURS;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          libelle: faker.lorem.word(),
          coefficient: faker.random.number({ min: 1, max: 5 }),
          moduleId: modules[0][Math.floor(Math.random() * modules[0].length)].id,
        }
      )
    }
    return queryInterface.bulkInsert('EVALUATION', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('EVALUATION', null, {});
  }
};
