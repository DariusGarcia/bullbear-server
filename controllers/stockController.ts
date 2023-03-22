export {}
require('dotenv').config()
import  { Request, Response } from 'express';

// search for main stock data
const searchStock = async (req: Request, res: Response) => {
  const { ticker } = req.body
  const api = `${process.env.BASE_URL}${ticker}?apikey=${process.env.API_KEY}`
  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((stockData) => stockData)
      .catch((err) => console.log(err))

    res.status(200).json({ stockData: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
// search for stock company details
const searchCompanyDetails = async (req: Request, res: Response) => {
  const api = process.env.COMPANY_DETAILS! + process.env.API_KEY!
  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((companyDetails) => companyDetails)
      .catch((err) => console.log(err))

    res.status(200).json({ companyDetails: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for market performances (losers/gainers)
const searchMarketPerformances = async (req: Request, res: Response) => {
  const { query } = req.body
  const api =
    process.env.MARKET_ACTIVITY + `${query}?apikey=` + process.env.API_KEY
  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((marketPerformances) => marketPerformances)
      .catch((err) => console.log(err))

    res.status(200).json({ marketPerformances: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}
// search for broad market data
const searchBroadMarketData = async (req: Request, res: Response) => {
  const { describe } = req.body
  const api =
    process.env.BROADMARKET_URL + `${describe}?apikey=` + process.env.API_KEY

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((broadMarketData) => broadMarketData)
      .catch((err) => console.log(err))

    res.status(200).json({ broadMarketData: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for company profile
const searchCompanyProfile = async (req: Request, res: Response) => {
  const { stock } = req.body
  const api =
    process.env.COMPANY_PROFILE + `${stock}?apikey=` + process.env.API_KEY

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((companyProfile) => companyProfile)
      .catch((err) => console.log(err))

    res.status(200).json({ companyProfileData: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for sector performances
const searchSectorPerformances = async (req: Request, res: Response) => {
  const api = process.env.SECTOR_URL! + process.env.API_KEY!

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((sectorData) => sectorData)
      .catch((err) => console.log(err))

    res.status(200).json({ sectorPerformanceData: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for stock news
const searchStockNews = async (req: Request, res: Response) => {
  const { stock } = req.body
  const limit = 15

  const api =
    process.env.STOCK_NEWS_URL +
    `${stock}&limit=${limit}&apikey=` +
    process.env.API_KEY

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((stockNews) => stockNews)
      .catch((err) => console.log(err))

    res.status(200).json({ stockNews: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for stock peers
const searchStockPeers = async (req: Request, res: Response) => {
  const { stock } = req.body

  const api = process.env.STOCK_PEERS + `${stock}&apikey=` + process.env.API_KEY

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((stockPeers) => stockPeers)
      .catch((err) => console.log(err))

    res.status(200).json({ stockPeers: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for stock ratings
const searchStockRatings = async (req: Request, res: Response) => {
  const { stock } = req.body

  const api =
    process.env.STOCK_RATING + `${stock}?apikey=` + process.env.API_KEY

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((stockRating) => stockRating)
      .catch((err) => console.log(err))

    res.status(200).json({ stockRating: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// search for stock chart price data
const searchChartData = async (req: Request, res: Response) => {
  const { stock } = req.body
  const timeInterval = '30min'

  const api =
    process.env.BROADMARKET_URL +
    `historical-chart/${timeInterval}/${stock}?apikey=` +
    process.env.API_KEY

  try {
    const response = await fetch(api)
      .then((res) => res.json())
      .then((chartData) => chartData)
      .catch((err) => console.log(err))

    res.status(200).json({ chartPriceData: response })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = {
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
}
