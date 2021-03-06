const express = require('express')
const mustacheExpress = require('mustache-express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const process = require('process')

const port = process.env.PORT || 3000

//                production               || development
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/HarryPotterCharactersDB'

mongoose.connect(MONGO_URI)
mongoose.promise = global.promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

require('./routes/character')(app)
require('./routes/house')(app)

app.listen(port)
