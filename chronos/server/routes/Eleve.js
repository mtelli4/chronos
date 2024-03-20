const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');
const { Eleve, Utilisateur, Cours, Groupe, CoursGroupe, GroupeEleve, UtilisateurRole, Formation, Professeur,CoursProfesseur } = require('../models')

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
          nom: eleve.nom,
          prenom: eleve.prenom,
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

      const eleveToInsert = {
        numeroEtudiant: eleve.numeroEtudiant,
        tiersTemps: eleve.tiersTemps,
        formationId: eleve.formationId
      }

      if (user) {
        eleveToInsert.utilisateurId = user.id;

        // Update or create student
        await Eleve
        .findOne({where: {utilisateurId: user.id}})
        .then(async function (foundItem) {
            if (!foundItem) {
                // Item not found, create a new one
                await Eleve.create(eleveToInsert);
            } else {
                // Found an item, update it
                await Eleve.update(eleveToInsert, {where: {utilisateurId: user.id}});
            }
        });
      } else {
        await Eleve.create(eleveToInsert);
      }     
    }
    res.json(errors);
})
module.exports = router
