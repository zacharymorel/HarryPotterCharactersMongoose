const Character = require('../models/CharacterSchema')
const ObjectId = require('mongodb').ObjectId

module.exports = app => {
  //GET PAGE OF ALL PEOPLE HOW DONT HAVE A HOUSE
  app.get('/enrollInHouse', (request, response) => {
    Character.withoutHouse()
      .then(characters => {
        response.render('enrollInHouse', { characters })
      })
      .catch(err => {
        console.log(err)
      })
  })

  // ENROLL POST IN HOGWARTS CLASS
  app.post('/enrollInHouse/:id', (request, response) => {
    const id = request.params.id
    Character.findOne({ _id: ObjectId(id) }).then(person => {
      person
        .sortCharacterIntoHouse()
        .then(doc => response.redirect('/characterProfile/' + id))
        .catch(err => response.json(err))
    })
  })

  app.get('/GRHS/Hufflepuff', (request, response) => {
    Character.find({ house: 'Hufflepuff' })
      .then(characters => {
        response.render('GRHS', { characters })
      })
      .catch(err => {
        console.log(err)
      })
  })
  app.get('/GRHS/Ravenclaw', (request, response) => {
    Character.find({ house: 'Ravenclaw' })
      .then(characters => {
        response.render('GRHS', { characters })
      })
      .catch(err => {
        console.log(err)
      })
  })
  app.get('/GRHS/Slytherin', (request, response) => {
    Character.find({ house: 'Slytherin' })
      .then(characters => {
        response.render('GRHS', { characters })
      })
      .catch(err => {
        console.log(err)
      })
  })
  app.get('/GRHS/Gryffindor', (request, response) => {
    Character.find({ house: 'Gryffindor' })
      .then(characters => {
        response.render('GRHS', { characters })
      })
      .catch(err => {
        console.log(err)
      })
  })
}
