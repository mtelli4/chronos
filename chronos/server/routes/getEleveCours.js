const express = require('express');
const router = express.Router();
const { Eleve, Groupe, Cours, CoursGroupe, GroupeEleve } = require('../models')


router.get("/:id", async (req, res) => {
    const coursId =  req.params.id; // obtient le corps de la requête (format json)

    // requête SQL
    const result = await Cours.findByPk(coursId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },

        include: [{ // Join Groupe à travers la table associative CoursGroupe
            model: Groupe, // La table à join Groupe
            through: CoursGroupe, // La table intermédiaire CoursGroupe
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Eleve, // La table à join Eleve
                through: GroupeEleve, // La table intermédiaire GroupeEleve
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],
        }],
    });

    // Renvoi du résultat (objet JSON)
    res.json(result);
})
module.exports = router
