'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CoursGroupe extends Model {
    static associate(models) {
      // Lien associatif à la table COURS
      CoursGroupe.belongsTo(models.Cours, {
        foreignKey: 'coursId',
        onDelete: 'CASCADE', 
      });

      // Lien associatif à la table GROUPE
      CoursGroupe.belongsTo(models.Groupe, {
        foreignKey: 'groupeId',
        onDelete: 'CASCADE', 
      });
    }
  }

  // Définition des champs de la table COURS_GROUPE
  CoursGroupe.init({
    coursId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Cours',
        key: 'id',
      },
    },
    groupeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Groupe',
        key: 'id',
      },
    },
  }, {
    sequelize,
    // Nom du modèle à utiliser dans les fonctions js
    modelName: 'CoursGroupe',
    // Nom de la table dans mysql
    tableName: 'Cours_Groupe',
    // Désactive les timestamps
    timestamps: false,
  });
  return CoursGroupe;
};
