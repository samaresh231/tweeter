const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function notLoggedIn (req, res, next) {
  const token = req.cookies['jwt']
  if(token) {
    try {
      const payload = jwt.verify(token, process.env.secret_key)
      if(payload) {
        const user = await User.findById(payload.user, {password: 0}).lean()
        if(user) {
          req.user = user
          return res.status(400).json({
            msg: "already logged in"
          })
        }
      }
    } catch(err) {
      next()
    }
  }

  next()
}

module.exports = {
  notLoggedIn
}