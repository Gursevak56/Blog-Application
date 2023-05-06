const mongoose  = require('mongoose');

const userSchema =mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    plainpassword:{
        type:String,
        required:true
    },
    blog:[{type:mongoose.Types.ObjectId,ref:"Blog",required:true}]
},{
    Timestamp:true
});
const User =mongoose.model('user',userSchema);
module.exports =User;