const express = require('express')
const app = express()
var cors = require('cors');
app.use(cors());

app.use(express.json())
const db =  require('./models')

//Routers

db.sequelize.sync().then(()=>{
    app.listen(5000, () => {
        console.log("listening on port 5000")
    })
})
const moduleCoursRouter = require('./routes/ModuleCours')
app.use("/modules", moduleCoursRouter)

const coursRouter = require('./routes/Cours')
app.use("/cours", coursRouter)



// Redirection/route pour backend Login (analyse email et mdp)
const loginRouter = require('./routes/Login')
app.use("/login", loginRouter)

// Redirection/route pour backend newPassword (changement de mot de passe)
const newPasswordRouter = require('./routes/newPassword')
app.use("/newPsw", newPasswordRouter)