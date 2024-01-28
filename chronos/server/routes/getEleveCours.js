const express = require('express');
const router = express.Router();
const { Eleve, Groupe, Cours, CoursGroupe, GroupeEleve } = require('../models')


router.post("/", async (req, res) => {
    const cours =  req.body; // obtient le corps de la requête (format json)



    // await Eleve.sequelize.models.Eleve.cache.clear();
    // await Groupe.sequelize.models.Groupe.cache.clear();
    // await Cours.sequelize.models.Cours.cache.clear();
    // await CoursGroupe.sequelize.models.CoursGroupe.cache.clear();
    // await GroupeEleve.sequelize.models.GroupeEleve.cache.clear();

    // faire requête SQL
    console.log("Requête :");
    console.log(cours);
    console.log("\n");


    const result = await Cours.findByPk(cours.id, {
        include: [
            {
                model: Groupe,
                include: [
                    {
                        model: Eleve
                    }
                ]
            }
        ]
    });
    




    if (result) {
        console.log('Informations sur le cours:', result.toJSON());
        console.log('Élèves inscrits:', result.Eleve.map(eleve => eleve.toJSON()));
    } else {
        console.log('Cours non trouvé');
    }

    
    res.json(result); // pour renvoyer un objet JSON
})
module.exports = router
