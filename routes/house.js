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
}
