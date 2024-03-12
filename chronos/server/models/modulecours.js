'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModuleCours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ModuleCours.belongsTo(models.BlocCompetence, { foreignKey: 'blocCompetenceId', onDelete: 'SET NULL' });
     
      const { Formation,FormationModule } = models
      ModuleCours.belongsToMany(Formation, {through:FormationModule, foreignKey:'ModuleCoursId'});

      // Lien associatif à la table Professeur passant à travers la table PROFESSEUR_MODULE
      ModuleCours.belongsToMany(models.Professeur, {
        through: {
          model: models.ProfesseurModule,
        },
        foreignKey: 'moduleId',
        otherKey: 'professeurId',
      });
    }
  }
  ModuleCours.init({
    libelle: DataTypes.STRING,
    codeApogee: DataTypes.STRING,
    blocCompetenceId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'BlocCompetence',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'ModuleCours',
    tableName: 'MODULE_COURS'
  });
  return ModuleCours;
};