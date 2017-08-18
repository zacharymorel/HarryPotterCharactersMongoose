const Character = require('../models/CharacterSchema')
const ObjectId = require('mongodb').ObjectId

module.exports = app => {
  //GET PAGE OF ALL PEOPLE HOW DONT HAVE A HOUSE
  app.get('/enrollInHouse', (request, response) => {
    Character.find({ house: '' })
      .then(characters => {
        response.render('enrollInHouse', { characters })
      })
      .catch(err => {
        console.log(err)
      })
  })

  // ENROLL POST IN HOGWARTS CLASS
  app.post('/enrollInHouse/:id', (request, response))
  const id = request.params.id
  Character.updateOne({ _id: ObjectId(id) })
  // Render math.random logic OR
}
