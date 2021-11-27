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
    },
    filename: {
      type: String,
    }
  },

  //  Everyone => everyone can see the post
  //  Follower => only followers can see the post
  visibility: {
    type: String,
    required: true,
    enum: ['Everyone', 'Follower'],
    default: 'Everyone'
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
