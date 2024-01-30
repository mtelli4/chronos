const express = require('express');
const router = express.Router();
const { Eleve, Groupe, Cours, CoursGroupe, GroupeEleve } = require('../models')


router.get("/:id", async (req, res) => {
    const coursId =  req.params.id; // obtient le corps de la requête (format json)
    // await Eleve.sequelize.models.Eleve.cache.clear();
    // await Groupe.sequelize.models.Groupe.cache.clear();
    // await Cours.sequelize.models.Cours.cache.clear();
    // await CoursGroupe.sequelize.models.CoursGroupe.cache.clear();
    // await GroupeEleve.sequelize.models.GroupeEleve.cache.clear();
    // faire requête SQL
    console.log("Test cours :");
    console.log(coursId);
    const result = await Cours.findByPk(coursId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{ // Join Groupe à travers la table associative CoursGroupe
            model: Groupe, // La table à joindre Groupe
            through: CoursGroupe, // La table intermédiaire CoursGroupe
            /* Enlever les champs timestamps */
            // timestamps: false, 
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            // where: { id: 2 }, // Où 
            include: [{
                model: Eleve,
                through: GroupeEleve, // Utilisez le modèle Sequelize correspondant à la table intermédiaire Groupe-Eleve
                /* Enlever les champs timestamps */
                // timestamps: false,
                attributes: { exclude: ['createdAt', 'updatedAt'] },
            }],
        }],
    });
    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
