const express = require('express');
const router = express.Router();

const { Utilisateur } = require('../models')

router.get("/", async (req, res) => {
    const listUtilisateurs = await Utilisateur.findAll()
    res.json(listUtilisateurs);
})

module.exports = router