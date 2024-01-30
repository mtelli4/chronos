'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Groupe extends Model {
    static associate(models) {
      // Lien associatif à la table ELEVE passant à travers la table GROUPE_ELEVE
      Groupe.belongsToMany(models.Eleve, {
        through: 'groupe_eleve', 
        foreignKey: 'groupeId', 
        otherKey: 'eleveId', 
      });

      // Lien associatif à la table COURS passant à travers la table COURS_GROUPE
      Groupe.belongsToMany(models.Cours, {
        through: {
          model: models.CoursGroupe,
        },
        foreignKey: 'groupeId',
        otherKey: 'coursId',
      });
    }
  }

  // Définition des champs de la table GROUPE
  Groupe.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    // Nom du modèle à utiliser dans les fonctions js
    modelName: 'Groupe',
    // Nom de la table dans mysql
    tableName: 'GROUPE',
  });
  return Groupe;
};