const router = require('express').Router()
const userRoutes = require('./user')
const watchlistRoutes = require('./watchlists')

router.use('/user', userRoutes)
router.use('/watchlist', watchlistRoutes)

module.exports = router
