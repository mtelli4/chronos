const express = require('express');
const router = express.Router();
const { Absence, Cours } = require('../models')


router.get("/:eleveId/:coursId", async (req, res) => {
    const eleveId =  req.params.eleveId; // obtient l'id de l'élève
    const coursId =  req.params.coursId; // obtient l'id du cours 

    // requête SQL
    const result = await Absence.findAll({         
        include: [{
            model: Cours, // JOIN Cours
        }],
        where: { eleveId: eleveId, coursId: coursId } 
    });
    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
