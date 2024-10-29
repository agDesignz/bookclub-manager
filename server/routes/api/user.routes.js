const router = require("express").Router();

const {
  userLogin,
  userRegister,
  logoutUser,
  authCheck,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
} = require('../../controllers/user.controller');

const { protect, admin } = require('../../middleware/authMiddleware');

router.get('/auth', authCheck);
router.post('/', userRegister);
router.post('/login', userLogin);
router.post('/logout', logoutUser);
router.get('/profule', getUserProfile);
router.put('/profile', updateUserProfile);

router.get('/allusers', protect, admin, getUsers);
router.get('/:id', protect, admin, getUserById);
router.delete('/:id', protect, admin, deleteUser);
router.put('/:id', protect, admin, updateUser);

module.exports = router;