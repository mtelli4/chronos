const {Op} = require("sequelize");
const express = require('express');
const router = express.Router();

const db = require('../models')

router.get("/", async (req, res) => {
  const parameters = req.query
  const profil = parameters.profil
  console.log(parameters)
  //  0 pour secretaire, 1 pour professeur, 2 pour eleves  
  var result = {}
  if (profil==='1'){
    result = await getNotesProfesseurs(parameters)
  }
  if (profil==='2'){
    result = await getNotesEleves(parameters)
  }

  res.json(result);
})


const getNotesEleves = async (parameters) => {
  const notesParameters = {}
  var result = {}
  tmpLstEvaluationsMoyenne = {}
  tmpLstModulesMoyenne = {}

  eleveId = parseInt(parameters.eleveId)
  
  // Création des filtres pour les requêtes en fonction des paramètres d'appel à l'API
  notesParameters['eleveId'] = eleveId
  if (parameters.hasOwnProperty('periodeId')) {
    notesParameters['$Evaluation.periodeId$'] = parseInt(parameters.periodeId)
  }

//   const result = await Cours.findByPk(1, {//mettre l'id du cours ici :)
//     attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
//     include: [{
//         model: Groupe,
//         through: CoursGroupe, // Utilisez le modèle Sequelize correspondant à la table intermédiaire Cours-Groupe
//         timestamps: false,
//         where: { id:2},
//         attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
//         include: [{
//             model: Eleve,
//             through: GroupeEleve, // Utilisez le modèle Sequelize correspondant à la table intermédiaire Groupe-Eleve
//             timestamps: false,
//             attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
//         }],
//     }],
// });

  //Récupération de toutes les notes de l'élève actuel
  const notesEleve = await db.Note.findAll({
    where: notesParameters,
    include: [
      {
        model: db.Evaluation
      }
    ]
  })

  //Récupération des notes de tout les élèves pour les évaluations pour lesquelles l'élève actuel à une note
  evaluationIds = notesEleve.map((note)=>note.evaluationId);
  const allNotes = await db.Note.findAll({
    include: [
      {
        model: db.Evaluation,
        include: {
          model: db.ModuleCours,
        }
      }
    ],
    where: {
      evaluationId: {
        [Op.in]: evaluationIds
      }
    }
  })

  //Récupération des informations à afficher concernant les évaluations pour lesquelles l'élève actuel à une note
  result["evaluations"] = await db.Evaluation.findAll(
    {
      where: {
        id:{
          [Op.in]:evaluationIds 
        }
      },
      order: [
        ['id', 'ASC'],
      ],
    }
  )

  result["modules"] = []

  //Traitement de toutes les notes récupérer pour en extraire les données à renvoyer
  allNotes.forEach(item => {
    const moduleId = item.Evaluation.moduleId;
    const evaluationId = item.Evaluation.id;
    const note = parseFloat(item.note);
 
    if (item.eleveId == eleveId){
      //Rangement des notes de l'élève par module et par note
      if (!result[moduleId]) {
        result[moduleId] = {};
        result["modules"].push(item.Evaluation.ModuleCour)
      }
      result[moduleId][evaluationId] = note;

      //Préparation des données pour calculer la moyenne de l'élève par module
      if(!tmpLstModulesMoyenne[moduleId]){
        tmpLstModulesMoyenne[moduleId] = {note: 0, coefficient:0};
      }
      tmpLstModulesMoyenne[moduleId].note += note * Number.parseFloat(item.Evaluation.coefficient) / item.Evaluation.noteMaximale * 20;
      tmpLstModulesMoyenne[moduleId].coefficient += Number.parseFloat(item.Evaluation.coefficient);
    }

    //Préparation des données pour calculer la moyenne dans chaque évaluation
    if (!tmpLstEvaluationsMoyenne[evaluationId]) {
      tmpLstEvaluationsMoyenne[evaluationId] = { note: 0, coefficient: 0 };
    }
    tmpLstEvaluationsMoyenne[evaluationId].note += note;
    tmpLstEvaluationsMoyenne[evaluationId].coefficient += 1;
  });

  //Ajout de la moyenne pour chaque évaluation
  result["evaluations"].forEach(item => {
    if (tmpLstEvaluationsMoyenne.hasOwnProperty(item.id)) {
      item.dataValues["moyenne"] = (tmpLstEvaluationsMoyenne[item.id].note / tmpLstEvaluationsMoyenne[item.id].coefficient).toFixed(2)
    } else {
      item.dataValues["moyenne"] = '...'
    }
  })  

  //Ajout de la moyenne de chaque module
  result["modules"].forEach(item =>{
    if (tmpLstModulesMoyenne.hasOwnProperty(item.id)) {
      item.dataValues["moyenne"] = (tmpLstModulesMoyenne[item.id].note / tmpLstModulesMoyenne[item.id].coefficient).toFixed(2)
    } else {
      item.dataValues["moyenne"] = '...'
    }
  })

  result["modules"].sort((a, b) => a.id - b.id)

  return result
}

