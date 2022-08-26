const express = require('express');
const router = express();
const _userService = require('../service/user.service')
const _userMiddleware = require('../middleware/verify_user.middleware')

router.get('/getUser',_userService.getUsers );
router.get('/getUserByMiddleware',_userMiddleware.requestTime,_userService.getUserByMiddleware );
router.post('/postNameByMiddleware',_userMiddleware.validateUser,_userService.postNameByMiddleware );


//performing CRUD operation.... 
router.post('/addUser', _userService.insertUser);
router.get('/getUsers', _userService.getUsers);
router.get('/getUserById', _userService.getUserById);
router.get('/getUserByName', _userService.getUserByName);
router.get('/deleteUserById', _userService.deleteUserById);

router.post('/resetUserPassword', _userService.resetUserPassword);


module.exports = router;
