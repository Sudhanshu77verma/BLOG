import express from 'express';
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
import cookieParser from 'cookie-parser';
import PostRouter from './routes/post.route.js'
import commentRouter from './routes/comment.route.js'
import path from 'path'


dotenv.config();

const app=express();


mongoose.connect(process.env.MONGO,{
    useNewUrlParser: true,
    useUnifiedTopology:true,

}).then(()=>{
    console.log(" Mongo db connection is successful")
}).catch((error)=>{
    console.log(error)
})
const __dirname= path.resolve()



app.use(cookieParser())
app.use(express.json())

app.listen(3000,()=>{
    console.log('server is running on port 3000 ')
})



app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/post',PostRouter)
app.use('/api/comment',commentRouter);
   
 
app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
 

app.use((error,req,res,next)=>{
    const statuscode= error.statuscode || 500;
    const message=error.message || "Internal Server Error";
    return res.status(statuscode).json({
        success:false,
        statuscode,
        message,
    })
})