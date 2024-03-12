const express = require('express');
const router = express.Router();
const { Eleve, Groupe, Cours, CoursGroupe, GroupeEleve } = require('../models')


router.get("/:id", async (req, res) => {
    const coursId =  req.params.id; // obtient le corps de la requête (format json)

    // requête SQL
    const result = await Cours.findByPk(coursId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{ 
            model: Groupe, // JOIN Groupe
            through: CoursGroupe, // Table intermédiaire CoursGroupe
            attributes: { 
                exclude: ['createdAt', 'updatedAt'] 
            },
            include: [{
                model: Eleve, // JOIN Eleve
                through: GroupeEleve, // Table intermédiaire GroupeEleve
                attributes: { 
                    exclude: ['createdAt', 'updatedAt'] 
                },
            }],
        }],
    });

    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
