const Post=require('../model/post.model');
const authenticate=require('../middleware/authenticate/authenticate')
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();
router.post('/',authenticate,async(req,res)=>{
    try {
        const user=req.user;
        const post= await Post.create({
            title:req.body.title,
            body:req.body.body,
            user:user.user._id
        })
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({error:error.message})
    }
})
router.get('/',authenticate,async(req,res)=>{
    try {
        const user=req.user;
        const item=await Post.find({user:user.user._id});
        res.status(201).json({item});
    } catch (error) {
        res.status(500).json({error:error.message})
    }
    
})
module.exports=router;
