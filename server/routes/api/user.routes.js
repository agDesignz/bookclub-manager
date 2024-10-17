const router = require("express").Router();

const {
  userLogin
} = require('../../controllers/user.controller');

router.post('/login', userLogin);

module.exports = router;