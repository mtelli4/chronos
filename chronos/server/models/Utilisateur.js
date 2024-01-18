module.exports = (sequelize, DataTypes) => {
    const Utilisateur = sequelize.define('Utilisateur',{
        mail : {
            type: DataTypes.STRING,
            allowNull : false
        },
        mdp : {
            type: DataTypes.STRING,
            allowNull : false
        },
        role : {
            type: DataTypes.STRING,
            allowNull : false
        },
        premiereConnexion : {
            type: DataTypes.TINYINT,
            allowNull : false
        }
    },{
        tableName: 'utilisateur'
    })
    return Utilisateur
}