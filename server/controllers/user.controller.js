const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');
const jwt = require('jsonwebtoken');


// @desc Register User
// @route POST /api/user
// @access Public
const userRegister = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email, username, password: password
    }
  });

  if (!created) {
    res.status(400);
    throw new Error('User already exists');
  }

  if (user) {
    generateToken(res, user.id)
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  const pasMatch = await user.matchPassword(password);
  console.log(pasMatch);

  // if (user && (await user.matchPassword(password))) {
  //   generateToken(res, user.id);
  //   res.status(200).json({
  //     id: user.id,
  //     name: user.name,
  //     email: user.email,
  //     isAdmin: user.isAdmin,
  //   });
  // } else {
  //   res.status(401);
  //   throw new Error('Invalid email or password');
  // }
});

// @desc log out User / clear cookie
// @route POST /api/user/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc check Auth cookie
// @route GET /api/user/auth
// @access Public
const authCheck = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findByPk(decoded.userId);
      if (!user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
      } else {
        res.status(200).json({ id: user.id, username: user.username });
      }
    } catch (err) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token found" });
  }
});

module.exports = {
  userLogin,
  userRegister,
  logoutUser,
  authCheck
};