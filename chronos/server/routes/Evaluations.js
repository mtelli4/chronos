const express = require('express');
const router = express.Router();

const db = require('../models')

// router.get("/", async (req, res) => {
// })

router.post("/insertEvaluations", async (req, res) => {
  const moduleId = req.body.moduleId
  const libelle = req.body.libelle
  const coefficient = req.body.coefficient
  const periodeId = req.body.periodeId
  const noteMaximale = req.body.noteMaximale

  db.Evaluation.create({ moduleId: moduleId, libelle: libelle, coefficient: coefficient, noteMaximale:noteMaximale, periodeId: periodeId })
  res.json("Succès")
})

router.post("/deleteEvaluations", async (req,res)=>{
  const evalId = req.body.evalId
  db.Evaluation.destroy({where:{id:evalId}})
  res.json("Succès")
})
module.exports = router