export {}
const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      min: [8, 'Password has to be at least 8 characters.'],
    },
  },
  { timestamps: true }
)

// static signup method
userSchema.statics.signup = async function (username: string, password:string) {
  // validation of username and password
  if (!username || !password) {
    throw new Error('Please provide both username and password.')
  }
  // check if username already exists
  const existingUsername = await this.findOne({ username })
  if (existingUsername) {
    throw Error('username already exists')
  }
  // hashing the password using bcrypt hashing algorithm
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const newUser = await this.create({ username, password: hashedPassword })
  return newUser
}

// static login method
userSchema.statics.login = async function (username: string, password:string) {
  // validation of username and password
  if (!username || !password) {
    throw Error('All fields must be filled')
  }
  const existingUser = await this.findOne({ username })
  if (!existingUser) {
    throw Error('Invalid login credentials: incorrect username')
  }
  // comparing the hashed password to the user's entered password
  const isMatchingPassword = await bcrypt.compare(
    password,
    existingUser.password
  )
  if (!isMatchingPassword) {
    throw Error('Invalid login credentials: incorrect password')
  }
  return { existingUser }
}

const User = model('User', userSchema)

module.exports = User
