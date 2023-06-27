import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let authToken = req.headers.authorization
  let token
  if (authToken && authToken.startsWith('Bearer')) {
    try {
      token = authToken.split(' ')[1]
      const decode = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decode.id).select('-password')
      next()
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, token failed')
  }
})

export { protect }
