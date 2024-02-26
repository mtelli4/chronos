const express = require('express');
const router = express.Router();

const { Message } = require('../models')

router.get("/", async (req, res) => {
    const messages = await Message.findAll()
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
      });

      res.status(200).json(messages);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router