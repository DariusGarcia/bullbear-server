export {}
const { Schema, model } = require('mongoose')

const watchlistSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Watchlist = model('Watchlist', watchlistSchema)

module.exports = Watchlist
