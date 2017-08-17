// schema goes here
const mongoose = require('mongoose')

//
const harryPotterCharacters = new mongoose.Schema({
  name: { type: String, required: [true, 'I need your name!'], unique: true },
  house: {
    type: String,
    enum: {
      values: ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', ''],
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

harryPotterCharacters
  .virtual('age')
  .get(function() {
    return new Date().getFullYear() - this.yearBorn
  })
  .set(function(val) {
    this.yearBorn = new Date().getFullYear() - val
  })

// wrtie Instacnce method to sort people in to house if they have no house
harryPotterCharacters.methods.addHarryPotterCharacter = function(callback) {
  return this.model('character').find({
    house: ''
  })
}

const Character = mongoose.model('Character', harryPotterCharacters)

module.exports = Character
