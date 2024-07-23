const asyncHandler = require("express-async-handler")
const bcrypt = require("bcrypt")
const User = require("../models/userModel")
const generateJwt = require("../utils/generateJwt")
const getAllUser = asyncHandler(async(req,res)=> {
const users = await User.find({}, {"password":false});
res.json({status: "success", user: {users}})
})

const register = asyncHandler(
    async(req,res,next) => {
        const {firstName, lastName, email, password} = req.body;
        const oldUser = await User.findOne({email:email})
         
        if (oldUser) {
            const error = res.status(400).json({message: "user already exists"})
            return next(error)
        }

const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashedPassword
        })

       const token = await generateJwt({email:newUser.email, id: newUser._id})
        newUser.token = token;
        await newUser.save()
        res.status(201).json({status: "success", user:{newUser}})
    }
)

const login = asyncHandler(
    async(req,res,next) => {
        const {email, password} = req.body;

        if (!email && !password) {
           const error =  res.status(404).json({status:"field", message: "email and password are required"})
            return next(error)
        }

        const user = await User.findOne({email :email})
        if (!user) {
            const error =  res.status(404).json({status:"field", message: "user not found"})
             return next(error)
         }
 const matchPassword = await bcrypt.compare(password, user.password)
 if (user && matchPassword) {
    const token =await generateJwt({email:user.email, id: user._id})
    return res.status(200).json({status:"success", user: {token}})
 } else {
    const error =  res.status(404).json({status:"error", message: "invalid email or password"})
    return next(error)
 }
    }
)


module.exports = {
    getAllUser,
    register,
    login
}