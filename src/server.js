const express=require('express');
const connect=require('./config/db');
const {register,login}=require('./controller/auth.controller');
const post=require('./controller/post.controller');
const {body,validationResult}=require('express-validator');
const app=express();
app.use(express.json());
app.use('/post',post)
app.post('/register',body("name").notEmpty().withMessage("First Name is required"),
                     body("email").isEmail().withMessage("Email is not valid"),
                     body("password").notEmpty().withMessage("Please provide Pssword"),register);
app.post('/login',body("email").isEmail().withMessage("Email is not valid"),
                  body("password").notEmpty().withMessage("Please provide Pssword"),login);
const start=async()=>{
await connect();
app.listen(1234,()=>{
    console.log("server is live on port 1234")
})
}
module.exports=start;
