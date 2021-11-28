const mongoose = require('mongoose')

const bookmarkSchema = new mongoose.Schema({
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
}, {
  timestamps: true
})

module.exports = mongoose.model('Bookmark', bookmarkSchema)