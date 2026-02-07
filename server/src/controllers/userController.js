const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Token

const generateToken = (userId)=>{
    return jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"1d"})
};

// SIGNUP

exports.signup = async(req,res)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }

        const userExists = await User.findOne({email});

        if(userExists){
            return res.status(400).json({message:"Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password:hashedPassword
        })
        res.status(201).json({
            message:"Signup successfull",
            user:{
                id:user._id,
                name:user.name,
                email:user.email
            }
        })
    } catch (error) {
        res.status(500).json({message:"Signup failed"})
    }
}

// SIGN IN

exports.login = async(req,res)=>{
    try {
    const {email,password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        res.status(400).json({message:"User not available"});
    }
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        res.status(401).json({message:"Invalid password"})
    }
    const token = generateToken(user._id);

    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"strict",
        maxAge: 24*60*60*1000
    })

    res.status(401).json({message:"Login successfull",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
    })
}catch(error){
    res.status(500).json({message:"Login Failed"})
}
}

// LOGOUT

exports.logout=(req,res)=>{
    res.clearCookie("token");
    res.json({message:"Logout successfull"});
}