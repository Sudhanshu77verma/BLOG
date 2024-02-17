import express from 'express';
import mongoose from "mongoose"
import dotenv from 'dotenv'
import userRouter from './routes/user.route.js'
import authRouter from './routes/auth.route.js'
dotenv.config();

const app=express();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log(" Mongo db connection is successful")
}).catch((error)=>{
    console.log(error)
})


app.use(express.json())

app.listen(3000,()=>{
    console.log('server is running on port 3000 ')
})




app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);


