const express = require('express');
const router = express.Router();
const { Utilisateur, UtilisateursEAV } = require('../models')
const { hashPassword } = require('../librairies/utils');
const axios = require('axios');

router.post("/", async (req, res) => {
    const identifiants =  req.body; // obtient le corps de la requête (format json)
    
    axios.get("http://localhost:5000/usersEAV/exists", { params: { userEmail: identifiants.email, attribute: 'verificationCode', value: identifiants.value } })
      .then((response) => {
        const { exists } = response.data;
        if (! exists) {
          res.send("0");
        }
    });
     
    const hashedPassword = hashPassword(identifiants.password);
    const [rowCount, updatedUsers] = await Utilisateur.update({ mdp: hashedPassword, premiereConnexion: 0 }, {
        where: { 
            email: identifiants.email 
        }
    });
    
    console.log(`Nombre de lignes mises à jour : ${rowCount}`);
    console.log('Utilisateurs mis à jour :', updatedUsers);
    
    if (rowCount > 0) {
        // La mise à jour a réussi
        console.log('Utilisateur mis à jour avec succès');
        res.send("1"); // pour renvoyer un simple chiffre ou string

        // Find the user corresponding to the request
        const utilisateur  = await Utilisateur.findOne({
            where: { email: identifiants.email }
        });

        // Find the latest entry for the given utilisateurId
        const latestEntry = await UtilisateursEAV.findOne({
            where: {
                utilisateurId: utilisateur.id,
                attribute: 'verificationCode',
                value: identifiants.value
            },
            order: [['createdAt', 'DESC']]
        });

        // Delete the code from the DB
        await latestEntry.destroy();
    } else {
        // Aucune ligne mise à jour (aucun utilisateur trouvé avec cet identifiant)
        console.log("L'utilisateur avec cet identifiant n'a pas été trouvé");
        res.send("0"); // pour renvoyer un simple chiffre ou string
    }
})
module.exports = router
