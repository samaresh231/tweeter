const router = require('express').Router()
const AuthenticationController = require('../controllers/AuthenticationController')
const passport = require('passport')

const {
  notLoggedIn
} = require('../middlewares/authentication')

router.post('/signup', notLoggedIn, AuthenticationController.signUp)

router.post('/login', notLoggedIn, AuthenticationController.login)

router.delete(
  '/logout', 
  passport.authenticate('jwt', {session: false}),
  AuthenticationController.logout
)

router.get(
  '/google', 
  passport.authenticate('google', { scope: [ 'email', 'profile' ] })
)

router.get(
  '/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', session: false}),
  AuthenticationController.googleCallback
)

module.exports = router