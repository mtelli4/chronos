const express = require('express');
const router = express.Router();

const { Cours } = require('../models')

router.get("/", async (req, res) => {
   const listCours = await Cours.findAll()
   res.json(listCours);
})

router.post("/", async (req, res) => {
    const cours =  req.body
    await Cours.create(cours)
    res.json(cours)
})
module.exports = router
