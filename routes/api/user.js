const userRouter = require('express').Router()

// import controller functions
const { loginUser, signupUser } = require('../../controllers/userController')

// testing route
userRouter.get('/', (req, res) => {
  res.json({ message: 'Welcome to the API!' })
})

// login route
userRouter.post('/login', loginUser)

// signup route
userRouter.post('/signup', signupUser)

module.exports = userRouter
