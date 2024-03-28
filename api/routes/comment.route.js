import  express  from "express";
import { createComment, getpostcomments, likeComment,editComment,deleteComment } from "../controller/comment.controller.js";
import { VerifyToken } from "../utils/Verifyuser.js";




const router=express.Router();

router.post('/create',VerifyToken,createComment)
router.get('/getPostComments/:postId', getpostcomments)
router.put('/likeComment/:commentId',VerifyToken,likeComment);
router.put('/editComment/:commentId',VerifyToken,editComment);
router.delete('/deleteComment/:commentId',VerifyToken,deleteComment);
export default router