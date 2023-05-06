const Blog = require('./../models/Blog');
const getallblog =async (req,res)=>{
    try {
        const blogs =await Blog.findOne();
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
const {title,description,image,user} =req.body;
try {
    const blogdata = await new Blog({
        title,
        description,
        image,
        user
    }).save().then(result =>{
        console.log("blog added successfully");
    }).catch(err =>{
        console.log(err);
    });
} catch (error) {
    console.log(error);
}
}
module.exports ={
    getallblog,
    addblog 
}