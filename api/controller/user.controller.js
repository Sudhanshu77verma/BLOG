import bcryptjs from "bcryptjs"
import { errorHandler } from "../utils/error.js"
import User from "../model/user.model.js";
export const updateUser = async (req, res, next) => {
    if (req.user.id !== req.params.userId) {
      return next(errorHandler(403, 'You are not allowed to update this user'));
    }
    if (req.body.password) {
      if (req.body.password.length < 6) {
        return next(errorHandler(400, 'Password must be at least 6 characters'));
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    if (req.body.username) {
      if (req.body.username.length < 7 || req.body.username.length > 20) {
        return next(
          errorHandler(400, 'Username must be between 7 and 20 characters')
        );
      }
      if (req.body.username.includes(' ')) {
        return next(errorHandler(400, 'Username cannot contain spaces'));
      }
      if (req.body.username !== req.body.username.toLowerCase()) {
        return next(errorHandler(400, 'Username must be lowercase'));
      }
      if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
        return next(
          errorHandler(400, 'Username can only contain letters and numbers')
        );
      }
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        {
          $set: {
            username: req.body.username,
            email: req.body.email,
            avatar: req.body.avatar,
            password: req.body.password,
          },
        },
        { new: true }
      );
      const { password, ...rest } = updatedUser._doc;
      res.status(200).json(rest);
    } catch (error) {
      next(error);
    }
  };


  export const deleteuser =async(req,res,next)=>{
    if( !req.user.isAdmin && req.user.id !== req.params.userId)
    {
        next(errorHandler(410,'You are not allowed to delete this account'))
    }
    try{
          await User.findByIdAndDelete(req.params.userId);
          res.status(200).json("User has been deleted");
          
  
    }catch(error)
    {
      next(error)
    }
  }

  export const signout= async(req,res,next)=>{
    try{
         res.clearCookie('access_token').status(200).json("user has been signed out ")
    }
    catch(error)
    {
      next(error)
    }
  }

  export const getusers=async(req,res,next)=>{

    if(!req.user.isAdmin)
    {
      return next(errorHandler(403,"You are not allowed to see all users "))
    }
    try {
          
     const startIndex= parseInt(req.query.startIndex ) || 0;
     const limit= parseInt(req.query.limit)  || 9;
    const sortDirection= req.query.sort === 'asc' ? 1 : -1 ;
    const users= await User.find().sort({createdAt:sortDirection})
    .skip(startIndex)
    .limit(limit)
  
const userWithoutPassword=users.map((user)=>{
  const {password,...rest}=user._doc;
  return rest;
})

 const totalUser= await User.countDocuments()
 const now =new Date()

 const onemonthage = new Date(
  now.getFullYear(),
   now.getMonth() -1,
  now.getDate())


 const lastmonthUser= await User.countDocuments({ createdAt:{$gte: onemonthage}});

    res.status(200).json({
      users:userWithoutPassword,
      totalUser,
      lastmonthUser
    })
    
 }  
    catch (error) {
      console.log(error)
      next(error)
    }
  }

  export const getuser= async(req,res,next)=>{
    try { 
      const user = await User.findById(req.params.userId);
      if(!user)
      {
        return next(errorHandler(404,"User not found"))
      }
      const {password,...rest}= user._doc;
      res.status(200).json(rest)
      
    } catch (error) {
      next(error)
    }
  }