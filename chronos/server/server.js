const express = require('express')
const app = express()
var cors = require('cors');
app.use(cors());

app.use(express.json())
const db =  require('./models')

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

app.get('/users', async (request, response) => {
  try {
    // Fetch formation IDs using Sequelize model
    const formationIds = await Formation.findAll({
      attributes: ['id'],
    });

    return response.json(formationIds);
  } catch (error) {
    console.error('Error executing Sequelize query:', error);
    return response.json(error);
  }
});

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


app.get("/api", (request, response) => {
    response.json({"usersTest": ["user1", "user2", "user3"]})
})
