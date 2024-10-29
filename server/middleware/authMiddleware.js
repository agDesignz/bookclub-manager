const jwt = require('jsonwebtoken');
const asyncHandler = require('./asyncHandler.js');
const User = require('../models/User.js');

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // The token, "jwt" is passed in with the request
  token = req.cookies.jwt

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      console.log(error)
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});


// admin
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
}

module.exports = { protect, admin }