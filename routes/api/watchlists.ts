export {}
const watchlistRouter = require('express').Router()
const {
  getAllStocks,
  createStock,
  getSingleStock,
  deleteStock,
} = require('../../controllers/watchlistController')

// auth middleware
const requireAuth = require('../../middleware/requireAuth')

// require auth middleware for all watchlist routes
watchlistRouter.use(requireAuth)

// GET all stocks in watchlist
watchlistRouter.get('/', getAllStocks)

// GET a single stock in watchlist
watchlistRouter.get('/:id', getSingleStock)

// POST a single stock
watchlistRouter.post('/', createStock)

// DELETE a single stock
watchlistRouter.delete('/:id', deleteStock)

module.exports = watchlistRouter
