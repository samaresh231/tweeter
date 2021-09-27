const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const User = require('./models/user')

const opts = {}

opts.jwtFromRequest = (req) => {
  let token = null
  if (req && req.cookies) {
    token = req.cookies['jwt']
  }
  return token
}

opts.secretOrKey = process.env.secret_key

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.user).lean()
    if(!user) {
      return done(null, false)
    } else {
      return done(null, user)
    }
  } catch(err) {
    return done(err)
  }
}))