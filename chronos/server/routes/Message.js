const express = require('express');
const router = express.Router();

const { Message, Utilisateur, Professeur,ModuleCours, Eleve, Cours, Groupe } = require('../models')

router.get("/", async (req, res) => {
  const messages = await Message.findAll({
    include: [
      {
        model: Utilisateur
      }
    ]
  })
  res.json(messages);
})

router.post("/send", async (req, res) => {
  try {
    const { content, UtilisateurId, ModuleId } = req.body;
    const message = await Message.create({
      content,
      UtilisateurId,
      ModuleId,
    });

    res.status(201).json(message);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// Route pour obtenir les messages par module
router.get('/:ModuleId', async (req, res) => {
  try {
    const { ModuleId } = req.params;

    const messages = await Message.findAll({
      where: { ModuleId },
      include: [
        {
          model: Utilisateur
        }
      ]
    });

    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/canSendMessage/:moduleId/:coursId/:role/:role_id', async (req, res) => {
  try {
    const { moduleId,coursId, role, role_id } = req.params;
    var canSendMessage = false;
    if (role.includes("ROLE_USER")){
      const result = await Eleve.findOne({
        where:{
          id:role_id,
          delegue:true,
          "$Groupes.Cours.id$":coursId
        },
        include:[{
          model:Groupe,
          include:Cours
        }]
      })
      canSendMessage = result != null;
    }else if (role.includes("ROLE_PROFESSOR")){
      const result = await Professeur.findOne({
        where:{
          id:role_id,
          "$ModuleCours.id$": moduleId
        },
        include:[
          {
            model:ModuleCours
          }
        ]
      })
      canSendMessage = result != null;
    }

    res.status(200).json(canSendMessage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router