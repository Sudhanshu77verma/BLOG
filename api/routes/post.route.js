import express from "express"
import { VerifyToken } from "../utils/Verifyuser.js";
import { create, deletepost, getposts, updateposts } from "../controller/post.controller.js";




const router=express.Router();

router.post('/create',VerifyToken,create);
router.get('/getposts',getposts);
router.delete('/deletepost/:postId/:userId',VerifyToken,deletepost);
router.put('/updatepost/:postId/:userId', VerifyToken, updateposts);

export default router;
