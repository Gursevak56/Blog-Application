const { default: mongoose } = require('mongoose');
const User = require('../models/user');
const Blog = require('./../models/Blog');
const getallblog =async (req,res)=>{
    try {
        const blogs =await Blog.find();
        if(!blogs){
            res.status(400).json({
                status:'fail',
                message:'Blog not found'
            })
        }
        res.status(200).json({
            status:'success',
            blog:blogs
        })
    } catch (error) {
        console.log(error);
    }
}
const addblog =async (req,res)=>{
try {
    const {title,description,image,user} = req.body;
    const checkuser = await User.findById(user);
    if(!checkuser){
        res.status(404).json({
            status:"not found",
            message:"user not found"
        })
    }
    const blog =await new Blog({
        title:title,
        description:description,
        image:image,
        user
    })
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session});
    await checkuser.blog.push(blog);
    await checkuser.save({session});
    await session.commitTransaction();
} catch (error) {
    console.log(error);
}
}
const updateblog = async (req,res)=>{
    const blogid = req.params.id;

    try {
        if(!blogid){
            res.status(404).json({
                status:'failed',
                message:'blog not found'
            })
        }
        const blog = await Blog.findByIdAndUpdate({_id:blogid},{title:req.body.title,description:req.body.description});
        if(!blog){
            res.status(500).json({
                status:'fail',
                message:'blog not updated'
            })
        }
        res.status(200).json({
            status:'succes',
            updatedblog:blog
        })
    } catch (error) {
        console.log(error);
    }
}
const getbyid = async (req,res)=>{
    const blogid = req.params.id;
    const checkblog = await Blog.findOne({_id:blogid});
    try {
        if(!checkblog){
            res.status(404).json({
                status:'not found',
                message:'their are not a blog with id you provieded'
            })
        }
        res.status(200).json({
            status:'success',
            blog:checkblog
        })
    } catch (error) {
        console.log(error);
    }
}
const deleteblog = async (req,res)=>{
    try {
        const checkblog = await Blog.findOne({_id:req.params.id});
        // const userid = await checkblog.user;
        // console.log(userid)
        // const blogid = await checkblog._id;
        // const user =await User.findOne({_id:userid});

        if(!checkblog){
            res.status(404).json({
                message:'blog already does not exists'
            })
        }
        let isdeleted  = await Blog.findByIdAndRemove({_id:req.params.id}).populate('user');
       const userbolgg= await isdeleted.user.blog.pull(isdeleted);
        // const userblog =await user.blog.indexOf(blogid);
        // console.log(userblog);
        // const userblogg =await user.blog.splice(userblog,1);
         console.log(userblogg);
        if(!isdeleted){
            res.status(500).json({
                message:'Their are some error to delete the blog'
            })
        }
    
        res.status(200).json({
            message:"Blog delelted successfully"
        })
    } catch (error) {
        console.log(error);
    }
}
module.exports ={
    getallblog,
    addblog,
    updateblog,
    getbyid,
    deleteblog
}