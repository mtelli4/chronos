const express = require('express');
const router = express.Router();
const { Absence, Cours, Eleve } = require('../models')


router.get("/:userId/:isSend", async (req, res) => {
    const userId =  req.params.userId; // obtient l'id de l'élève
    const isSend =  req.params.isSend; // obtient l'id du cours 

    // requête SQL
    const result = await Absence.findAll({         
        include: [{
            model: Cours, // JOIN Cours
        },{
            model: Eleve, // JOIN Eleve
            where: { utilisateurId: userId }
        }],
        where: { envoye: isSend, valide: 0 } 
    });
    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
