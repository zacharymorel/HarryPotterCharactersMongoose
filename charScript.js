console.log('Working with Mongooose')
// connect to mongo using Mongoose
const mongoose = require('mongoose')

mongoose.promise = global.promise

mongoose.connect('mongodb://localhost:27017/HarryPotterCharactersDB')

// TODO: create the schema in a new file and require it here
const Character = require('./CharacterSchema')

// add a few characters

// Character.create({
//   name: 'Biggles',
//   house: 'Gryffindor',
//   yearBorn: '1989',
//   facialCharacteristics: [{ hair: 'black', eyeColor: 'purple', unique: 'sourtherndraw' }]
// })
//   .then(doc => {
//     console.log(doc)
//   })
//   .catch(err => {
//     console.log(err)
//   })

// query for something, for all characters in HarryPotterCharactersDB
// Character.find({})
//   .select('name')
//   .then(docs => {
//     console.log(docs)
//   })
//   .catch(err => {
//     console.log(err)
//   })
// delete records
// Character.deleteOne({ name: 'Biggles' }).then(() => {
//   Character.find({})
//     .then(docs => {
//       console.log(docs)
//     })
//     .catch(err => {
//       console.log(err)
//     })
// })
