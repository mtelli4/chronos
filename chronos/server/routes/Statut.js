const express = require('express');
const router = express.Router();

const { StatutNote } = require('../models')

router.get("/", async (req, res) => {
  const status  = await StatutNote.findAll()
  res.json(status)
})
module.exports = router