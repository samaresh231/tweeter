require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const passport = require('passport')
require('./mongodb_config')
require('./passport_config')
const cors = require('cors')

app.use(cors({origin: true, credentials: true}))
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(passport.initialize())
app.use(cookieParser())

app.use('/settings', require('./routes/settingRoutes'))
app.use('/auth', require('./routes/authRoutes'))
// app.use('/tweet/', require('./routes/tweetRoutes'))

// app.post('/signup', notLoggedIn, async (req, res) => {
//   const {name, email, password} = req.body
//   try {
//     const hash = await bcrypt.hash(password, 10)

//     const user = await User.create({
//       name, email, password: hash
//     })
//     console.log(user)
//     res.status(201).json(user)

//   } catch(err) {
//     console.log(err)
//     res.json(err)
//   }
// })

// app.post('/login', notLoggedIn, async (req, res) => {
//   const {email, password} = req.body
//   try {
//     const user = await User.findOne({email}).lean()
//     if(!user) {
//       return res.status(400).json({
//         msg: 'email does not exists'
//       })
//     }

//     const result = await bcrypt.compare(password, user.password)
//     if(result) {
//       const token = jwt.sign({user: user._id}, process.env.secret_key)
//       res.cookie('jwt', token)
//       return res.status(200).json({
//         msg: 'login successful'
//       })
//     }

//     return res.status(400).json({
//       msg: 'password does not match'
//     })
//   } catch(err) {
//     console.log(err)
//     res.json(err)
//   }
// })

// app.delete('/logout', passport.authenticate('jwt', {session: false}), (req, res) => {
//   res.clearCookie('jwt')
//   res.status(200).json({
//     msg: 'logged out successfully'
//   })
// })

// app.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
//   res.status(200).json(req.user)
// })

// app.put('/', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   const data = {}
//   const arr = ['name', 'bio', 'phone', 'email', 'password']
//   arr.forEach(field => {
//     if(req.body[field]) {
//       data[field] = req.body[field]
//     }
//   })

//   try {
//     const user = await User.findByIdAndUpdate(req.user._id, data, {new: true})
//     res.status(201).json(user)
//   } catch(err) {
//     console.log(err)
//     res.json({
//       err: err.message
//     })
//   }
// })

// app.put('/photo', passport.authenticate('jwt', {session: false}), upload.single('image'), async (req, res) => {
//   const photo = req.user.photo
//   try {
//     if(photo && Object.keys(photo).length > 0) {
//       const {filename} = req.user.photo
//       await cloudinary.uploader.destroy(filename)
//     }
    
//     const user = await User.findByIdAndUpdate(req.user._id, {
//       photo: {
//         url: req.file.path,
//         filename: req.file.filename
//       }
//     }, {
//       new: true
//     })
//     res.status(201).json(user.photo)
//   } catch(err) {
//     res.json(err)
//   }
// })

// app.delete('/photo', passport.authenticate('jwt', {session: false}), async (req, res) => {
//   const photo = req.user.photo
//   if(!photo || Object.keys(photo).length === 0) {
//     return res.status(400).json({
//       msg: "profile photo is not uploaded"
//     })
//   }

//   try {
//     await cloudinary.uploader.destroy(req.user.photo.filename)
//     const user = await User.findByIdAndUpdate(req.user._id, {photo: {}}, {new: true})
//     console.log(user)
//     res.json({
//       msg: 'profile picture removed'
//     })
//   } catch(err) {
//     console.log(err)
//     res.json(err)
//   }
// })

// // for dev use only
// app.get('/removeCookie', (req, res) => {
//   res.clearCookie('jwt')
//   res.json({
//     msg: 'logged out successfully'
//   })
// })

// app.get('/auth/google', notLoggedIn, passport.authenticate('google', { scope: [ 'email', 'profile' ] }));

// app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login', session: false}), (req, res) => {
//   const user = req.user;
//   const token = jwt.sign({user: user._id}, process.env.secret_key)
//   res.cookie('jwt', token)
//   res.redirect('http://localhost:3000/')
// })

app.listen(8080, () => console.log('server running on port 8080'))
