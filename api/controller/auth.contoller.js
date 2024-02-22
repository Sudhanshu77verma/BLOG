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

export const google= async(req,res,next)=>{
  const {name,email,googlePhotoUrl}=req.body;
  try {
        const user=await User.findOne({email});
        if(user)
        {
          const token= jwt.sign({id:user._id}, process.env.JWT_SECRET);
          const {password,...rest}=user._doc;
           res.status(200).cookie('access_token',token,{httpOnly:true})
           .json(rest);
        }

        else{
          const generatedPassword=Math.random().toString(36).slice(-8);
          const hashedpassword=bcryptjs.hashSync(generatedPassword,10);
          const newUser=new User({
            username:name.toLowerCase.split('')+Math.random().toString(9).slice(-4),
            
            email,
            password:hashedpassword,
             profilePic:googlePhotoUrl
          })

          await newUser.save();
          const token=jwt.sign({id:newUser._id},process.env.JWT_SECRET);
          const {password,...rest}=newUser._doc;
          res.status(200).cookie("access_token",token,{httpOnly:true}).json(rest);
        }


  } catch (error) {
     next(error);

  } 
}
