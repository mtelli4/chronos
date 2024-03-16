'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    static associate(models) {
      // Lien associatif à la table ROLE passant par la table intermédiaire UTILISATEUR_ROLE
      const { Role,UtilisateurRole } = models
      Utilisateur.belongsToMany(Role, {
        through:UtilisateurRole, 
        foreignKey:'UtilisateurId'
      });

      // Lien associatif à la table ELEVE
      Utilisateur.hasOne(models.Eleve, {
        foreignKey: 'utilisateurId',
      });

      // Lien associatif à la table PROFESSEUR
      Utilisateur.hasOne(models.Professeur, {
        foreignKey: 'utilisateurId',
      });

      // Lien associatif à la table SECRETAIRE
      Utilisateur.hasOne(models.Secretaire, {
        foreignKey: 'utilisateurId',
      });

      // Lien associatif à la table DIRECTEUR
      Utilisateur.hasOne(models.Directeur, {
        foreignKey: 'utilisateurId',
      });
    }
  }
  Utilisateur.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: DataTypes.STRING,
    mdp: DataTypes.STRING,
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    premiereConnexion: DataTypes.TINYINT 
  }, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'UTILISATEUR'
  });
  return Utilisateur;
};