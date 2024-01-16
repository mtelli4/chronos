module.exports = (sequelize, DataTypes) => {
    const ModuleCours = sequelize.define('ModuleCours',{
        libelle : {
            type: DataTypes.STRING,
            allowNull : false
        },
        codeApogee : {
            type: DataTypes.SMALLINT,
            allowNull : false
        },
        blocCompetenceId: {
            type: DataTypes.INTEGER,
            references: {
                model: "Bloc_Competence",
                key: "id"
              }
        },
    },{
        tableName: 'Module_Cours'
    })

    ModuleCours.associate = (models) => {
        ModuleCours.hasMany(models.Cours, {
            onDelete:"cascade",
            foreignKey: "moduleId"
        });
    };

    return ModuleCours
}