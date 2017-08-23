// schema goes here
const mongoose = require('mongoose')

const HOUSES = ['Gryffindor', 'Slytherin', 'Hufflepuff', 'Ravenclaw', '']

//
const harryPotterCharacters = new mongoose.Schema({
  name: { type: String, required: [true, 'I need your name!'], unique: true },
  house: {
    type: String,
    enum: {
      values: HOUSES,
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
// VIRTUAL FEILD
harryPotterCharacters
  .virtual('age')
  .get(function() {
    return new Date().getFullYear() - this.yearBorn
  })
  .set(function(val) {
    this.yearBorn = new Date().getFullYear() - val
  })

// INSTANCE METHOD FOR CHARACTER WHO HAS NO HOUSE
harryPotterCharacters.methods.sortCharacterIntoHouse = function(callback) {
  let selectedHouse = undefined
  while (!selectedHouse) {
    selectedHouse = HOUSES[Math.floor(Math.random() * HOUSES.length)]
  }
  // console.log('selected', selectedHouse, this)
  this.house = selectedHouse
  return this.save()
}

// STATIC METHOD GET CHARACTERS WHO HAVE NO HOUSE
harryPotterCharacters.statics.withoutHouse = function(callback) {
  return Character.find({ house: '' })
}

const Character = mongoose.model('Character', harryPotterCharacters)

module.exports = Character
