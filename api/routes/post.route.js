import express from "express"
import { VerifyToken } from "../utils/Verifyuser.js";
import { create, deletepost, getposts } from "../controller/post.controller.js";


const router=express.Router();

router.post('/create',VerifyToken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId/:userId',VerifyToken,deletepost)
export default router;
