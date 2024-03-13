'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoursProfesseur extends Model {}
  CoursProfesseur.init({
    coursId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cours',
        key: 'id',
      },
    },
    professeurId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Professeur',
        key: 'id',
      },
    },
  }, {
    sequelize,
    // Nom du modèle à utiliser dans les fonctions js
    modelName: 'CoursProfesseur',
    // Nom de la table dans mysql
    tableName: 'COURS_PROFESSEUR',
    // Désactive les timestamps
    timestamps: false,
  });
  return CoursProfesseur;
};
