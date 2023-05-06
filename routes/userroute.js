const express = require('express')
const route = express.Router();
const usercontroller = require('./../controllers/user-controller');
route.get('/get',usercontroller.getalluser);
route.post('/signup',usercontroller.signup);
route.post('/login',usercontroller.login);
route.all('*',(req,res)=>{console.log('this is default route')});

module.exports =route;