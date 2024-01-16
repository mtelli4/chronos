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
          mdp: faker.internet.password(),
          email: faker.internet.email(),
        }
      )
    }
    return queryInterface.bulkInsert('SECRETAIRE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('SECRETAIRE', null, {});
  }
};
