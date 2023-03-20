const stockRouter = require('express').Router()

// import controller functions
const {
  searchStock,
  searchCompanyDetails,
  searchMarketPerformances,
  searchBroadMarketData,
  searchCompanyProfile,
  searchSectorPerformances,
  searchStockNews,
  searchStockPeers,
  searchStockRatings,
  searchChartData,
} = require('../../controllers/stockController')

// testing route
stockRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' })
})

// stock data [symbol, name, price, changes%, dayLow-high, mkt cap, etc.]
stockRouter.post('/', searchStock)

// company details [sector, subsector, headquarters, dateAdded, founded]
stockRouter.post('/company-details', searchCompanyDetails)

// top market performances [changes, price, changes% companyName ] ("gainers" "losers")
stockRouter.post('/market-performances', searchMarketPerformances)

// broad market data [changes, price, changes% companyName ] ("gainers" "losers")
stockRouter.post('/broad-market', searchBroadMarketData)

// company profile [open, volume, eps, pe, sharesoutstanding, priceAvg, dayLow-high]
stockRouter.post('/company-profile', searchCompanyProfile)

// sector performance [basic materials, consumer cyclical, communication services, etc.]
stockRouter.post('/sector-performance', searchSectorPerformances)

// stock news
stockRouter.post('/news', searchStockNews)

// stock peers
stockRouter.post('/peers', searchStockPeers)

// stock ratings
stockRouter.post('/rating', searchStockRatings)

// chart price data
stockRouter.post('/chart-price-data', searchChartData)

module.exports = stockRouter
