require('dotenv').config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const routes = require('./routes')
const app = express()
const PORT = process.env.PORT || 18490
const ATLAS_URI = process.env.ATLAS_URI

process.on('uncaughtException', (err) => {
  console.error(err)
  console.log('\nNode NOT Exiting...')
})

// middleware
app.use(cors())
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
