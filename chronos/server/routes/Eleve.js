const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


const { Eleve, Utilisateur, Cours, Groupe, CoursGroupe, GroupeEleve, UtilisateurRole, Formation } = require('../models')

router.get("/", async (req, res) => {
  var listEleves;

   const includes = [];

   if (req.query.joinUsers === "true") {
     includes.push({ model: Utilisateur });
   }

   if (req.query.joinFormations === "true") {
     includes.push({ model: Formation });
   }

   const whereClause = { utilisateurId: { [Op.not]: null } };

   if (includes.length > 0) {
     listEleves = await Eleve.findAll({ include: includes, where: whereClause });
   } else {
     listEleves = await Eleve.findAll();
   }

  res.json(listEleves);
});

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
        // Les cours associés à l'élève sont maintenant dans eleve.Groupe.Cours
        const coursDeLEleve = eleve.Groupes.reduce((cours, groupe) => cours.concat(groupe.Cours), []);
    
        res.status(200).json(coursDeLEleve);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur serveur" });
    }
})

router.post("/insertListEleves", async (req, res) => {
    function validateArrayPattern(obj) {
      const { nom, prenom, numeroEtudiant, email, tiersTemps } = obj;

      // Check for existence and types
      const areStrings =
        typeof nom === 'string' &&
        typeof prenom === 'string' &&
        typeof numeroEtudiant === 'string' &&
        typeof email === 'string';

      const isBoolean = ['0', '1', 'false', 'true', 'no', 'yes', 'off', 'on', 'non', 'oui'].includes(String(tiersTemps).toLowerCase());

      return areStrings && isBoolean;
    }
  
    const listEleves = req.body
    const formationId = listEleves.formationId;
    var errors = [];
    for (const eleve of listEleves.data) {
      const isValid = validateArrayPattern(eleve);
    
      if (! isValid) {
        errors.push(eleve);
        continue;
      }

      // Creating user array
      const utilisateur = {
          email: eleve.email,
      }

      // Update or create user
      await Utilisateur
      .findOne({where: {email: eleve.email}})
      .then(async function (foundItem) {
          if (!foundItem) {
              utilisateur.premiereConnexion = true;

              // Item not found, create a new one
              await Utilisateur.create(utilisateur);
          } else {
              // Found an item, update it
              await Utilisateur.update(utilisateur, {where: {email: eleve.email}});
          }
      });

      const user = await Utilisateur.findOne({where: {email: eleve.email}});

      await UtilisateurRole.findOrCreate({
        where: {
          UtilisateurId: user.id,
          RoleId: 1
        }
      });
      
      const tiersTemps = ['1', 'true', 'yes', 'on', 'oui'].includes(String(eleve.tiersTemps).toLowerCase());
      eleve.tiersTemps = tiersTemps;
      eleve.formationId = formationId;

      if (user) {
        eleve.utilisateurId = user.id;

        // Update or create student
        await Eleve
        .findOne({where: {utilisateurId: user.id}})
        .then(async function (foundItem) {
            if (!foundItem) {
                // Item not found, create a new one
                await Eleve.create(eleve);
            } else {
                // Found an item, update it
                await Eleve.update(eleve, {where: {utilisateurId: user.id}});
            }
        });
      } else {
        await Eleve.create(eleve);
      }     
    }
    res.json(errors);
})
module.exports = router
