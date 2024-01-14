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
      // define association here
    }
  }
  Professeur.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    mdp: DataTypes.STRING,
    email: DataTypes.STRING,
    vacataire: DataTypes.BOOLEAN,
    premiereConnexion: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Professeur',
  });
  return Professeur;
};