'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Professeur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Professeur.belongsTo(models.Utilisateur, {
        foreignKey: 'utilisateurId',
        onDelete: 'SET NULL',
      });

      // Lien associatif à la table Module passant à travers la table PROFESSEUR_MODULE
      Professeur.belongsToMany(models.ModuleCours, {
        through: {
          model: models.ProfesseurModule,
        },
        foreignKey: 'professeurId',
        otherKey: 'moduleId',
      });
    }

  }
  Professeur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    vacataire: DataTypes.BOOLEAN,
    utilisateurId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Utilisateur',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Professeur',
    tableName: 'PROFESSEUR'
  });
  return Professeur;
};