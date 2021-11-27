const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  tweet: {
    type: mongoose.Types.ObjectId,
    ref: 'Tweet',
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    url: {
      type: String,
      unique: true,
    },
    filename: {
      type: String,
      unique: true,
    }
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)
