module.exports = (sequelize, DataTypes) => {
    const Eleve = sequelize.define('Eleve',{
        nom : {
            type: DataTypes.STRING,
            allowNull : false
        },
        prenom : {
            type: DataTypes.STRING,
            allowNull : false
        },
        mdp : {
            type: DataTypes.STRING,
            allowNull : false
        },
        email : {
            type: DataTypes.STRING,
            allowNull : false
        },
        numeroEtudiant : {
            type: DataTypes.STRING,
            allowNull : false
        },
        trombinoscope : {
            type: DataTypes.STRING,
            allowNull : false
        },
        tiersTemps : {
            type: DataTypes.TINYINT,
            allowNull : false
        },
        premiereConnexion : {
            type: DataTypes.TINYINT,
            allowNull : false
        },
        formationId : {
            type: DataTypes.INTEGER,
            references: {
                model: "formation",
                key: "id"
            }
        },
    },{
        tableName: 'eleve'
    })
    return Eleve
}