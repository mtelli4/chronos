const express = require('express');
const router = express.Router();

const { Eleve, Cours, Groupe, CoursGroupe, GroupeEleve} = require('../models')

router.get("/", async (req, res) => {
   const listEleves = await Eleve.findAll()
   res.json(listEleves);
})


router.get("/:id/cours", async (req, res) => {
    try {
        const eleveId = req.params.id;
    
        // Récupérer l'élève avec l'ID spécifié, avec les cours associés
        const eleve = await Eleve.findByPk(eleveId, {
          include: [
            {
              model: Groupe,
              through: GroupeEleve,
              include: [
                {
                  model: Cours,
                  through: CoursGroupe,
                },
              ],
            },
          ],
        });
    
        if (!eleve) {
          return res.status(404).json({ message: "Élève non trouvé" });
        }
        console.log("result")
        console.log(eleve)
        // Les cours associés à l'élève sont maintenant dans eleve.Groupe.Cours
        const coursDeLEleve = eleve.Groupes.reduce((cours, groupe) => cours.concat(groupe.Cours), []);
    
        res.status(200).json(coursDeLEleve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
})

router.post("/insertListEleves", async (req, res) => {
    const listEleves =  req.body
    listEleves.forEach((eleve) => {
        const tierTemps = eleve.tiersTemps === "oui" ? true : false
        eleve.tiersTemps = tierTemps
        eleve.tombinoscope = null;
        eleve.premiereConnexion = true;
        eleve.formationId = 10;
        Eleve.create(eleve)
    });
    res.json("Succès")
})
module.exports = router
