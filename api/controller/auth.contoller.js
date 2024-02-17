import User from "../model/user.model.js";
import bcryptjs from "bcryptjs"
export const signup=async(req,res)=>{
      
    
 
    const {email,password,username}=req.body; 

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
         
    res.status(500).json({
        message:error.message,
    })
     }  
}


