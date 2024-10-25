const express = require('express');
const router = express.Router();
const { sendEmail } = require('../mailer');
const { Utilisateur, UtilisateursEAV } = require('../models')

router.post("/send", async (req, res) => {
    try {
      await sendEmail(req.body);
      res.status(200).send("Email sent successfully");
    } catch (error) {
      res.status(500).send(error.message);
    }
});
  
router.post("/sendVerificationCode", async (req, res) => {
    const recipient_email = req.body.to;
    const subject = "Verification Code";

    const utilisateur = await Utilisateur.findOne({
        where: {
            email: recipient_email
        }
    })

    if (! utilisateur) {
        res.status(404).send("Aucun utilisateur trouvé");
        return;
    }

    // Creating a verification code between 000000 and 999999
    const generateVerificationCode = () => {
        return Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    };

    // Get all the codes from the db
    const allCodes = await UtilisateursEAV.findAll({
        where: {
            attribute: 'verificationCode'
        },
        attributes: ['value']
    });

    const existingCodes = allCodes.map(codeObj => codeObj.value);

    // Generate a unique code
    var verificationCode;
    do {
        verificationCode = generateVerificationCode();
    } while (existingCodes.includes(verificationCode));

    // Add the code in the DB
    const createdEntry = await UtilisateursEAV.create({
        utilisateurId: utilisateur.id,
        attribute: 'verificationCode',
        value: verificationCode,
        createdAt: new Date()
    });

    const message = `<html>
                        <body>
                            <div>
                                <h1>Bonjour !</h1>
                                <br>
                                <p>Voici votre code de vérification : <b> ${verificationCode} </b>
                                <br>
                                <p>Cliquez sur le lien suivant pour changer votre mot de passe :
                                    <a href='http://localhost:3000/psw'>
                                        Changer votre mot de passe
                                    </a>
                                </p>
                            </div>
                        </body>
                    </html>`;

    try {
        await sendEmail({ recipient_email, subject, message });
        res.status(200).send("Verification code sent successfully");
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).send(error.message);
    }
});

module.exports = router
