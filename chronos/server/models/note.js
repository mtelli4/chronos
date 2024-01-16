'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Note extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Note.belongsTo(models.Eleve, { foreignKey: 'eleveId', onDelete: 'SET NULL' });
      Note.belongsTo(models.Evaluation, { foreignKey: 'evaluationId', onDelete: 'SET NULL' });
    }
  }
  Note.init({
    note: DataTypes.DECIMAL(15, 2),
    eleveId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Eleve',
        key: 'id',
      },
    },
    evaluationId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Evaluation',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'Note',
    tableName: 'NOTE'
  });
  return Note;
};