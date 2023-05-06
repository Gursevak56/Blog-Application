const express =require('express');
const route =express.Router();
const blogcontroller = require('./../controllers/blog-controller');
route.get('/blog',blogcontroller.getallblog);
route.post('/add',blogcontroller.addblog);
module.exports =route;