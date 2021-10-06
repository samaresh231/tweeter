const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String, 
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String, 
    required: true,
  },
  bio: {
    type: String,
  },
  phone: {
    type: String,
  },
  photo: {
    url: {
      type: String,
      unique: true,
    },
    filename: {
      type: String,
      unique: true,
    }
  },
})

module.exports = mongoose.model('User', userSchema)