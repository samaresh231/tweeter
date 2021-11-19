require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const signUp = async (req, res) => {
  const {name, email, password} = req.body
  try {
    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name, email, password: hash
    })
    console.log(user)
    res.status(201).json(user)

  } catch(err) {
    console.log(err)
    res.json(err)
  }
}

const login = async (req, res) => {
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
}

const logout =  async (req, res) => {
  res.clearCookie('jwt')
  res.status(200).json({
    msg: 'logged out successfully'
  })
}

const googleCallback = async (req, res) => {
  const user = req.user;
  const token = jwt.sign({user: user._id}, process.env.secret_key)
  res.cookie('jwt', token)
  res.redirect('http://localhost:3000/')
}

//  for dev use only
const removeCookie = async (req, res) => {
  res.clearCookie('jwt')
  res.json({
    msg: 'logged out successfully'
  })
}

module.exports = {
  signUp,
  login,
  logout,
  googleCallback,
  removeCookie
}