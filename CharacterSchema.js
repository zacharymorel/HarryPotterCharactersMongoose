// schema goes here
const mongoose = require('mongoose')

//
const harryPotterCharacters = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  house: String,
  yearBorn: { type: Number },
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
