const express = require('express');
const router = express();
const _userService = require('../service/user.service')
const _userMiddleware = require('../middleware/verify_user.middleware')

router.get('/getUser',_userService.getUsers );
router.get('/getUserByMiddleware',_userMiddleware.requestTime,_userService.getUserByMiddleware );
router.post('/postNameByMiddleware',_userMiddleware.validateUser,_userService.postNameByMiddleware );



module.exports = router;
