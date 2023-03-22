export {}
import { Request, Response,  } from 'express';
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id: string) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: '3d' })
}

// login user
const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const user = await User.login(username, password)
    // create a token
    const token = createToken(user._id)
    res
      .status(200)
      .json({ username, token, message: `Successfully logged in ${username}` })
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

// signup user
// prettier-ignore
const signupUser = async (req: Request, res: Response) => {
  const { username, password } = req.body
  try {
    const user = await User.signup(username, password)
    // create a token
    const token = createToken(user._id)
    res.status(200).json({username, token, message: `Successfully created new account for: ${username}`})
  } catch (error: any) {
    res.status(400).json({ error: error.message })
  }
}

module.exports = { loginUser, signupUser }
