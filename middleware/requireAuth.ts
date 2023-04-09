import { Request, Response, NextFunction } from 'express'
const jwt = require('jsonwebtoken')
const { User } = require('../models/')

const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  // verify authentication
  const { authorization } = req.headers
  if (!authorization) {
    return res
      .status(401)
      .json({ error: 'Authorization token required or JWT expired' })
  }

  const token = authorization.split(' ')[1]
  try {
    const _id = jwt.verify(token, process.env.SECRET_KEY)

    // select property allows you to just select the property you want instead of the whole document
    // e.g. only returns ID instead of username, password, etc.
    req.user = await User.findOne(_id).select('_id')
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Invalid token: Request not authorized' })
  }
}

module.exports = requireAuth
