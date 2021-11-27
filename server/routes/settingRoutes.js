const router = require('express').Router()
const SettingsController = require('../controllers/settingsController')
const upload = require('../config/multer_config')
const passport = require('passport')

router.use(passport.authenticate('jwt', {session: false}))

router.get('/', SettingsController.getProfile)

router.put('/', upload.single('image'), SettingsController.updateProfile)

router.delete('/photo', SettingsController.deleteProfilePic)

module.exports = router
