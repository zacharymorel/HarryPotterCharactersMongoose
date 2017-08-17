const express = require('express')
const mustacheExpress = require('mustache-express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://localhost:27017/HarryPotterCharactersDB')
mongoose.promise = global.promise

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

require('./routes/character')(app)

app.listen(3000, () => {
  console.log('Were listening on 3000')
})
