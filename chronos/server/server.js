const express = require('express')
const app = express()
const db = require('./models')
const nodemailer = require("nodemailer");
const { Sequelize } = require('sequelize');
var cors = require('cors');
require('dotenv').config();
app.use(cors());
app.use(express.json())

const sequelize = new Sequelize('ingrid', process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
  host: '127.0.0.1',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database: ', error);
  });

app.listen(5000, () => {
    console.log("listening on port 5000")
})

const moduleCoursRouter = require('./routes/ModuleCours')
app.use("/modules", moduleCoursRouter)

const coursRouter = require('./routes/Cours')
app.use("/cours", coursRouter)

const notesRouter = require('./routes/Notes')
app.use("/notes", notesRouter)

const elevesRouter = require('./routes/Eleve')
app.use("/eleves", elevesRouter)

const professeursRouter = require('./routes/Professeur')
app.use("/professeurs", professeursRouter)

const formationsRouter = require('./routes/Formation')
app.use("/formations", formationsRouter)

// Redirection/route pour backend Login (analyse email et mdp)
const loginRouter = require('./routes/Login')
app.use("/login", loginRouter)

// Redirection/route pour backend newPassword (changement de mot de passe)
const newPasswordRouter = require('./routes/newPassword')
app.use("/newpsw", newPasswordRouter)

// Redirection/route pour backend newPassword (changement de mot de passe)
const getEleveCoursRouter = require('./routes/getEleveCours')
app.use("/eleve-cours", getEleveCoursRouter)

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

var software_mail = process.env.SENDER_EMAIL;
var software_password = process.env.APPLICATION_PASSWORD;

function sendEmail({recipient_email, subject, message}) {
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: software_mail,
        pass: software_password,
      },
    });
    
    const mail_configs = {
      from: software_mail,
      to: recipient_email,
      subject: subject,
      html: `<!DOCTYPE html>
                <html lang="en" >
                <head>
                  <meta charset="UTF-8">
                  <title>CodePen - OTP Email Template</title>
                </head>
                <body>
                <!-- partial:index.partial.html -->
                <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
                  <div style="margin:50px auto;width:70%;padding:20px 0">
                    <div style="border-bottom:1px solid #eee">
                      <img style="width:300px; height:auto" src="cid:logo@logo">
                    </div>
                    <p style="font-size:1.1em">Bonjour,</p>
                    <p>Ceci est un e-mail test. Il peut être utilisé pour envoyer des mails d'information classique, des notifications ou des messages tel que des réinitialisation de mot de passe.</p>
                    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">Ici peut être inséré un message custom récupéré dans la fonction <br>${message}</h2>
                    <p style="font-size:0.9em;">Cordialement,<br />L'équipe CHRONOS</p>
                    <hr style="border:none;border-top:1px solid #eee" />
                    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
                      <p>Night friends Inc</p>
                    </div>
                  </div>
                </div>
                </body>
              </html>`,
        attachments: [
          {
            filename: 'logo.png', // Nom de fichier à utiliser dans l'e-mail
            path: __dirname +"\\images\\logo.png", //mettre logo chronos à la place
            cid: 'logo@logo'
          },
        ],
      };
    transporter.sendMail(mail_configs, function (error, info) {
      if (error) {
        console.log(error);
        return reject({ message: `An error has occured` });
      }
      return resolve({ message: "Email sent succesfuly" });
    });
  });
}

//API ROUTE FOR MAILING
app.post("/send_email", (req, res) => {
  sendEmail(req.body)
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});