'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Evaluation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Evaluation.belongsTo(models.ModuleCours, { foreignKey: 'moduleId', onDelete: 'SET NULL' });
    }
  }
  Evaluation.init({
    libelle: DataTypes.STRING,
    coefficient: DataTypes.INTEGER,
    moduleId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ModuleCours',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Evaluation',
  });
  return Evaluation;
};