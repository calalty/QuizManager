const mongoose = require('mongoose')
const express = require('express')
const app = express()
const cors = require("cors")
const passport = require("passport")
const {MongoClient} = require("mongodb")


app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors())

app.use(passport.initialize())

require("./middlewares/passport")(passport);

const config = require('./config/database')
const userRoutes = require('./routes/users')
const quizRoutes = require('./routes/quiz')
const topicRoutes = require('./routes/topic')


mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

async function mongoDB() {
    const client = new MongoClient(config.url);

    try {
        await client.connect
    } catch (e) {
        console.log(e)
    } finally {
        await client.close()
    }
}

mongoDB()

app.listen(process.env.PORT || 4321); 
console.log("Listening on PORT 4321")

app.use(userRoutes)
app.use(quizRoutes)
app.use(topicRoutes)