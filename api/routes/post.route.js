import express from "express"
import { VerifyToken } from "../utils/Verifyuser.js";
import { create } from "../controller/post.controller.js";


const router=express.Router();

router.post('/create',VerifyToken,create);

export default router;
