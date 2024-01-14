'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Secretaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Secretaire.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    mdp: DataTypes.STRING,
    email: DataTypes.STRING,
    premiereConnexion: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Secretaire',
  });
  return Secretaire;
};