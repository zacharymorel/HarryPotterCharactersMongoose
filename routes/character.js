const mongoose = require('mongoose')
const Character = require('../models/CharacterSchema')
const ObjectId = require('mongodb').ObjectId

mongoose.promise = global.promise

module.exports = app => {
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

  // CREATE CHARACTER
  app.post('/creatingCharacter', (request, response) => {
    Character.create(request.body)
      .then(doc => {
        response.redirect('/')
      })
      .catch(err => {
        response.render('createCharacter', { err })
      })
  })

  // SELECT A CHARACTER
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

  // UPDATE A CHARACTER
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

  // DELETE A CHARCTER
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
}
