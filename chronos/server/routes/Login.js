const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../models')
const { hashPassword } = require('../librairies/hashs');

// router.get("/", async (req, res) => {/cours/ate
//    const listCours = await Cours.findAll()
//    res.json(listCours);
// })

router.post("/", async (req, res) => {
    const identifiants =  req.body; // obtient le corps de la requête (format json)
    // faire requête SQL
    console.log(identifiants);

    const hashedPassword = hashPassword(identifiants.password);
    const result = await Utilisateur.findOne({
        where: { 
            email: identifiants.email, 
            mdp: hashedPassword 
        }

        /* recherche par where classique */
        // where: {
        //     'email': identifiants.email,
        //     'mdp': identifiants.mdp
        // }, 

        /* recherche par clé primaire */
        // findByPk() si on veut trouver par Id/clé primaire
        // include: [Classe],

    })

    // res.json(result); // pour renvoyer un objet JSON
    console.log("COUCOU :");
    console.log(result);
    console.log("\n");
    if (result === null) { // Si il y a une erreur (email ou mdp incorrecte)
        res.send("0");
    }
    if (result.premiereConnexion === 1) { // Si c'est la première connexion
        res.send("2");
    } else {
        res.send("1");
    }

    // res.json(identifiants); // pour renvoyer un objet JSON
    // res.send("1"); // pour renvoyer un simple chiffre ou string
})
module.exports = router
