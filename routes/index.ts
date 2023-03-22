export {}
import {  Request, Response } from 'express'

const router = require('express').Router()
const apiRoutes = require('./api')

router.use('/api', apiRoutes)

router.use((req: Request, res: Response) => {
  res.send('<h1>Wrong Route!</h1>')
})

module.exports = router
