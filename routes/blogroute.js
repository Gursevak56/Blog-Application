const express =require('express');
const route =express.Router();
const blogcontroller = require('./../controllers/blog-controller');
route.get('/blog',blogcontroller.getallblog);
route.post('/add',blogcontroller.addblog);
route.put('/updateblog/:id',blogcontroller.updateblog);
route.get('/:id',blogcontroller.getbyid);
route.delete('/deleteblog/:id',blogcontroller.deleteblog);
module.exports =route;