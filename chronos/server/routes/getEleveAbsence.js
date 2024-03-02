const express = require('express');
const router = express.Router();
const { Absence, Cours } = require('../models')


router.get("/:id", async (req, res) => {
    const eleveId =  req.params.id; // obtient l'id de l'élève

    // requête SQL
    const result = await Absence.findAll({ 
        where: { eleveId: eleveId } 
    });

    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
