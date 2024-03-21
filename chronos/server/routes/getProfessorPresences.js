const express = require('express');
const router = express.Router();
const { sequelize, Professeur, Cours, CoursProfesseur, ModuleCours } = require('../models');
const { Op } = require('sequelize');


router.get("/:id", async (req, res) => {
    const profId =  req.params.id; // obtient le corps de la requête (format json)
    
    const now = new Date();
    // Formatage au format de date de la bdd
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

    // requête SQL SELECT
    const result = await Cours.findAll({ 
        include: [
            {
                model: Professeur,
                attributes: [], // Pour ne pas récupérer les champs du professeur
                through: {
                    model: CoursProfesseur,
                    attributes: { 
                        exclude: ['createdAt', 'updatedAt', 'professeurId', 'coursId'] 
                    },
                },
                where: { 'id': profId },
            } 
        ],
        attributes: [ // Pour récupérer des champs spécifiques
            'libelle',
            [sequelize.fn('SUM', sequelize.col('Cours.duree')), 'duree'], // Nombre d'appels effectués
        ],
        where: {
            appel: 1
        },
        // group: ['ModuleCour.libelle'], // GROUP BY libellé de cours
        group: ['Cours.libelle'], // GROUP BY libellé de cours
        raw: true,
    });

    // Renvoi du résultat (objet JSON)
    res.json(result);
})
module.exports = router