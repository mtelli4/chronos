const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const { Utilisateur, UtilisateursEAV } = require('../models')

router.get("/exists", async (req, res) => {
    const { userEmail, attribute, value } = req.query;
    console.log(req.query);
    const utilisateur  = await Utilisateur.findOne({
        where: { 
            email: userEmail,
        }
    });

    // Calculate the time 1 hour ago
    const oneHourAgo = new Date();
    oneHourAgo.setHours(oneHourAgo.getHours() - 1);
        
    // Find the latest entry for the given utilisateurId
    const latestEntry = await UtilisateursEAV.findOne({
        where: {
            utilisateurId: utilisateur.id,
            attribute: 'verificationCode',
            createdAt: {
                [Op.gte]: oneHourAgo
            }
        },
        order: [['createdAt', 'DESC']]
    });

    // Check if the latest entry matches the provided attribute and value
    if (latestEntry && latestEntry.attribute === attribute && latestEntry.value === value) {
        res.json({ exists: true });
    } else {
        res.json({ exists: false });
    }
})

module.exports = router
