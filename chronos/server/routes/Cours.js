const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");

const { Cours, Groupe, Eleve, Formation, Professeur, Utilisateur, GroupeEleve, CoursGroupe, CoursProfesseur } = require('../models')

router.get("/", async (req, res) => {
    const listCours = await Cours.findAll()
    res.json(listCours);
})

router.get("/:id", async (req, res) => {
    const coursId = req.params.id
    const cours = await Cours.findByPk(coursId)
    res.json(cours);
})

router.post("/", async (req, res) => {
    const cours =  req.body
    await Cours.create(cours)
    res.json(cours)
})

router.get("/:role/:idRole/:annee", async (req, res) => {
    try {
        const dateDebut =  new Date(`${req.params.annee}-01-01`)
        const dateFin =  new Date(`${parseInt(req.params.annee)+1}-01-01`)

        const parameters = []
        //Création de filtres en fonction de l'élève ou des professeurs
        if (req.params.role.includes("ROLE_USER")){
            parameters['$Groupes.Eleves.id$'] = parseInt(req.params.idRole)
        }
        if (req.params.role.includes("ROLE_PROFESSOR")){
            parameters['$Professeurs.id$'] = parseInt(req.params.idRole)
        }

        // Récupérer les cours en fonctions des paramètres passés avec l'ID spécifié, avec les cours associés
        const cours = await Cours.findAll({
        attributes:['id','libelle','debutCours','duree','moduleId' ],
          where:{
            debutCours: {
              [Op.and]: [
                { [Op.gte]: dateDebut},
                { [Op.lt]: dateFin }, 
              ],
            },
            ...parameters
          },
          include: [
            {
              model: Professeur,
              attributes: ['id','vacataire','utilisateurId'],
              through:{
                model:CoursProfesseur,
                attributes: []
              },
              include:[
                {
                  model: Utilisateur,
                  attributes: ['id','nom','prenom']
                }
              ]
            },
            {
              model:Groupe,
              through:{
                model:CoursGroupe,
                attributes: []
              },
              attributes:['id','libelle'],
              include: [
                {
                  model:Eleve,
                  attributes:[]
                }
              ]
            }
          ]
        })
    
        if (!cours) {
          return res.status(404).json({ message: "Cours non trouvé" });
        }

        console.log("result")
        console.log(cours)
    
        res.status(200).json(cours);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
})
module.exports = router
