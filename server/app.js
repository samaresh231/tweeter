require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const cloudinary = require('./cloudinary_config')
const passport = require('passport')
require('./mongodb_config')
require('./passport_config')
const User = require('./models/user')

const {
  notLoggedIn
} = require('./middlewares/authentication')

app.use(morgan('dev'))
app.use(express.json())
app.use(passport.initialize())
app.use(cookieParser())

app.post('/signup', notLoggedIn, async (req, res) => {
  const {name, email, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name, email, password: hash
    })
    res.json(user)

  } catch(err) {
    console.log(err)
    res.json(err)
  }
})

app.post('/login', notLoggedIn, async (req, res) => {
  const {email, password} = req.body
  try {
    const user = await User.findOne({email}).lean()
    if(!user) {
      return res.status(400).json({
        msg: 'email does not exists'
      })
    }

    const result = await bcrypt.compare(password, user.password)
    if(result) {
      const token = jwt.sign({user: user._id}, process.env.secret_key)
      res.cookie('jwt', token)
      return res.status(200).json({
        msg: 'login successful'
      })
    }

    return res.status(400).json({
      msg: 'password does not match'
    })
  } catch(err) {
    console.log(err)
    res.json(err)
  }
})

app.delete('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.clearCookie('jwt')
  res.json({
    msg: 'logged out successfully'
  })
})

app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    msg: 'hi'
  })
})

app.put('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
  const data = {}
  const arr = ['name', 'bio', 'phone', 'email', 'password']
  arr.forEach(field => {
    if(req.body[field]) {
      data[field] = req.body[field]
    }
  })

  try {
    const user = await User.findByIdAndUpdate(req.user._id, data, {new: true})
    res.status(201).json(user)
  } catch(err) {
    console.log(err)
    res.json({
      err: err.message
    })
  }
})

app.get('/removeCookie', (req, res) => {
  res.clearCookie('jwt')
  res.json({
    msg: 'logged out successfully'
  })
})

app.get('/auth/google', notLoggedIn, passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false}), (req, res) => {
  const user = req.user;
  const token = jwt.sign({user: user._id}, process.env.secret_key)
  res.cookie('jwt', token)
  res.redirect('/')
})

app.listen(8080, () => console.log('server running on port 8080'))
