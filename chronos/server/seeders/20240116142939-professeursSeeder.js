'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          nom: faker.name.lastName(),
          prenom: faker.name.firstName(),
          vacataire: faker.random.boolean(),
        }
      )
    }
    return queryInterface.bulkInsert('PROFESSEUR', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('PROFESSEUR', null, {});
  }
};
