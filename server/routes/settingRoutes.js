const router = require('express').Router()
const SettingsController = require('../controllers/settingsController')
const upload = require('../multer_config')
const passport = require('passport')

router.use(passport.authenticate('jwt', {session: false}))

router.get('/', SettingsController.getProfile)

router.put('/', SettingsController.updateProfile)

router.put('/photo', upload.single('image'), SettingsController.updateProfilePic)

router.delete('/photo', SettingsController.deleteProfilePic)

module.exports = router
