const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Absence } = require('../models');


// Configuration de multer pour spécifier le dossier de destination
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const call = req.body; // Obtient le corps de la requête (format JSON)
        const folderPath = `uploads/r1/n${req.body.studentId}`;
        cb(null, folderPath); // Chemin vers le dossier où on enregistre le fichier de justification
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Configuration du nom de fichier
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('file'), async (req, res) => {
    const uploadedFile = req.file; // obtient le fichier de la requête
    const abs = req.body; // obtient le corps de la requête (format json)

    // Chemin d'accès au fichier déposé
    const path = `uploads/r1/n${req.body.studentId}/${uploadedFile.originalname}`;
    // requête SQL
    Absence.update(
        { 
            justificatif: path, // Chemin du fichier de justificatif d'absence
            message: abs.reason, // Raison/message pour justifier l'absence
            envoye: 1
        },
        {
            where: { eleveId: abs.studentId, coursId: abs.coursId } 
        }
    );
});

module.exports = router;
