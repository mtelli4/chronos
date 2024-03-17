const express = require('express');
const router = express.Router();

const db = require('../models')

router.post("/insertEvaluations", async (req, res) => {
  const moduleId = req.body.moduleId
  const libelle = req.body.libelle
  const coefficient = req.body.coefficient
  const periodeId = req.body.periodeId
  const noteMaximale = req.body.noteMaximale
  
  var dbEval = null
  if (req.body.hasOwnProperty("evalId")) {
    dbEval = await db.Evaluation.findOne(
      {
        where: {
          id: req.body.evalId
        }
      }
    )
  }

  if (dbEval == null) {
    db.Evaluation.create({ moduleId: moduleId, libelle: libelle, coefficient: coefficient, noteMaximale: noteMaximale, periodeId: periodeId })
  } else {
    db.Evaluation.update({ moduleId: moduleId, libelle: libelle, coefficient: coefficient, noteMaximale: noteMaximale, periodeId: periodeId }, {
      where: {
        id: req.body.evalId
      }
    })
  }

  res.json("Succès")

})

router.post("/deleteEvaluations", async (req, res) => {
  const evalId = req.body.evalId
  db.Evaluation.destroy({ where: { id: evalId } })
  res.json("Succès")
})
module.exports = router