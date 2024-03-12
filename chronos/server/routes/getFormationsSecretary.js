const express = require('express');
const router = express.Router();
const { Secretaire, Formation, FormationSecretaire, Groupe, GroupeFormation, Eleve, GroupeEleve } = require('../models');


router.get("/:id", async (req, res) => {
    const secretaryId =  req.params.id; // obtient le corps de la requête (format json)

    // requête SQL
    const result = await Secretaire.findByPk(secretaryId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{ 
            model: Formation, // JOIN Formation
            through: FormationSecretaire, // Table intermédiaire CoursGroupe
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{
                model: Groupe, // JOIN Groupe
                through: GroupeFormation, // Table intermédiaire GroupeFormation
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Eleve, // JOIN Eleve
                    through: GroupeEleve, // Table intermédiaire GroupeEleve
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                }],
            }],
        }],
    });

    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
