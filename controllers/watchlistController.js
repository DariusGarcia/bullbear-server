const Watchlist = require('../models/watchlistModel')
const ObjectId = require('mongoose').Types.ObjectId

// get all stocks in watchlist
const getAllStocks = async (req, res) => {
  const user_id = req.user._id
  const allStocks = await Watchlist.find({ user_id }).sort({
    createdAt: -1,
  })
  res.status(200).json({ allStocks })
}

// get a single stock
const getSingleStock = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such stock found in watchlist' })
  }
  const stock = await Watchlist.findById(id)

  if (!stock) {
    return res.status(404).json({ error: 'No such stock in watchlist' })
  }

  res.status(200).json({ stock })
}

// add a stock to the watchlist
const createStock = async (req, res) => {
  const { ticker } = req.body
  // add doc to mongoDB
  try {
    let user_id = req.user.user_id
    const watchlist = await Watchlist.create({ ticker, user_id })
    res.status(200).json(watchlist)
  } catch (error) {
    res
      .status(400)
      .json({ error: error.message, function: 'createStockFunction' })
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
