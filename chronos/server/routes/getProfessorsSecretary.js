const express = require('express');
const router = express.Router();
const { Secretaire, Formation, FormationSecretaire, ModuleCours, FormationModule, Professeur, ProfesseurModule, Cours, CoursProfesseur, Utilisateur } = require('../models')


router.get("/:id", async (req, res) => {
    const userId =  req.params.id; // obtient le corps de la requête (format json)

    // requête SQL SELECT
    const result = await Utilisateur.findByPk(userId, {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        include: [{
            model: Secretaire, // JOIN Secretaire
            attributes: { 
                exclude: ['createdAt', 'updatedAt'] 
            },
            include: [{ 
                model: Formation, // JOIN Formation
                through: FormationSecretaire, // Table intermédiaire FormationSecretaire
                attributes: { 
                    exclude: ['createdAt', 'updatedAt'] 
                },
                include: [{
                    model: ModuleCours, // JOIN ModuleCours
                    through: FormationModule, // Table intermédiaire FormationModule
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt'] 
                    },
                    include: [{
                        model: Professeur, // JOIN Professeur
                        through: ProfesseurModule, // Table intermédiaire ProfesseurModule
                        attributes: { 
                            exclude: ['createdAt', 'updatedAt'] 
                        },
                        include: [{
                            model: Utilisateur, // JOIN Cours
                            attributes: { 
                                exclude: ['createdAt', 'updatedAt'] 
                            },
                        }],
                    }],
                }],
            }],
        }],
    });

    // Renvoi du résultat (objet JSON)
    res.json(result);
})
module.exports = router
