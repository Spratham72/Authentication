const express=require('express');
const User=require('../model/user.model');
const {body,validationResult}=require('express-validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const newToken=(user)=>{
    return jwt.sign({user:user}, process.env.JWT_KEY);
}
const register=async(req,res)=>{
    try {
        const errors=validationResult(req);
                    if(!errors.isEmpty()){
                        return res.status(400).json({ errors: errors.array() });
                    }
        let user=await User.findOne({email:req.body.email});
        if(user){
            res.status(400).json({error:"Email already exist"})
        }
        user=await User.create(req.body);
        const token=newToken(user);
        res.status(201).json({user, token})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
   
    
}
const login=async(req,res)=>{
    try {
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        let user=await User.findOne({email:req.body.email});
        if(!user){
          return res.status(400).json ({status:"failed", message:"Please provide correct email and password"})
        }
        const match=await user.checkPassword(req.body.password);
        if(!match){
            return res.status(400).json ({status:"failed", message:"Please provide correct email and password"})
          }
        const token=newToken(user);
       
        res.status(201).json({user,token})
    } catch (error) {
        return res.status(500).json({status:"failed", message:error.message})
    }
}
module.exports={register,login}