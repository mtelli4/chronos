'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          libelle: faker.lorem.word(),
        }
      )
    }
    return queryInterface.bulkInsert('BLOC_COMPETENCE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('BLOC_COMPETENCE', null, {});
  }
};
