const express = require('express');
const router = express.Router();

const { Periode } = require('../models')

router.get("/", async (req, res) => {
    const periodes = await Periode.findAll()
    res.json(periodes);
})

module.exports = router