'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormationSecretaire extends Model {}

  FormationSecretaire.init({
    secretaireId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Secretaire',
        key: 'id',
      },
    },
    formationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Formation',
        key: 'id',
      },
    },
  }, {
    sequelize,
// Nom du modèle à utiliser dans les fonctions js
    modelName: 'FormationSecretaire',
    // Nom de la table dans mysql
    tableName: 'FORMATION_SECRETAIRE',
    // Désactive les timestamps
  timestamps: false,
  });
  return FormationSecretaire;
};