const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { Utilisateur, Role, UtilisateurRole } = require('../models')
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
        include: [{
            model: Role,
            through: UtilisateurRole,
            timestamps: false,
        }],
    })

    if (foundUser === null) { // Si il y a une erreur (email ou mdp incorrecte)
        res.json({ state: "0" });
    }else if(foundUser?.premiereConnexion === 1) { // Si c'est la première connexion
        res.json({ state: "2" });
    } else {
        const roles = foundUser.Roles.map(role => role.label);
        const token = jwt.sign({ userId: foundUser.id, email: foundUser.email , roles: roles}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ state: "1", accessToken: token });
    }
})
module.exports = router
