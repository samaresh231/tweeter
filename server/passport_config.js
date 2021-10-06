const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
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

googleOpts = {
  clientID: process.env.clientID,
  clientSecret: process.env.clientSecret,
  callbackURL: "http://localhost:8080/auth/google/callback",
}

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.user, {password: 0, __v: 0}).lean()
    if(!user) {
      return done(null, false)
    } else {
      return done(null, user)
    }
  } catch(err) {
    return done(err)
  }
}))

passport.use(new GoogleStrategy(googleOpts, async (request, accessToken, refreshToken, profile, done) => {
  try {
    const email = profile._json.email
    let user = await User.findOne({email}, {password: 0, __v: 0})

    if(!user) {
      user = await User.create({
        name: profile._json.name, email, password: 'none'
      })
    }

    done(null, user)
  } catch(err) {
    console.log(err)
    done(err)
  }
}));