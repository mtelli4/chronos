'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Cours.belongsTo(models.ModuleCours, { 
        foreignKey: 'moduleId', 
        onDelete: 'SET NULL' 
      });




    
      Cours.belongsToMany(models.Eleve, {
        through: 'eleve_cours',
        foreignKey: 'eleveId',
        otherKey: 'coursId',
      });
 
 
 
 
    }
  }
  Cours.init({
    libelle: DataTypes.STRING,
    debutCours: DataTypes.DATE,
    duree: DataTypes.INTEGER,
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ModuleCours',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Cours',
    tableName: 'COURS'
  });
  return Cours;
};