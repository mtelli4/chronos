'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Formation extends Model {
    static associate(models) {
      // Liens associatif à la table MODULE_COURS
      const { ModuleCours, FormationModule } = models
      Formation.belongsToMany(ModuleCours, {
        through:FormationModule, 
        foreignKey:'FormationId'
      });

      // Lien associatif à la table SECRETAIRE passant à travers la table FORMATION_SECRETAIRE
      Formation.belongsToMany(models.Secretaire, {
        through: 'FORMATION_SECRETAIRE', 
        foreignKey: 'formationId', 
        otherKey: 'secretaireId', 
      });

      // Lien associatif à la table GROUPE passant à travers la table GROUPE_FORMATION
      Formation.belongsToMany(models.Groupe, {
        through: 'GROUPE_FORMATION', 
        foreignKey: 'formationId', 
        otherKey: 'groupeId', 
      });
    }
  }

  Formation.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Formation',
    tableName: 'FORMATION'
  });
  return Formation;
};