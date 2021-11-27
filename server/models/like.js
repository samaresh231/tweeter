const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  tweet: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Like', likeSchema)
