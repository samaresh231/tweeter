const cloudinary = require('./cloudinary_config')
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const multer = require('multer')

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'profile'
  },
});

module.exports = multer({storage: storage})

