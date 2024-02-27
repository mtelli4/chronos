const express = require('express');
const router = express.Router();
const { Absence, Cours } = require('../models')


router.post("/", async (req, res) => {
    const eleveId =  req.body.id; // obtient l'id de l'élève

    // requête SQL
    const result = await Absence.findOne({ 
        include: [{
            model: Cours
        }],
        where: { elveId: eleveId } 
    });

    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
