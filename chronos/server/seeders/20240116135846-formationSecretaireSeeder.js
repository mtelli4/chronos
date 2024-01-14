'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const formations = await queryInterface.sequelize.query(
      'SELECT id FROM FORMATION;'
    )

    const secretaires = await queryInterface.sequelize.query(
      'SELECT id FROM SECRETAIRE;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          formationId: formations[0][Math.floor(Math.random() * formations[0].length)].id,
          secretaireId: secretaires[0][Math.floor(Math.random() * secretaires[0].length)].id
        }
      )
    }
    return queryInterface.bulkInsert('FORMATION_SECRETAIRE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('FORMATION_SECRETAIRE', null, {});
  }
};
