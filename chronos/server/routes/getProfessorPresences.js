const express = require('express');
const router = express.Router();
const { sequelize, Professeur, Cours, CoursProfesseur } = require('../models');
const { Op } = require('sequelize');


router.get("/:id", async (req, res) => {
    const profId =  req.params.id; // obtient le corps de la requête (format json)

    console.log("\n\nTEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST TEST\n\n");
    const now = new Date();
    // Formatage au format de date de la bdd
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // requête SQL SELECT
    const result = await Professeur.findByPk(profId, { 
        include: [
            {
                model: Cours,
                attributes: [ // Pour récupérer des champs spécifiques
                    'libelle',
                    [sequelize.fn('SUM', sequelize.col('Cours.duree')), 'duree'], // Nombre d'appels effectués
                ],
                through: {
                    model: CoursProfesseur,
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'professeurId', 'coursId'] 
                    },
                },
                where: {
                    debutCours: {
                        [Op.lt]: formattedDate
                    }
                },
            } 
        ],
        attributes: [], // Pour ne pas récupérer les champs du professeur
        group: ['Cours.libelle'], // GROUP BY libellé de cours
        raw: true,
    })
    console.log(result);
    // Renvoi du résultat (objet JSON)
    res.json(result);
})
module.exports = router