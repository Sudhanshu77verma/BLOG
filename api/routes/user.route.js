import express from "express"
import { updateUser } from "../controller/user.controller.js";
import { VerifyToken } from "../utils/Verifyuser.js";


const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message:"Api is Working"})
}
);


router.put('/update/:userId', VerifyToken, updateUser);




export default router;





