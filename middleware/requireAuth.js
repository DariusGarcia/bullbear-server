const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { User } = require('../models/')
const SECRET_KEY = process.env.SECRET_KEY

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers
  if (!authorization) {
    return res.status(401).json({ error: 'Authorization token required' })
  }

  const token = authorization.split(' ')[1]
  try {
    const _id = jwt.verify(token, SECRET_KEY)

    // select property allows you to just select the property you want instead of the whole document
    // e.g. only returns ID instead of username, password, etc.
    req.user = await User.findOne({ _id: mongoose.Types.ObjectId(_id) }).select(
      '_id'
    )
    if (!req.user) {
      return res
        .status(401)
        .json({ error: 'Invalid token: Request not authorized' })
    }
    next()
  } catch (error) {
    console.log(error)
    res.status(401).json({ error: 'Invalid token: Request not authorized' })
  }
}

module.exports = requireAuth
