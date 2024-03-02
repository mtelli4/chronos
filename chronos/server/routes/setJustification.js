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
    console.log("TEST TEST TEST TEST TEST TEST TEST");
    

    const uploadedFile = req.file;
    const abs = req.body; // Accédez à d'autres champs du formulaire via req.body
    // console.log(uploadedFile);
    console.log(abs);
    console.log(uploadedFile);















    // console.log(`uploads/r1/n${abs.studentId}/${abs.file.originalname}`);
    // if (abs.file) {
    //     // requête SQL
    //     const result = await Absence.update({ 
    //         justificatif: 'path', // Chemin du fichier de justificatif d'absence
    //         message: abs.reason, // Raison/message pour justifier l'absence
    //         where: { eleveId: abs.studentId, coursId: abs.coursId } 
    //     });
    // } 
    // else {

    // }



});

module.exports = router;
