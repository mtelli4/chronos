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

const coursRouter = require('./routes/Cours')
app.use("/cours", coursRouter)


app.get("/api", (request, response) => {
    response.json({"usersTest": ["user1", "user2", "user3"]})
})
