import express from 'express';
import mongoose from "mongoose"
import dotenv from 'dotenv'
 
dotenv.config();

const app=express();
 mongoose.connect(process.env.MONGO)
 .then( console.log('db connection is successful'))
 .catch((error)=>{
    console.log(error)
 })



app.listen(()=>{
    console.log('server is running on port 3000 ')
})
