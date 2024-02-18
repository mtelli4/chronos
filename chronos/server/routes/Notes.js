const express = require('express');
const router = express.Router();

const db = require('../models')

router.get("/", async (req, res) => {
  const parameters = req.query
  const notesParameters = {}
  const eleveParameters = {}
  const evaluationsParameters = {}

  //Pour prof et eleve
  if (parameters.hasOwnProperty('moduleId')) {
    notesParameters['$Evaluation.moduleId$'] = parseInt(parameters.moduleId)
    evaluationsParameters['moduleId'] = parseInt(parameters.moduleId)
  }
  if (parameters.hasOwnProperty('formationId')) {
    notesParameters['$Eleve.formationId$'] = parseInt(parameters.formationId)
    eleveParameters['formationId'] = parseInt(parameters.formationId)
  }
  if (parameters.hasOwnProperty('periodeId')) {
    notesParameters['$Evaluation.periodeId$'] = parseInt(parameters.periodeId)
    evaluationsParameters['periodeId'] = parseInt(parameters.periodeId)
  }

  const listNotes = await db.Note.findAll({
    include: [
      {
        model: db.Evaluation,
        required: true
      },
      {
        model: db.Eleve,
        required: true
      }
    ],
    where: notesParameters
  })

  const result = {};

  result["eleves"] = await db.Eleve.findAll(
    {
      where: eleveParameters,
      order: [
        ['nom', 'ASC'],
        ['prenom', 'ASC'],
      ],
    }
  )
  result["evaluations"] = await db.Evaluation.findAll(
    {
      where: evaluationsParameters,
      order: [
        ['id', 'ASC'],
      ],
      include: [
        {
          model: db.Periode,
          required: true
        }
      ]
    }
  )

  //Pour prof 
  tmpLstEleveMoyenne = {}

  //Pour prof et eleve
  tmpLstEvalMoyenne = {}

  listNotes.forEach(item => {
    const eleveId = item.Eleve.id;
    const evaluationId = item.Evaluation.id;
    const note = parseFloat(item.note);

    //Pour prof 
    if (!result[eleveId]) {
      result[eleveId] = {};
    }

    result[eleveId][evaluationId] = note;

    //Pour prof
    if (!tmpLstEleveMoyenne[eleveId]) {
      tmpLstEleveMoyenne[eleveId] = { note: 0, coefficient: 0 };
    }
    tmpLstEleveMoyenne[eleveId].note += note * Number.parseFloat(item.Evaluation.coefficient) / item.Evaluation.noteMaximale * 20;
    tmpLstEleveMoyenne[eleveId].coefficient += Number.parseFloat(item.Evaluation.coefficient);

    //Pour eleve et prof
    if (!tmpLstEvalMoyenne[evaluationId]) {
      tmpLstEvalMoyenne[evaluationId] = { note: 0, coefficient: 0 };
    }
    tmpLstEvalMoyenne[evaluationId].note += note;
    tmpLstEvalMoyenne[evaluationId].coefficient += 1;
  });


  //Pour prof
  result["eleves"].forEach(item => {
    if (tmpLstEleveMoyenne.hasOwnProperty(item.id)) {
      item.dataValues["moyenne"] = (tmpLstEleveMoyenne[item.id].note / tmpLstEleveMoyenne[item.id].coefficient).toFixed(2)
    } else {
      item.dataValues["moyenne"] = '...'
    }
  })


  //Pour prof et eleve
  result["evaluations"].forEach(item => {
    if (tmpLstEvalMoyenne.hasOwnProperty(item.id)) {
      item.dataValues["moyenne"] = (tmpLstEvalMoyenne[item.id].note / tmpLstEvalMoyenne[item.id].coefficient).toFixed(2)
    } else {
      item.dataValues["moyenne"] = '...'
    }
  })

  res.json(result);
})


router.post("/insertNotes", async (req, res) => {
  const eval = req.body.evalId
  const eleve = req.body.eleveId
  const note = req.body.note

  const dbNote = await db.Note.findOne(
    {
      where: {
        evaluationId: eval,
        eleveId: eleve
      }
    }
  )
  if (dbNote == null) {
    db.Note.create({ evaluationId: eval, eleveId: eleve, note: note })
  } else {
    await db.Note.update({ note: note }, {
      where: {
        id: dbNote.id,
      },
    });
  }
  res.json("Succès")
})

router.post("/deleteNote", async (req, res) => {
  const eval = req.body.evalId
  const eleve = req.body.eleveId

  const countDelete = await db.Note.destroy(
    {
      where: {
        evaluationId: eval,
        eleveId: eleve
      }
    }
  )
  res.json({ "hasBeenDeleted": countDelete > 0 })
})

router.post("/insertEvaluations", async (req, res) => {
  const moduleId = req.body.moduleId
  const libelle = req.body.libelle
  const coefficient = req.body.coefficient
  const periodeId = req.body.periodeId
  const noteMaximale = req.body.noteMaximale

  db.Evaluation.create({ moduleId: moduleId, libelle: libelle, coefficient: coefficient, noteMaximale:noteMaximale, periodeId: periodeId })
  res.json("Succès")
})
module.exports = router