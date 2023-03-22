export {}
const router = require('express').Router()
const userRoutes = require('./user')
const watchlistRoutes = require('./watchlists')
const stockRoutes = require('./stock')

router.use('/user', userRoutes)
router.use('/watchlist', watchlistRoutes)
router.use('/stocks', stockRoutes)

module.exports = router
