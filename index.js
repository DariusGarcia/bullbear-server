require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const limiter = require('./middleware/rateLimiter')
const express = require('express')
const routes = require('./routes')
const app = express()

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
  })
)

const PORT = process.env.PORT || 18490
const ATLAS_URI = process.env.ATLAS_URI

process.on('uncaughtException', (err) => {
  console.error(err)
  console.log('\nNode NOT Exiting...')
})

//  the IP address of the request might be the IP of the load balancer/reverse proxy (making the rate limiter effectively a global one and blocking all requests once the limit is reached) or undefined
app.set('trust proxy', 1)

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// prettier-ignore
app.use((req, res, next) => {
  console.log(req.path, req.method)
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')
  res.setHeader('Access-Control-Allow-Methods','GET, POST, PATCH, DELETE, OPTIONS')
  next()
})
// Apply the rate limiting middleware to all api requests
app.use('/api/stocks', limiter)
app.use('/api/watchlist', limiter)

// routes
app.use(routes)

// connect to db
// prettier-ignore
mongoose.connect(ATLAS_URI, {useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => {
    console.log('\n-------------------------------\nConnected to MongoDB')
    app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 ~ Now listening on port ${PORT}\n-------------------------------\n`)
    })
  })
  .catch((err) => console.log(err))

module.exports = app
