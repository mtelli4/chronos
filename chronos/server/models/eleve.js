'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Eleve extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Eleve.belongsTo(models.Formation, {
        foreignKey: 'formationId',
        onDelete: 'SET NULL',
      });
    }
  }
  Eleve.init({
    nom: DataTypes.STRING,
    prenom: DataTypes.STRING,
    mdp: DataTypes.STRING,
    email: DataTypes.STRING,
    numeroEtudiant: DataTypes.STRING,
    trombinoscope: DataTypes.STRING,
    tiersTemps: DataTypes.BOOLEAN,
    premiereConnexion: DataTypes.BOOLEAN,
    formationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Formation',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Eleve',
    tableName: 'ELEVE'
  });
  return Eleve;
};