const express = require('express');
const router = express.Router();

const { ModuleCours } = require('../models')

// router.get("/:coursId", async (req, res) => {
//     const coursId = req.params.coursId
//     const module = await ModuleCours.findByPk(coursId)
//     res.json(module);
// })
router.get("/", async (req, res) => {
    const modules = await ModuleCours.findAll()
    res.json(modules);
})

module.exports = router