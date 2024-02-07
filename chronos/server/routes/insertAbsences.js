const express = require('express');
const router = express.Router();
const { Absence } = require('../models')


router.post("/", async (req, res) => {
    const absences =  req.body; // obtient le corps de la requête (format json)
    // Création de la liste des instances d'absences à insérer dans la bdd
    const absentsToInsert = [];
    for (const eleveId of absences.students) {
        absentsToInsert.push({
            valide: 0,
            justificatif: "",
            message: "",
            eleveId: eleveId,
            coursId: absences.coursId,
        });
    }

    // requête SQL
    // Ajoute plusieurs lignes/instances dans la bdd (pas besoin de préciser les jointures)
    const result = await Absence.bulkCreate(absentsToInsert);

    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
