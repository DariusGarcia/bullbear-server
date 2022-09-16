const express = require('express')
const {
	getAllStocks,
	createStock,
	getSingleStock,
	deleteStock,
} = require('../controllers/watchlistController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

// require auth for all watchlist routes
router.use(requireAuth)

// GET all stocks in watchlist
router.get('/', getAllStocks)

// GET a single stock in watchlist
router.get('/:id', getSingleStock)

// POST a single stock
router.post('/', createStock)

// DELETE a single stock
router.delete('/:id', deleteStock)

module.exports = router
