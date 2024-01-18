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
        where:notesParameters
      })

    const result = {};
    result["eleves"] = await db.Eleve.findAll(
      {
        where:eleveParameters
      }
    )
    result["evaluations"] = await db.Evaluation.findAll(
      {
        where:evaluationsParameters
      }
    )

    listNotes.forEach(item => {
        const eleveNom = item.Eleve.id;
        const evaluationLibelle = item.Evaluation.id;
        const note = parseFloat(item.note);

        if (!result[eleveNom]) {
            result[eleveNom] = {};
        }
        
        result[eleveNom][evaluationLibelle] = note;
    });
    res.json(result);
})
module.exports = router