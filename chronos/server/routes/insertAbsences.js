const express = require('express');
const router = express.Router();
const { Absence } = require('../models')


router.post("/", async (req, res) => {
    const call =  req.body; // obtient le corps de la requête (format json)
    // Création de la liste des instances d'absences à insérer dans la bdd
    const absentsToInsert = [];
    for (const eleveId of call.absences) {
        absentsToInsert.push({
            valide: 0,
            justificatif: "",
            message: "",
            eleveId: eleveId,
            coursId: call.coursId,
            envoye: 0
        });
    }

    // Création de la liste des instances d'de retard à insérer dans la bdd
    const latesToInsert = [];
    for (const late of call.lates) {
        if (call.absences.indexOf(late.eleveId) === -1 && late.time != 0 && late.time != '') {
            latesToInsert.push({
                valide: 0,
                justificatif: "",
                message: "",
                eleveId: late.eleveId,
                coursId: call.coursId,
                retard: Math.abs(late.time),
                envoye: 0
            });
        }
    }

    // requête SQL
    if (absentsToInsert.length !== 0) {
        // Ajoute les absences dans la table
        await Absence.bulkCreate(absentsToInsert);
    }
    if (latesToInsert.length !== 0) {
        // Ajoute les retards dans la table
        await Absence.bulkCreate(latesToInsert);
    }
})
module.exports = router
