const { Schema, model } = require('mongoose')

const watchlistSchema = new Schema(
  {
    ticker: {
      type: String,
      required: true,
      unique: true,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  },
  { timestamps: true }
)

const Watchlist = model('Watchlist', watchlistSchema)

module.exports = Watchlist
