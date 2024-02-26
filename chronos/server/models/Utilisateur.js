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
    }
  }
  Utilisateur.init({
    email: DataTypes.STRING,
    mdp: DataTypes.STRING,
    premiereConnexion: DataTypes.TINYINT 
  }, {
    sequelize,
    modelName: 'Utilisateur',
    tableName: 'UTILISATEUR'
  });
  return Utilisateur;
};