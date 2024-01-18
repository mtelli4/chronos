const express = require('express');
const router = express.Router();

const db = require('../models')

router.get("/", async (req, res) => {
    const modules = await db.ModuleCours.findAll()
    res.json(modules);
})

router.get("/byFormation", async (req, res) => {
    const id = parseInt(req.query.id)
    const modules = await db.ModuleCours.findAll(
        {
            include: db.Formation,
            where: {
                '$Formations.id$': id
            }
        }
    )
    res.json(modules);
})

module.exports = router