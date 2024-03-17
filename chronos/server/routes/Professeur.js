const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


const { Professeur, Utilisateur, UtilisateurRole } = require('../models')

router.get("/", async (req, res) => {
    var listProfs;
  
     const includes = [];
  
     if (req.query.joinUsers === "true") {
       includes.push({ model: Utilisateur });
     }

     const whereClause = { utilisateurId: { [Op.not]: null } };
  
     if (includes.length > 0) {
       listProfs = await Professeur.findAll({ include: includes, where: whereClause });
     } else {
       listProfs = await Professeur.findAll();
     }
  
    res.json(listProfs);
  });

router.post("/insertListProfs", async (req, res) => {
    function validateArrayPattern(obj) {
        const { nom, prenom, email, vacataire } = obj;

        // Check for existence and types
        const areStrings =
            typeof nom === 'string' &&
            typeof prenom === 'string' &&
            typeof email === 'string';

        const isBoolean = ['0', '1', 'false', 'true', 'no', 'yes', 'off', 'on', 'non', 'oui'].includes(String(vacataire).toLowerCase());

        return areStrings && isBoolean;
    }

    const listProfs = req.body
    var errors = [];
    for (const prof of listProfs.data) {
        const isValid = validateArrayPattern(prof);
    
        if (! isValid) {
            errors.push(prof);
            continue;
        }

        // Creating user array
        const utilisateur = {
            email: prof.email,
        }

        // Update or create user
        await Utilisateur
        .findOne({where: {email: prof.email}})
        .then(async function (foundItem) {
            if (!foundItem) {
                utilisateur.premiereConnexion = true;

                // Item not found, create a new one
                await Utilisateur.create(utilisateur);
            } else {
                // Found an item, update it
                await Utilisateur.update(utilisateur, {where: {email: prof.email}});
            }
        });

        const user = await Utilisateur.findOne({where: {email: prof.email}});

        await UtilisateurRole.findOrCreate({
            where: {
              UtilisateurId: user.id,
              RoleId: 2
            }
          });
        
        const vacataire = ['1', 'true', 'yes', 'on', 'oui'].includes(String(prof.vacataire).toLowerCase());
        prof.vacataire = vacataire;
        prof.utilisateurId = user.id;

        if (user) {
            // Update or create student
            await Professeur
            .findOne({where: {utilisateurId: user.id}})
            .then(async function (foundItem) {
                if (!foundItem) {
                    // Item not found, create a new one
                    await Professeur.create(prof);
                } else {
                    // Found an item, update it
                    await Professeur.update(prof, {where: {utilisateurId: user.id}});
                }
            });
        } else {
            await Professeur.create(prof);
        }
    }
    res.json(errors)
})
module.exports = router
