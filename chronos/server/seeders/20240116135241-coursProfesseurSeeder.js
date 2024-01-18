'use strict';

const { query } = require('express');
const faker = require("faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const cours = await queryInterface.sequelize.query(
      'SELECT id FROM COURS;'
    )

    const professeurs = await queryInterface.sequelize.query(
      'SELECT id FROM PROFESSEUR;'
    )

    const toInsert = [];

    for (let i = 0; i < 30; i++) {
      toInsert.push(
        {
          coursId: cours[0][Math.floor(Math.random() * (cours[0].length - 1))].id,
          professeurId: professeurs[0][Math.floor(Math.random() * (professeurs[0].length - 1))].id
        }
      )
    }
    return queryInterface.bulkInsert('COURS_PROFESSEUR', toInsert);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('COURS_PROFESSEUR', null, {});
  }
};
