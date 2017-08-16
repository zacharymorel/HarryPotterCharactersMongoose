// schema goes here
const mongoose = require('mongoose')

//
const harryPotterCharacters = new mongoose.Schema({
  name: { type: String, required: [true, 'I need your name!'], unique: true },
  house: {
    type: String,
    enum: {
      values: ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw'],
      message: 'You must choose one of the 4 Hogwarts houses.'
    }
  },
  yearBorn: { type: Number, required: true },
  facialCharacteristics: [
    {
      hair: { type: String, required: true, trim: true },
      eyeColor: { type: String, lowercase: true, trim: true },
      unique: { type: String, lowercase: true, trim: true }
    }
  ]
})

const Character = mongoose.model('Character', harryPotterCharacters)

module.exports = Character
