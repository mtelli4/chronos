const express = require('express');
const router = express.Router();
const { Secretaire, Formation, FormationSecretaire, Eleve, Utilisateur } = require('../models');


router.get("/:id", async (req, res) => {
    const userId =  req.params.id; // obtient le corps de la requête (format json)

    // requête SQL SELECT
    const result = await Utilisateur.findByPk(userId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{ 
            model: Secretaire, // JOIN Secretaire
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{  
                model: Formation, // JOIN Formation
                through: FormationSecretaire, // Table intermédiaire CoursGroupe
                attributes: { exclude: ['createdAt', 'updatedAt'] },
                include: [{
                    model: Eleve, // JOIN Eleve
                    attributes: { exclude: ['createdAt', 'updatedAt'] },
                    include: [{
                        model: Utilisateur, // JOIN Utilisateur
                        attributes: { exclude: ['createdAt', 'updatedAt'] },
                    }]
                }]
            }],
        }],
    });

    // Renvoi du résultat (objet JSON)
    res.json(result); 
})
module.exports = router
