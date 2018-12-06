const express = require('express');
const router = express.Router();
const loginContoller = require('./controllers/login.controller');
// router.get('/login', loginContoller.checkLogin); 
router.post('/adduser' , loginContoller.addUser);
router.post('/login', loginContoller.logincheck);
router.get('/getuser',loginContoller.getuserDetails);
module.exports = router;