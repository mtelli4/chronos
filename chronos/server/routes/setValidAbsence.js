// const express = require('express');
// const router = express.Router();
// const { Absence } = require('../models');


// router.post("/", async (req, res) => {
//     const abs = req.body; // obtient le corps de la requête (format json)
    
//     // requête SQL
//     Absence.(
//         { 
//             message: abs.reason, // Raison/message pour justifier l'absence
//             envoye: 1
//         },
//         {
//             where: { eleveId: abs.studentId, coursId: abs.coursId } 
//         }
//     ); 
// });

// module.exports = router;
