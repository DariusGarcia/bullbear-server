require('dotenv').config()
const dotenv = require('dotenv')
dotenv.config()
const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')

// const userRoutes = require('./routes/user')
// const watchlistRoutes = require('./routes/watchlists')
// express app
const app = express()
app.use(cors())

process.on('uncaughtException', function (err) {
	console.error(err)
	console.log('Node NOT Exiting...')
})

const userRoutes = require('./api/user')
const watchlistRoutes = require('./api/watchlists')

// middleware
app.use(express.json())

// routes
app.use((req, res, next) => {
	console.log(req.path, req.method)
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PATCH, DELETE, OPTIONS'
	)
	next()
})

app.use('/api/user', userRoutes)
app.use('/api/watchlist', watchlistRoutes)

// connect to db
mongoose
	.connect(process.env.ATLAS_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to Mongo DB')
		app.listen(process.env.PORT || 5000, '0.0.0.0', () => {
			console.log(`Server started on port ${process.env.PORT}`)
		})
	})
	.catch((error) => {
		console.log(error)
	})

module.exports = app
