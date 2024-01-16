module.exports = (sequelize, DataTypes) => {
    const BlocCompetence = sequelize.define('Bloc_Competence',{
        libelle : {
            type: DataTypes.STRING,
            allowNull : false
        }
    })
    return BlocCompetence
}