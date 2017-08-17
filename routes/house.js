const Character = require('../models/CharacterSchema')
const ObjectId = require('mongodb').ObjectId

module.exports = app => {
  //GET PAGE OF ALL PEOPLE HOW DONT HAVE A HOUSE
  app.get('/enrollInHouse', (request, response) => {
    response.send('Hello World!')
  })
}
