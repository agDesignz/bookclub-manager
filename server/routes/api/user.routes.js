const router = require("express").Router();

const {
  userLogin,
  userRegister,
  logoutUser,
  authCheck,
} = require('../../controllers/user.controller');

router.post('/', userRegister);
router.post('/login', userLogin);
router.post('/logout', logoutUser);
router.get('/auth', authCheck);

module.exports = router;