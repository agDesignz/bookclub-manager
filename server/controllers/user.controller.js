const User = require('../models/User');
const asyncHandler = require('../middleware/asyncHandler');
const generateToken = require('../utils/generateToken');


// @desc Register User
// @route POST /api/user
// @access Public
const userRegister = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { email, username, pass1, pass2 } = req.body;
  // const userExists = await User.findOne({where: { userName }});
  if (pass1 != pass2) {
    res.status(400);
    throw new Error('Passwords do not match');
  }

  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email, username, password: pass1
    }
  });

  console.log(user.username, user.email, user.id);
  if (created) {
    console.log(user)
  }

  // if (user) {
  //   generateToken(res, user._id)
  //   res.status(201).json({
  //     id: user.id,
  //     username: user.username,
  //     email: user.email,
  //     isAdmin: user.isAdmin
  //   });
  // } else {
  //   res.status(400);
  //   throw new Error('Invalid user data');
  // }
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

module.exports = {
  userLogin,
  userRegister
};