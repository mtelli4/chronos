const express = require('express')
const app = express()
var cors = require('cors');
const { Sequelize } = require('sequelize');

app.use(cors());

app.use(express.json())

const db = require('./models')

const sequelize = new Sequelize('ingrid', 'root', 'azerty', {
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

//Routers

// db.sequelize.sync().then(()=>{
//     app.listen(5000, () => {
//         console.log("listening on port 5000")
//     })
// })

app.listen(5000, () => {
          console.log("listening on port 5000")
    })
// const moduleCoursRouter = require('./routes/ModuleCours')
// app.use("/modules", moduleCoursRouter)

// const coursRouter = require('./routes/Cours')
// app.use("/cours", coursRouter)


app.get("/api", (request, response) => {
    response.json({"usersTest": ["user1", "user2", "user3"]})
})

app.get("/test", async (request, response) => {
  const eleves = await db.Eleve.findAll();
  response.json(eleves)
})
