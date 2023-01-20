const Watchlist = require('../models/watchlistModel')
const ObjectId = require('mongoose').Types.ObjectId

// get all stocks in watchlist
const getAllStocks = async (req, res) => {
  const userId = req.user._id
  const allStocksArray = await Watchlist.find({ userId }).sort({
    createdAt: -1,
  })
  res.status(200).json({ allStocksArray })
}

// get a single stock
const getSingleStock = async (req, res) => {
  const { stockId } = req.params
  if (!ObjectId.isValid(stockId)) {
    return res.status(404).json({ error: 'No such stock found in watchlist' })
  }
  const existingStock = await Watchlist.findById(stockId)
  if (!existingStock) {
    return res.status(404).json({ error: 'No such stock found in watchlist' })
  }
  res.status(200).json({ existingStock })
}

// add a stock to the watchlist
const createStock = async (req, res) => {
  const { ticker } = req.body
  // add doc to mongoDB
  try {
    const user_id = req.user._id
    const watchlist = await Watchlist.create({ ticker, user_id })
    res.status(200).json(watchlist)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a stock from the watchlist
const deleteStock = async (req, res) => {
  const { stockId } = req.params
  if (!ObjectId.isValid(stockId)) {
    return res.status(404).json({ error: 'No such stock found in watchlist' })
  }
  const updatedWatchlist = await Watchlist.findOneAndDelete({ _id: stockId })
  if (!updatedWatchlist) {
    return res.status(400).json({ error: 'No such stock found' })
  }
  res.status(200).json(watchlist)
}

module.exports = {
  createStock,
  getAllStocks,
  getSingleStock,
  deleteStock,
}
