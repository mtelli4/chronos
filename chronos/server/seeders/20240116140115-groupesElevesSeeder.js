'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const groupes = await queryInterface.sequelize.query(
      'SELECT id FROM GROUPE;'
    )

    const eleves = await queryInterface.sequelize.query(
      'SELECT id FROM ELEVE;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          groupeId: groupes[0][Math.floor(Math.random() * groupes[0].length)].id,
          eleveId: eleves[0][Math.floor(Math.random() * eleves[0].length)].id
        }
      )
    }
    return queryInterface.bulkInsert('GROUPE_ELEVE', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('GROUPE_ELEVE', null, {});
  }
};
