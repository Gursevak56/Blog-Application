const mongoose =require('mongoose');
const blogSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:"user"

    }
})
const Blog = mongoose.model('blog',blogSchema);
module.exports = Blog;