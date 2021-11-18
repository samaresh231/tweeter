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
    url: {
      type: String,
      unique: true,
    },
    filename: {
      type: String,
      unique: true,
    }
  },

  //  E => everyone
  //  F => followers only
  visibility: {
    type: String,
    required: true,
    enum: ['E', 'F'],
    default: 'E'
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  comments: {
    type: Number,
    required: true,
    default: 0,
  },
  retweets: {
    type: Number,
    required: true,
    default: 0,
  },
  saved: {
    type: Number,
    required: true,
    default: 0,
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Tweet', tweetSchema)
