export {}
import { Request, Response } from 'express';
const userRouter = require('express').Router()

// import controller functions
const { loginUser, signupUser } = require('../../controllers/userController')

// testing route
userRouter.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' })
})

// login route
userRouter.post('/login', loginUser)

// signup route
userRouter.post('/signup', signupUser)

module.exports = userRouter
