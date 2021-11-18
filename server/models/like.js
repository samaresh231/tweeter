const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  likedBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Like', likeSchema)
