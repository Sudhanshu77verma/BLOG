import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken"
export const signup=async(req,res,next)=>{
 
  
    
 
    const {email,password,username}=req.body; 
    if(!email || !password || !username || email==='' || password==='' || username==='')
    {
        errorHandler(400,"All Fields are required")
    }

    // hashed password for security purpose 
    const hashedpassword=bcryptjs.hashSync(password,10); 
    // create a new user  

    // we can also use create 


    const newuser=new User({username,email,password:hashedpassword});
   try{
    
    await newuser.save(); 
    res.status(201).json({
      success:"true",
      message:"user created successfully",
    })
      
    

   }

     catch (error) {
         
   next(error)
     }  
}

export const signin=async(req,res,next)=>{
  
  try{
  const {email,password}=req.body;
  if(!email || !password || email===''|| password ==='')
  {
     next(errorHandler(400,"All Fields are required"));
  } 
  const ValidUser=await User.findOne({email});
  if(!ValidUser)
  {
     return next(errorHandler(400,"Invalid username or password"));

  } 

  const Validpassword= bcryptjs.compareSync(password,ValidUser.password);
  if(!Validpassword)
  {
   return next(errorHandler(400,"Invalid Credentials"))
  }
 
  const token=jwt.sign(
{id:ValidUser._id,username:ValidUser},process.env.JWT_SECRET,{expiresIn:"7d"});

   const {password:pass ,...rest }=ValidUser._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true}).json(rest);
  
 
    
  } catch (error) {
      next(error)
  }
}

export const google= async (req,res,next)=>{
  try{
const user= await User.findOne({email:req.body.email});
if(user)
{

  const token = jwt.sign({id:user._id },process.env.JWT_SECRET)
  //removing password 
  const {password:pass,...rest}=user._doc;
  const options={
   httpOnly:true
  };
  res.cookie('access_token', token,options)
  .status(200).json(
   rest
  );
}
else{
       const generatePassword=Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
       const hashedpassword = bcryptjs.hashSync(generatePassword,10);
       const newuser= new User({username:req.body.name.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4)
       ,email:req.body.email,password:hashedpassword,
      avatar:req.body.photo});
      await newuser.save();


      const token = jwt.sign({id:newuser._id },process.env.JWT_SECRET)
      //removing password 
      const {password:pass,...rest}=newuser._doc;
      const options={
       httpOnly:true
      };
      res.cookie('access_token', token,options)
      .status(200).json(
       rest
      );
}
  }catch(error)
  {
    next(error);

  }
}