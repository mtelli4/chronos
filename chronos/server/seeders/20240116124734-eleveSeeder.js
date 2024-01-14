'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formations = await queryInterface.sequelize.query(
      'SELECT id FROM FORMATION;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          nom: faker.name.lastName(),
          prenom: faker.name.firstName(),
          mdp: faker.internet.password(),
          email: faker.internet.email(),
          numeroEtudiant: faker.lorem.word(),
          trombinoscope: null,
          tiersTemps: faker.random.boolean(),
          formationId: formations[0][Math.floor(Math.random() * formations[0].length)].id,
        }
      )
    }
    return queryInterface.bulkInsert('ELEVE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('ELEVE', null, {});
  }
};
