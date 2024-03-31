import express from "express"
import { deleteuser, getuser, getusers, signout, updateUser } from "../controller/user.controller.js";
import { VerifyToken } from "../utils/VerifyUser.js";



const router = express.Router();

router.get('/test',(req,res)=>{
    res.json({message:"Api is Working"})
}
);


router.put('/update/:userId', VerifyToken, updateUser);
router.delete('/delete/:userId',VerifyToken,deleteuser)
router.post('/signout',signout)
router.get('/getusers',VerifyToken,getusers)

router.get('/:userId',getuser)
export default router;






