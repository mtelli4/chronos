const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');


const { Secretaire, Utilisateur } = require('../models')

router.get("/", async (req, res) => {
    var listSecretaires;
  
     const includes = [];
  
     if (req.query.joinUsers === "true") {
       includes.push({ model: Utilisateur });
     }

     const whereClause = { utilisateurId: { [Op.not]: null } };
  
     if (includes.length > 0) {
       listSecretaires = await Secretaire.findAll({ include: includes, where: whereClause });
     } else {
       listSecretaires = await Secretaire.findAll();
     }
  
    res.json(listSecretaires);
  });

module.exports = router
