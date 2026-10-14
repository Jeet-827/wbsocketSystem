import userModel from "../model/user.model.js";
import imagekit from "../config/imagekit.config.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const signup = async(req,res)=>{
    try {
        const {username,email,password} = req.body
        const profile = req.file

        const isEmail = await userModel.findOne({ email })
        if(isEmail){
            return res.status(409).json({message:"user already exist"})
        }

        const image = await imagekit.upload({
            file:profile.buffer,
            fileName:profile.originalname,
            folder:"profile"
        })
        const hash = await bcrypt.hash(password,10) 
        const user = await userModel.create({username,email,password:hash,profile:image.url})
        const accessToken = jwt.sign({id:user._id},process.env.ACCESSTOKENSECRATE,{expiresIn:'7m'})
        const refrshToken = jwt.sign({id:user._id},process.env.REFRESHTOKENSECRATE,{expiresIn:'7d'})
        
        res.cookie('accesstoken',accessToken)
        return res.status(201).json({message:"user created",user})
    } catch (error) {
        return res.status(501).json({message:error.message})
    }
}

export const signin= async(req,res)=>{
    try {
        const {email,password} = req.body
       
        const isEmail = await userModel.findOne({ email })
        if(!isEmail){
            return res.status(404).json({message:"user not exist"})
        }

        const hash = await bcrypt.compare(password,isEmail.password) 
        const accessToken = jwt.sign({id:isEmail._id},process.env.ACCESSTOKENSECRATE,{expiresIn:'7m'})
        const refrshToken = jwt.sign({id:isEmail._id},process.env.REFRESHTOKENSECRATE,{expiresIn:'7d'})
        
        res.cookie('accesstoken',accessToken)
        return res.status(201).json({message:"user created",isEmail})
    } catch (error) {
        return res.status(501).json({message:error.message})
    }
}