const express = require('express');
const router = express.Router();

const { Formation } = require('../models')

router.get("/", async (req, res) => {
    const formations = await Formation.findAll()
    res.json(formations);
})

module.exports = router