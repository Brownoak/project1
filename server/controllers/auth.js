import bcrypt from "bcrypt";
import User from "../models/User.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken"


export const register = async(req, res)=>{
    try{
        const errors = validationResult(req);
        const oldUser = await User.findOne({email: req.body.email });
        if (oldUser) {
        return res.json({ 
            status: "err",
            message: "email Exists" });
        }
        if (!errors.isEmpty()) {
            return res.status(400).json({
              status: "error",
              message: errors.array()[0].msg,
            });
          }
        const{
            firstName,
            lastName,
            email,
            password
        }=req.body

        const salt= await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: passwordHash
        });

       
        const savedUser = await newUser.save();
         return res.status(201).json({status: "success", savedUser})

    }catch(err){
        return res.status(500).json({error: err.message})
    }
}


export const login = async(req, res)=>{
    try{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({
            status: "error",
            message: errors.array()[0].msg,
        });
        }
        

        const{
            email,
            password
        }= req.body;

        const user = await User.findOne({email: email});
        
        if(!user) return res.status(400).json({msg: "User does not exist", status: "user_error"});

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(401).json({
                status: "err",
                message: "Invalid email or password"
            })
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
        delete user.password

        return res.status(200).json({status: "success",token, user})
        


    }catch(err){
        return res.status(500).json({error: err.message})
    }
}
