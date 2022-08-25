const express = require('express');
const router = express();
const _userService = require('../service/user.service')

router.get('/getUser',_userService.getUsers );

module.exports = router;
