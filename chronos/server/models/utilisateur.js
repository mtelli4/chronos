'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Utilisateur extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { Role,UtilisateurRole } = models
      Utilisateur.belongsToMany(Role, {through:UtilisateurRole, foreignKey:'UtilisateurId'});

      Utilisateur.hasOne(models.Eleve, {foreignKey: 'utilisateurId',});
      Utilisateur.hasOne(models.Professeur, {foreignKey: 'utilisateurId',});
      Utilisateur.hasOne(models.Secretaire, {foreignKey: 'utilisateurId',});
      Utilisateur.hasOne(models.Directeur, {foreignKey: 'utilisateurId',});
    }
  }
  Utilisateur.init({
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