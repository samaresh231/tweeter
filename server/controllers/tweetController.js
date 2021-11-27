const User = require('../models/user')
const Tweet = require('../models/tweet')
const cloudinary = require('../config/cloudinary_config')

// todo: image upload
const createTweet = async (req, res) => {
  const data = req.body

  try {
    const validFields = ['text', 'visibility']
    const tweet = {}
    tweet.user = req.user._id

    validFields.forEach(field => {
      if(data[field]) {
        tweet[field] = data[field]
      }
    })

    if(req.file) {
      tweet.image = {
        url: req.file.path,
        filename: req.file.filename
      }
    }

    if(!tweet.image && !tweet.text) {
      return res.status(400).json({
        error: 'text and image both are empty'
      })
    }

    const response = await Tweet.create(tweet)
    return res.json(response)

  } catch(err) {
    console.log(err)
    res.json({
      err: err.message
    })
  }
}

// todo: likes, retweets, saved 
const deleteTweet = async (req, res) => {
  const {id} = req.params

  try {
    const tweet = await Tweet.findById(id)

    if(tweet.image && tweet.image.filename) {
      const filename = tweet.image.filename
      await cloudinary.uploader.destroy(filename)
    }

    const response = await Tweet.findByIdAndDelete(id)

    res.json(response)
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: err.message
    })
  }
}

module.exports = {
  createTweet,
  deleteTweet
}
