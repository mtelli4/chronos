const express = require('express');
const router = express.Router();
const { Eleve, Cours } = require('../models')


router.post("/", async (req, res) => {
    const cours =  req.body; // obtient le corps de la requête (format json)
    // faire requête SQL
    console.log("Requête :");
    console.log(cours);
    console.log("\n");

    const result = await Cours.findByPk(cours.id, {
        include: {
          model: Eleve,
          through: 'eleve_cours', // Nom de la table de liaison
        },
    });
    

    if (result) {
        console.log('Informations sur le cours:', result.toJSON());
        console.log('Élèves inscrits:', result.Eleves.map(eleve => eleve.toJSON()));
    } else {
        console.log('Cours non trouvé');
    }

    
    res.json(result); // pour renvoyer un objet JSON
})
module.exports = router
