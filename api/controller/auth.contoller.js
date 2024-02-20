import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js";
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


