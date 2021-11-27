const router = require('express').Router()
const upload = require('../config/multer_config')
const passport = require('passport')
const TweetController = require('../controllers/tweetController')

router.use(passport.authenticate('jwt', {session: false}))

router.post('/create-tweet', upload.single('image'), TweetController.createTweet)
router.delete('/delete-tweet/:tweetId', TweetController.deleteTweet)
router.post('/retweet', TweetController.reTweet)
router.delete('/delete-retweet/:tweetId', TweetController.deleteRetweet)
router.post('/like-tweet', TweetController.likeTweet)
router.delete('/remove-like/:tweetId', TweetController.removeLike)

module.exports = router
