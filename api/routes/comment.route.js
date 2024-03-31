import  express  from "express";
import { createComment, getcomment, getpostcomments, likeComment,editComment,deleteComment } from "../controller/comment.controller.js";
import { VerifyToken } from "../utils/verifyUser.js";




const router=express.Router();

router.post('/create',VerifyToken,createComment)
router.get('/getPostComments/:postId', getpostcomments)
router.put('/likeComment/:commentId',VerifyToken,likeComment);
router.put('/editComment/:commentId',VerifyToken,editComment);
router.get('/getcomments',VerifyToken,getcomment)
router.delete('/deleteComment/:commentId',VerifyToken,deleteComment);
export default router