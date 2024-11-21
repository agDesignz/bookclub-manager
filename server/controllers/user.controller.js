const User = require("../models/User");
const asyncHandler = require("../middleware/asyncHandler");
const generateToken = require("../utils/generateToken");
const jwt = require("jsonwebtoken");

// @desc Register User
// @route POST /api/user
// @access Public
const userRegister = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  const [user, created] = await User.findOrCreate({
    where: { email: email },
    defaults: {
      email,
      username,
      password: password,
    },
  });

  if (!created) {
    res.status(400);
    throw new Error("User already exists");
  }

  if (user) {
    generateToken(res, user.id);
    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Login User
// @route POST /api/user/login
// @access Public
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user.id);
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Check user Auth Status
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
        res.status(200).json({
          id: user.id,
          username: user.username,
          email: user.email,
          isAdmin: user.isAdmin,
          isApproved: user.isApproved,
        });
      }
    } catch (err) {
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token found" });
  }
});

// @desc log out User / clear cookie
// @route POST /api/user/logout
// @access Public
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logged out successfully" });
});

// @desc Get user profile
// @route GET /api/user/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  // Get user profile
});

// @desc Update user profile
// @route PUT /api/user/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id); // Use findByPk for Sequelize

  if (user) {
    // Update user details, using the provided data or keep existing values
    user.username = req.body.username || user.username; // Renamed from 'name' to 'username'
    user.email = req.body.email || user.email;

    // Update password if provided
    if (req.body.password) {
      user.password = req.body.password;
    }

    // Save the updated user
    const updatedUser = await user.save();

    // Respond with updated user details
    res.status(200).json({
      id: updatedUser.id, // Sequelize uses 'id' instead of '_id'
      username: updatedUser.username, // Renamed field
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

/////////////////////////
// ADMIN API FUNCTIONS //
/////////////////////////

// @desc Get All Users
// @route GET /api/allusers
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ["password"] } });
  res.status(200).json(users);
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id).select('-password');
  // if (user) {
  //   res.json(user);
  // } else {
  //   res.status(404);
  //   throw new Error('User not found');
  // }
});

// @desc Delete User
// @route DELETE /api/user/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id);
  // if (user) {
  //   if (user.isAdmin) {
  //     res.status(400);
  //     throw new Error('Can not delete admin user');
  //   }
  //   await User.deleteOne({ _id: user._id });
  //   res.json({ message: 'User removed' });
  // } else {
  //   res.status(404);
  //   throw new Error('User not found');
  // }
});

// @desc Approve User
// @route PUT /api/user/approve
// @access Private/Admin
const approveUser = asyncHandler(async (req, res) => {
  // const user = await User.findById(req.params.id);
  // if (user) {
  //   user.name = req.body.name || user.name;
  //   user.email = req.body.email || user.email;
  //   user.isAdmin = Boolean(req.body.isAdmin);
  //   const updatedUser = await user.save();
  //   res.json({
  //     _id: updatedUser._id,
  //     name: updatedUser.name,
  //     email: updatedUser.email,
  //     isAdmin: updatedUser.isAdmin,
  //   });
  // } else {
  //   res.status(404);
  //   throw new Error('User not found');
  // }
});

// @desc Update User (Admin)
// @route PUT /api/user/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  console.log("params:", req.params.id);
  console.log("data:", req.body);
  const user = await User.findByPk(req.params.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin) || user.isAdmin;
    user.isApproved = Boolean(req.body.isApproved) || user.isApproved;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      isApproved: updatedUser.isApproved,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = {
  userLogin,
  userRegister,
  logoutUser,
  authCheck,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
  approveUser,
};
