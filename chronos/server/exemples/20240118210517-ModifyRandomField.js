'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Fonction up -> Modification(s) à effectuer 
  async up (queryInterface, Sequelize) {
    return queryInterface.changeColumn('EXEMPLE', 'status', {
        type: Sequelize.ENUM('processing', 'unassigned', 'ongoing', 'completed'),
        allowNull: false,
        defaultValue: 'unassigned'
    }).then(function() {
        return queryInterface.sequelize
                              .query("UPDATE EXEMPLE SET champ1='ongoing' WHERE champ1='pouet'");
    });
  },

  // Fonction down -> 'Inverse' de up, on revert les modifications faites par up
  async down (queryInterface, Sequelize) {
    queryInterface.changeColumn('EXEMPLE', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'unassigned'
    }) 
  }
};
