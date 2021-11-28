const Tweet = require('../models/tweet')
const Retweet = require('../models/retweet')
const Like = require('../models/like')
const cloudinary = require('../config/cloudinary_config')
const Bookmark = require('../models/bookmark')


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

    // deleting tweet 
    await Tweet.deleteOne({_id: tweetId}),


    //  deleting all retweets, likes, bookmarks, comments
    // Todo: comments
    await Promise.all([
      Retweet.deleteMany({tweet: tweetId}),
      Like.deleteMany({tweet: tweetId}),
      Bookmark.deleteMany({tweet: tweetId})
    ])

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
    await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {retweets: -1}
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

const likeTweet = async (req, res) => {
  const {tweetId} = req.body

  try {
    const isTweetExists = await Tweet.exists({_id: tweetId})

    // checking if the tweetId is valid tweet
    if(!isTweetExists) {
      return res.status(400).json({
        error: `tweet with tweet id: ${tweetId} doesn't exists`
      })
    }
    const isLikeExists = await Like.exists({tweet: tweetId, user: req.user._id})

    //  checking if the user already liked the tweet
    if(isLikeExists) {
      return res.status(400).json({
        error: 'user already liked the tweet'
      })
    }

    const response = await Like.create({
      tweet: tweetId,
      user: req.user._id
    })

    // updating number of tweet likes by 1
    await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {likes: 1}
    })

    res.status(201).json(response)   
  } catch(err) {
    console.log(err)
    res.json({
      error: err.message
    })
  }
}

const removeLike = async (req, res) => {
  const {tweetId} = req.params
  
  try {
    const response = await Like.deleteOne({tweet: tweetId, user: req.user._id})

    if(response.deletedCount === 0) {
      return res.json({
        error: 'Access Denied'
      })
    }

    //  decreasing number of tweet likes by 1
    await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {likes: -1}
    })

    res.status(200).json({
      msg: `successfully removed like for tweet id: ${tweetId}`
    })
  } catch(err) {
    console.log(err)
    res.json({
      error: err.message
    })
  }
}

const bookmarkTweet = async (req, res) => {
  const {tweetId} = req.body

  try {
    const isTweetExists = await Tweet.exists({_id: tweetId})

    if(!isTweetExists) {
      return res.status(400).json({
        error: `tweet with tweet id ${tweetId} doesn't exists`
      })
    }

    const ifAlreadyBookmarked = await Bookmark.exists({
      tweet: tweetId, 
      user: req.user._id
    })

    if(ifAlreadyBookmarked) {
      return res.status(400).json({
        error: `user already bookmarked this tweet`
      })
    }

    const response = await Bookmark.create({
      tweet: tweetId, 
      user: req.user._id
    })

    await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {saved: 1}
    })

    res.status(201).json(response)

  } catch(err) {
    console.log(err)
    res.json({
      error: err.message
    })
  }
}

const removeBookmark = async (req, res) => {
  const {tweetId} = req.params

  try {
    const response = await Bookmark.deleteOne({
      tweet: tweetId, 
      user: req.user._id
    })

    if(response.deletedCount === 0) {
      return res.json({
        error: 'Access Denied'
      })
    }

    await Tweet.findByIdAndUpdate(tweetId, {
      $inc: {saved: -1}
    })

    res.status(200).json({
      msg: 'bookmark successfully deleted'
    })

  } catch(err) {
    console.log(err)
    res.status(400).json({
      error: err.message
    })
  }
}

module.exports = {
  createTweet,
  deleteTweet,
  reTweet,
  deleteRetweet,
  likeTweet,
  removeLike,
  bookmarkTweet,
  removeBookmark
}
