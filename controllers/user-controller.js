const User = require('./../models/user');
const bcrypt = require('bcrypt');
const getalluser = async (req,res,next)=>{
    try {
        const user = await User.find()
        res.status(200).json({
            status:'success',
            user:user
        })
    } catch (error) {
        console.log(error);
    }
}
const signup = async (req,res)=>{
const checkuser = await User.findOne({email:req.body.email})  
const securepassword = await bcrypt.hash(req.body.password,10);
if(!checkuser){
    const insertdata = await new User({
        name:req.body.name,
        email:req.body.email,
        plainpassword:req.body.password,
        password:securepassword,
        blog:[]
    }).save();
    res.status(200).json({
        status:'success',
        data:insertdata
    })
}
res.status(400).json({
    status:'fail',
    message:'user already exists'
})
}
const login =async (req,res)=>{
    const email = req.body.email;
    const password =req.body.password;
    const checkemail = await User.findOne({email:email});
    if(!checkemail){
        res.status(400).json({
            status:'fail',
            message:'email or  password incorrect'
        })
    }
    const passwordcheck = await bcrypt.compare(password,checkemail.password);
    console.log(passwordcheck);
    if(passwordcheck){
        res.status(200).json({
            status:'success',
            user:checkemail
        })
    }
}
module.exports={
    getalluser,
    signup,
    login
}