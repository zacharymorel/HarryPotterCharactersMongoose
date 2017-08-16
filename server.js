const express = require('express')
const mustacheExpress = require('mustache-express')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId
const bodyParser = require('body-parser')
const app = express()

mongoose.connect('mongodb://localhost:27017/HarryPotterCharactersDB')
mongoose.promise = global.promise

const Character = require('./CharacterSchema')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(express.static('public'))
app.engine('mustache', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mustache')

// READ
app.get('/', (request, response) => {
  Character.find({})
    .then(characters => {
      // console.log(docs)
      response.render('home', { characters })
    })
    .catch(err => {
      response.send('Err')
    })
})
// CREATE FORM
app.get('/createCharacter', (request, response) => {
  response.render('createCharacter')
})
// CREATE POST
app.post('/creatingCharacter', (request, response) => {
  Character.create(request.body)
    .then(doc => {
      response.render('home')
    })
    .catch(err => {
      response.render('createCharacter', { err })
    })
})

// SELECT ONE
app.get('/characterProfile/:id', (request, response) => {
  const id = request.params.id
  Character.findOne({ _id: ObjectId(id) })
    .then(character => {
      response.render('character', { character })
    })
    .catch(err => {
      console.log(err)
    })
})
// DELETE
app.post('/characterProfile/:id/delete', (request, response) => {
  const id = request.params.id
  Character.deleteOne({ _id: ObjectId(id) })
    .then(character => {
      response.render('home')
    })
    .catch(err => {
      console.log(err)
    })
})
// UPDATE
app.post('/characterProfile/:id/update', (request, response) => {
  const id = request.params.id
  Character.updateOne({ _id: ObjectId(id) }, request.body)
    .then(character => {
      response.redirect('/')
    })
    .catch(err => {
      console.log(err)
    })
})
app.listen(3000, () => {
  console.log('Were listening on 3000')
})
