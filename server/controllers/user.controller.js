const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');


// @desc Register User
// @route POST /api/user
// @access Public
const userRegister = asyncHandler(async (req, res) => {
  console.log("req.body:", req.body);
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
  console.log(req.body);
  // const { email, password } = req.body;
  // const user = await User.findOne({ where: { email } });

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
// @route POST /api/users/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  });
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = {
  userLogin,
  userRegister,
  logoutUser
};