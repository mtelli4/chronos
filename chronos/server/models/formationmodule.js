'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FormationModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // models.ModuleCours.belongsToMany(models.Formation, {through:FormationModule});
      // models.Formation.belongsToMany(models.Modulecours, {through:FormationModule});
      // define association here
    }
  }
  FormationModule.init({
    FormationId:{
      type:DataTypes.INTEGER,
      primaryKey: true,
      references:{
        model:'Formule',
        key: 'id'
      }
    },
    ModuleCoursId: {
      type : DataTypes.INTEGER,
      primaryKey: true,
      references:{
        model:'ModuleCours',
        key: 'id'
      }
    }
  }, {
    sequelize,
    modelName: 'FormationModule',
    tableName: 'FORMATION_MODULE'
  });
  return FormationModule;
};