'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Formation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      const { ModuleCours,FormationModule } = models
      Formation.belongsToMany(ModuleCours, {through:FormationModule, foreignKey:'FormationId'});
      // define association here
      
      Formation.hasMany(models.Eleve, {foreignKey: 'formationId',});
    }
  }
  Formation.init({
    libelle: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Formation',
    tableName: 'FORMATION'
  });
  return Formation;
};