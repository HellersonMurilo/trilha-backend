const {Router} = require('express')
const userRoutes = require('./user.Routes')
const authRoutes = require('./auth.Routes')

const router = Router()

router.use('/user', userRoutes)
router.use('/auth', authRoutes)

module.exports = router