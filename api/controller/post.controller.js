import Post from "../model/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  console.log(req.user);
  if (!req.user.isAdmin) {
     return next(errorHandler(403, "You are not allowed to create a post"));
  }
  if (!req.body.title || !req.body.content) {
   return  next(errorHandler(400, "Please provide all required fields"));
  }
  const slug = req.body.title
    .split(' ')
    .join('-')
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, '-')

  const newPost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });

  try {
    const savedpost = await newPost.save();
    res.status(201).json(savedpost);
  } catch (error) {
    next(error);
  }
};


export const getposts=async(req,res,next)=>{
  try{
        const startIndex=parseInt(req.query.startIndex) || 0;
        const limit= parseInt(req.query.limit) || 9;
        const sortDirection= req.query.order === 'asc' ? 1 : -1;
        const posts = await Post.find({
          ...(req.query.userId && {userId: req.query.userId}),
          ...(req.query.category && {category : req.query.category}),
          ...(req.query.slug && {category: req.query.slug}),
          ...(req.query.postId && {_id: req.query.postId}),
          ...(req.query.searchTerm && {
            //  or is applicable on the array and select the document that satisfy at least one of the expression 
            $or:[
              {title: {$regex:req.query.searchTerm,$options:'i'}},
              {content:{$regex:req.query.searchTerm, options:'i'}}
            ]
  
          })
        }).sort({updatedAt:sortDirection}).skip(startIndex).limit(limit)
       
        const totalposts = await Post.countDocuments();

  const now= new Date();

  const oneMonthAgo = new Date(
     now.getFullYear(),
     now.getMonth() - 1 ,
     now.getDate()
  )
   
  const lastMonthPosts= await Post.countDocuments({
    createdAt:{$gte:oneMonthAgo}
  })

  res.status(200).json({
    posts,totalposts,lastMonthPosts
  })
      }
  catch(error)
  {
        next(error)
  }
}