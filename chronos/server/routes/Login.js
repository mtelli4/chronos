const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Utilisateur, Role, UtilisateurRole, Eleve, Professeur, Secretaire, Directeur } = require('../models')
const { hashPassword } = require('../librairies/utils');

router.post("/", async (req, res) => {
    const identifiants =  req.body; // obtient le corps de la requête (format json)

    const hashedPassword = hashPassword(identifiants.password);
    const foundUser = await Utilisateur.findOne({
        where: { 
            email: identifiants.email, 
            mdp: hashedPassword 
        },
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        timestamps: false,
        include: [
            {
            model: Role,
            through: UtilisateurRole,
            timestamps: false,
            },
            {
            model:Eleve,
            attributes:["id"]
            },
            {
            model:Professeur,
            attributes:["id"]
            },
            {
            model:Secretaire,
            attributes:["id"]
            },
            {
            model:Directeur,
            attributes:["id"]
            }
],
    })
    if (foundUser === null) { // Si il y a une erreur (email ou mdp incorrecte)
        res.json({ state: "0" });
    }else if(foundUser?.premiereConnexion === 1) { // Si c'est la première connexion
        res.json({ state: "2" });
    } else {
        const roles = {}
        foundUser.Roles.map(role => {
            switch (role.label){
                case "ROLE_USER":
                    if(foundUser.Eleve != null){
                        roles[role.label]=foundUser.Eleve.id
                    }
                    break;
                case "ROLE_SECRETARY":
                    if(foundUser.Secretaire != null){
                        roles[role.label]=foundUser.Secretaire.id
                    }
                    break;
                case "ROLE_PROFESSOR":
                    if(foundUser.Professeur != null){
                        roles[role.label]=foundUser.Professeur.id
                    }
                    break;
                case "ROLE_DIRECTOR":
                    if(foundUser.Directeur != null){
                        roles[role.label]=foundUser.Directeur.id
                    }
                    break;
                case "ROLE_DEPARTMENT_DIRECTOR":
                    if(foundUser.Directeur != null){
                        roles[role.label]=foundUser.Directeur.id
                    }
                    break;
                default: 
                    roles[role.label]=null
                    break;
            }
        });
        const token = jwt.sign({ userId: foundUser.id, email: foundUser.email , roles: roles}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ state: "1", accessToken: token });
    }
})
module.exports = router
