'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    // Lien associatif à la table MODULE_COURS
    static associate(models) {
      Cours.belongsTo(models.ModuleCours, { 
        foreignKey: 'moduleId', 
        onDelete: 'SET NULL' 
      });

      // Lien associatif à la table GROUPE passant à travers la table COURS_GROUPE
      Cours.belongsToMany(models.Groupe, {
        through: {
          model: models.CoursGroupe,
        },
        foreignKey: 'coursId',
        otherKey: 'groupeId',
      });
    }
  }

  // Définition des champs de la table COURS
  Cours.init({
    // Champ classique
    libelle: DataTypes.STRING,
    debutCours: DataTypes.DATE,
    duree: DataTypes.INTEGER,
    // Clé étrangère
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
    modelName: 'Cours',
    // Nom de la table dans mysql
    tableName: 'COURS',
  });
  return Cours;
};