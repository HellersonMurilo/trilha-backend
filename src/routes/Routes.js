const {Router} = require('express')
const userRoutes = require('./user.Routes')

const router = Router()

router.use('/user', userRoutes)

module.exports = router