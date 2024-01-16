const ModuleCours  = require('./ModuleCours');

module.exports = (sequelize, DataTypes) => {
    const Cours = sequelize.define('Cours',{
        libelle : {
            type: DataTypes.STRING,
            allowNull : false
        },
        horaire : {
            type: DataTypes.DATE,
            allowNull : false
        },
        duree : {
            type: DataTypes.SMALLINT,
            allowNull : false
        },
        moduleId: {
            type: DataTypes.INTEGER,
            references: {
                model: "ModuleCours",
                key: "id"
              }
        },
    })
    return Cours
}