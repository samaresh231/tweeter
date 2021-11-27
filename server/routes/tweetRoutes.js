const router = require('express').Router()
const upload = require('../config/multer_config')
const passport = require('passport')
const TweetController = require('../controllers/tweetController')

router.use(passport.authenticate('jwt', {session: false}))

router.post('/create-tweet', upload.single('image'), TweetController.createTweet)
router.delete('/delete-tweet/:id', TweetController.deleteTweet)

module.exports = router
