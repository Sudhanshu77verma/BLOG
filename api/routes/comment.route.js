import  express  from "express";
import { createComment } from "../controller/comment.controller.js";
import { VerifyToken } from "../utils/Verifyuser.js";




const router=express.Router();

router.post('/create',VerifyToken,createComment)

export default router