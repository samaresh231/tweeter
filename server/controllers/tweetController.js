const Tweet = require('../models/tweet')
const Retweet = require('../models/retweet')
const cloudinary = require('../config/cloudinary_config')


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
    return res.status(201).json(response)

  } catch(err) {
    console.log(err)
    res.json({
      err: err.message
    })
  }
}

// todo: delete likes, saved 
const deleteTweet = async (req, res) => {
  const {tweetId} = req.params

  try {
    const tweet = await Tweet.findById(tweetId)

    // checking if user tweeted the given tweet id
    if(!tweet || !tweet.user.equals(req.user._id)) {
      return res.status(401).json({
        error: 'Access Denied'
      })
    }

    //  deleting images (if any) present in the tweet
    if(tweet.image && tweet.image.filename) {
      const filename = tweet.image.filename
      await cloudinary.uploader.destroy(filename)
    }

    await Tweet.deleteOne({_id: tweetId})

    // deleting all retweets of the deleted tweet
    await Retweet.deleteMany({tweet: tweetId})

    res.status(200).json({
      msg: 'Tweet deleted successfully'
    })
  } catch(err) {
    console.log(err)
    res.status(500).json({
      msg: err.message
    })
  }
}

const reTweet = async (req, res) => {
  const {tweetId} = req.body

  try{
    const tweet = await Tweet.findById(tweetId)

    // checking if tweet with id exists
    if(!tweet) {
      return res.status(400).json({
        msg: `Tweet id ${tweetId} doesn't exists`
      })
    }

    const retweet = await Retweet.findOne({tweet: tweetId, user: req.user._id})
    
    //  Checking if user already retweeted this tweet before
    if(retweet) {
      return res.status(400).json({
        error: `user already retweeted this tweet before`
      })
    }

    // updating retweet count
    await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {retweets: 1}
    }, {
      new: true
    })

    const response = await Retweet.create({
      user: req.user._id,
      tweet: tweetId
    })

    res.status(201).json(response)

  } catch(err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

const deleteRetweet = async (req, res) => {
  const {tweetId} = req.params

  try {
    const response = await Retweet.deleteOne({tweet: tweetId, user: req.user._id})

    // checking if retweet exists
    if(response.deletedCount === 0) {
      return res.status(400).json({
        error: `user never retweeted tweet with id: ${tweetId}`
      })
    }
    
    // decrementing retweet count by 1
    const updatedTweet = await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {retweets: -1}
    }, {
      new: true
    })

    res.status(200).json({
      msg: 'Retweet successfully deleted',
      updatedRetweetCount: updatedTweet.retweets
    })
  } catch(err) {
    console.log(err)
    res.json({
      error: err.message
    })
  }
}

module.exports = {
  createTweet,
  deleteTweet,
  reTweet,
  deleteRetweet
}
