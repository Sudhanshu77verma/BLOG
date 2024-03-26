import  express  from "express";
import { createComment, getpostcomments } from "../controller/comment.controller.js";
import { VerifyToken } from "../utils/Verifyuser.js";




const router=express.Router();

router.post('/create',VerifyToken,createComment)
router.get('/getPostComments/:postId', getpostcomments)
export default router