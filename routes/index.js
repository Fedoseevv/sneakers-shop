const { Router } = require('express')
const router = new Router()
const userRoutes = require('./auth.routes')


router.use('/user', userRoutes)



module.exports = router;