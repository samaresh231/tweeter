const mongoose = require('mongoose')

const savedSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tweet: {
    type: mongoose.Types.ObjectId,
    ref: 'Tweet',
    required: true,
  }
})

module.exports = mongoose.model('Saved', savedSchema)