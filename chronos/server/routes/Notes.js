const express = require('express');
const router = express.Router();

const db = require('../models')

router.get("/", async (req,res)=>{
    const parameters =  req.query
    const notesParameters = {}
    const eleveParameters = {}
    const evaluationsParameters = {}

    if (parameters.hasOwnProperty('moduleId')) {
        notesParameters['$Evaluation.moduleId$'] = parseInt(parameters.moduleId)
        evaluationsParameters['moduleId'] = parseInt(parameters.moduleId)
    }
    
    if (parameters.hasOwnProperty('formationId')) {
      notesParameters['$Eleve.formationId$'] = parseInt(parameters.formationId)
      eleveParameters['formationId'] = parseInt(parameters.formationId)
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
        // where:notesParameters
      })
      // console.log('notes')
      // console.log(listNotes)

    const result = {};
    result["eleves"] = await db.Eleve.findAll(
      // {
      //   // where:eleveParameters
      // }
    )
    // console.log('eleves')
    // console.log(result["eleves"])
    // result["eleves"] = []
    // result["evaluations"] = []
    result["evaluations"] = await db.Evaluation.findAll(
      // {
      //   // where:evaluationsParameters
      // }
    )
    // console.log('evaluations')
    // console.log(result["evaluations"])

    // console.log(listNotes)

    listNotes.forEach(item => {
        eleveId = item.Eleve.id;
        evaluationId = item.Evaluation.libelle;

        // if (!result["eleves"].includes(eleveId)){
        //     result["eleves"].push(eleveId)
        // }
        // if (!result["evaluations"].includes(evaluationId)){
        //     result["evaluations"].push(evaluationId)
        // }

        if (!result[eleveId]) {
            result[eleveId] = {};
          }

        const note = parseFloat(item.note);
        result[eleveId][evaluationId] = note;

    });
    res.json(result);
})

router.post("/test", async (req,res)=>{
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
        where:{
            '$Eleve.nom$': "Goyette"
        }
      })

    res.json(listNotes);
})
module.exports = router