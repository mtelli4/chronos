const express = require('express');
const router = express.Router();
const { Eleve, Groupe, Cours, CoursGroupe, GroupeEleve } = require('../models')


router.get("/", async (req, res) => {
    const cours =  req.body; // obtient le corps de la requête (format json)
    // await Eleve.sequelize.models.Eleve.cache.clear();
    // await Groupe.sequelize.models.Groupe.cache.clear();
    // await Cours.sequelize.models.Cours.cache.clear();
    // await CoursGroupe.sequelize.models.CoursGroupe.cache.clear();
    // await GroupeEleve.sequelize.models.GroupeEleve.cache.clear();
    // faire requête SQL

    const result = await Cours.findByPk(1, {//mettre l'id du cours ici :)
        attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
        include: [{
            model: Groupe,
            through: CoursGroupe, // Utilisez le modèle Sequelize correspondant à la table intermédiaire Cours-Groupe
            timestamps: false,
            where: { id:2},
            attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            include: [{
                model: Eleve,
                through: GroupeEleve, // Utilisez le modèle Sequelize correspondant à la table intermédiaire Groupe-Eleve
                timestamps: false,
                attributes: { exclude: ['createdAt', 'updatedAt', 'deletedAt'] },
            }],
        }],
    });
    
    res.json(result); // pour renvoyer un objet JSON
})
module.exports = router
