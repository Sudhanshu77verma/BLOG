import Comment from "../model/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const createComment =async(req,res,next)=>{


try {
       
    const {content,postId,userId }= req.body;
    if(req.user.id !== userId)
    {
        return next(errorHandler(403,'You are not allowed to create this comment'))
    }
     
    const newComment= new Comment({
        content,
        userId,
        postId
    });
      
   await newComment.save();
 res.status(200).json(newComment)
} catch (error) {
    next(error)
}

}


export const getpostcomments= async(req,res,next)=>{
    try { 
           
        const comments=await Comment.find({postId:req.params.postId}).sort({
            createdAt:-1
        })

        res.status(200).json(comments)
        
    } catch (error) {
          next(error)
    }
}

export const likeComment = async (req, res, next) => {
    try {
      const comment = await Comment.findById(req.params.commentId);
      if (!comment) {
        return next(errorHandler(404, 'Comment not found'));
      }
      const userIndex = comment.likes.indexOf(req.user.id);
      if (userIndex === -1) {
        comment.numberOfLikes += 1;
        comment.likes.push(req.user.id);
      } else {
        comment.numberOfLikes -= 1;
        comment.likes.splice(userIndex, 1);
      }
      await comment.save();
      res.status(200).json(comment);
    } catch (error) {
      next(error);
    }
  };



  export const editComment= async(req,res,next)=>{
    try{
      const comment= await Comment.findById(req.params.commentId)
      if(!comment)
      {
        return next(errorHandler(403,"Comment not found"))

      }

      if(comment.userId !== req.user.id && !req.user.isAdmin )
      {
        return next(errorHandler(403, "You are not allowed to edit this comment"))
      }

       const editedComment= await Comment.findByIdAndUpdate(req.params.commentId,{
          content:req.body.content,
       }  ,
         {new :true})
   
         res.status(200).json(editedComment)

    
    }
    catch(error)
    {
     next(error)
    }
  }


  export const deleteComment =async(req,res,next)=>{
    try {
          
     const comment = await Comment.findById(req.params.commentId);
       
     if(!comment)
     {
        return next(errorHandler(403,("Comment not Found")))
     }
     if(comment.userId !== req.user.id && !req.user.isAdmin)
     {
        return next(errorHandler(403,"You cannot delete the comment"));

     }

     await Comment.findByIdAndDelete(req.params.commentId)
     
     res.status(200).json("Comment has been deleted ")
    } catch (error) {
        next(error)
    }
  }

  export const getcomment = async(req,res,next)=>{

    if(!req.user.isAdmin){
      return next(errorHandler(403, " You are not allowed to get all the comments "))
    }
    try { 

     const startindex= parseInt(req.query.startindex) || 0;
     const limit=parseInt(req.query.limit)  || 9;
     const sortDirection = req.query.sort === 'desc' ? -1 : 1;
      const comments=await Comment.find()
      .sort({createdAt: sortDirection})
      .skip(startindex)
      .limit(limit)

      const TotalComments =await Comment.countDocuments();
       const now= new Date();
       const OneMonthAgo= new Date(
           now.getFullYear(), now.getMonth()-1,now.getDate()
      );
      const LastMonthComment= await Comment.countDocuments({createdAt:{$gte:OneMonthAgo}});
      res.status(200).json({comments,TotalComments,LastMonthComment})
      
    } catch (error) {
       next(error)
    }

  }