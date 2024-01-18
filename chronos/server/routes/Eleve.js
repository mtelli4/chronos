const express = require('express');
const router = express.Router();

const { Eleve } = require('../models')

router.get("/", async (req, res) => {
   const listEleves = await Eleve.findAll()
   res.json(listEleves);
})

router.post("/insertListEleves", async (req, res) => {
    const listEleves =  req.body
    listEleves.forEach((eleve) => {
        const tierTemps = eleve.tiersTemps === "oui" ? true : false
        eleve.tiersTemps = tierTemps
        eleve.tombinoscope = null;
        eleve.premiereConnexion = true;
        eleve.formationId = 10;
        Eleve.create(eleve)
    });
    res.json("Succès")
})
module.exports = router
