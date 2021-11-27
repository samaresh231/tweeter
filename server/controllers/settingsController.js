const User = require('../models/user')
const cloudinary = require('../config/cloudinary_config')

const getProfile = (req, res) => {
  res.status(200).json(req.user)
}

const updateProfile = async (req, res) => {
  const data = {}
  const arr = ['name', 'bio', 'phone', 'email', 'password']
  arr.forEach(field => {
    if(req.body[field]) {
      data[field] = req.body[field]
    }
  })

  try {
    if(req.file) {
      if(req.user.photo) {
        const {filename} = req.user.photo
        await cloudinary.uploader.destroy(filename)
      }

      data.photo = {
        url: req.file.path,
        filename: req.file.filename
      }
    }

    const user = await User.findByIdAndUpdate(req.user._id, data, {new: true})
    res.status(201).json(user)
  } catch(err) {
    console.log(err)
    res.json({
      err: err.message
    })
  }
}


// for dev use only
const deleteProfilePic = async (req, res) => {
  const photo = req.user.photo
  if(!photo || Object.keys(photo).length === 0) {
    return res.status(400).json({
      msg: "profile photo is not uploaded"
    })
  }

  try {
    await cloudinary.uploader.destroy(req.user.photo.filename)
    const user = await User.findByIdAndUpdate(req.user._id, {photo: {}}, {new: true})
    console.log(user)
    res.json({
      msg: 'profile picture removed'
    })
  } catch(err) {
    console.log(err)
    res.json(err)
  }
}

module.exports = {
  getProfile,
  updateProfile,
  deleteProfilePic
}