const getNotesProfesseurs = async (parameters) => {
  const notesParameters = {}
  const eleveParameters = {}
  const evaluationsParameters = {}
  var result = {}


  // Création des filtres pour les requêtes en fonction des paramètres d'appel à l'API
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

  //Récupération de toutes les notes liées à la recherche du professeur
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

  //Récupération des informations liées aux élèves concernés par la recherche du professeur
  result["eleves"] = await db.Eleve.findAll(
    {
      where: eleveParameters,
      order: [
        ['nom', 'ASC'],
        ['prenom', 'ASC'],
      ],
    }
  )
  //Récupération des informations liées aux évaluations concernés par la recherche du professeur
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
  
  tmpLstEleveMoyenne = {}
  tmpLstEvalMoyenne = {}

  //Traitement de toutes les notes récupérer pour en extraire les données à renvoyer
  listNotes.forEach(item => {
    const eleveId = item.Eleve.id;
    const evaluationId = item.Evaluation.id;
    const note = parseFloat(item.note);

    //Rangement des notes par élèves et par évaluations
    if (!result[eleveId]) {
      result[eleveId] = {};
    }
    result[eleveId][evaluationId] = note;

    //Préparation des données pour calculer la moyenne de chaque étudiant
    if (!tmpLstEleveMoyenne[eleveId]) {
      tmpLstEleveMoyenne[eleveId] = { note: 0, coefficient: 0 };
    }
    tmpLstEleveMoyenne[eleveId].note += note * Number.parseFloat(item.Evaluation.coefficient) / item.Evaluation.noteMaximale * 20;
    tmpLstEleveMoyenne[eleveId].coefficient += Number.parseFloat(item.Evaluation.coefficient);

    //Préparation des données pour calculer la moyenne dans chaque évaluation
    if (!tmpLstEvalMoyenne[evaluationId]) {
      tmpLstEvalMoyenne[evaluationId] = { note: 0, coefficient: 0 };
    }
    tmpLstEvalMoyenne[evaluationId].note += note;
    tmpLstEvalMoyenne[evaluationId].coefficient += 1;
  });


  //Ajout de la moyenne de chaque étudiant
  result["eleves"].forEach(item => {
    if (tmpLstEleveMoyenne.hasOwnProperty(item.id)) {
      item.dataValues["moyenne"] = (tmpLstEleveMoyenne[item.id].note / tmpLstEleveMoyenne[item.id].coefficient).toFixed(2)
    } else {
      item.dataValues["moyenne"] = '...'
    }
  })

  //Ajout de la moyenne pour chaque évaluation
  result["evaluations"].forEach(item => {
    if (tmpLstEvalMoyenne.hasOwnProperty(item.id)) {
      item.dataValues["moyenne"] = (tmpLstEvalMoyenne[item.id].note / tmpLstEvalMoyenne[item.id].coefficient).toFixed(2)
    } else {
      item.dataValues["moyenne"] = '...'
    }
  })

  return result
}


router.post("/insertNotes", async (req, res) => {
  const eval = req.body.evalId
  const eleve = req.body.eleveId
  const note = req.body.note

  // Récupération de la note actuelle si elle existe
  const dbNote = await db.Note.findOne(
    {
      where: {
        evaluationId: eval,
        eleveId: eleve
      }
    }
  )

  //Si elle n'existe pas on la crée, sinon on la met à jour
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



module.exports = router