const express = require('express')
const app = express()
var cors = require('cors');
const { Sequelize } = require('sequelize');

app.use(cors());

app.use(express.json())

const db = require('./models')

const sequelize = new Sequelize('ingrid', 'root', '', {
  host: 'localhost',
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

//Routers

// db.sequelize.sync().then(()=>{
//     app.listen(5000, () => {
//         console.log("listening on port 5000")
//     })
// })

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

const formationsRouter = require('./routes/Formation')
app.use("/formations", formationsRouter)

// Redirection/route pour backend Login (analyse email et mdp)
const loginRouter = require('./routes/Login')
app.use("/login", loginRouter)

// Redirection/route pour backend newPassword (changement de mot de passe)
const newPasswordRouter = require('./routes/newPassword')
app.use("/newpsw", newPasswordRouter)




// Redirection/route pour backend getEleveCours (récupération des élèves du cours)
const getEleveCoursRouter = require('./routes/getEleveCours')
app.use("/eleve-cours", getEleveCoursRouter)

// Redirection/route pour backend insertAbsences (insertion d'absences à un cours)
const insertAbsencesRouter = require('./routes/insertAbsences')
app.use("/testabs", insertAbsencesRouter)
