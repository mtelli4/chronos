'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProfesseurModule extends Model {}

  ProfesseurModule.init({
    professeurId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Professeur',
        key: 'id',
      },
    },
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ModuleCours',
        key: 'id',
      },
    },
  }, {
    sequelize,
// Nom du modèle à utiliser dans les fonctions js
    modelName: 'ProfesseurModule',
    // Nom de la table dans mysql
    tableName: 'PROFESSEUR_MODULE',
    // Désactive les timestamps
  timestamps: false,
  });
  return ProfesseurModule;
};