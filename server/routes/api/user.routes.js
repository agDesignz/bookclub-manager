const router = require("express").Router();

const {
  userLogin,
  userRegister,
  logoutUser
} = require('../../controllers/user.controller');

router.post('/', userRegister)
router.post('/login', userLogin);
router.post('/logout', logoutUser);

module.exports = router;