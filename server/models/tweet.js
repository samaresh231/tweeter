const mongoose = require('mongoose')

const tweetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
  },
  image: {
    type: String,
  },

  //  E => everyone
  //  F => followers only
  visibility: {
    type: String,
    enum: ['E', 'F']
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
  retweets: {
    type: Number,
    default: 0
  },
  saved: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Tweet', tweetSchema)
