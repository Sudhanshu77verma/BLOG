import express from "express"
import { deleteuser, getusers, signout, updateUser } from "../controller/user.controller.js";
import { VerifyToken } from "../utils/Verifyuser.js";



const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message:"Api is Working"})
}
);


router.put('/update/:userId', VerifyToken, updateUser);
router.delete('/delete/:userId',VerifyToken,deleteuser)
router.post('/signout',signout)
router.get('/getusers',VerifyToken,getusers)
export default router;






