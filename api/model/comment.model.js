import mongoose from "mongoose";
const commentSchema= new mongoose.Schema({
    content:{
        type:String,
        required:true,
    },
    postId:{
        type:String,
        required:true,
    },
    userId:{
        type:String,
        required:true,
    },
    Likes:{
        type:Array,
        default:[],
    },
    numberOfLikes:{
        type:String,
        default:0,
    },
    
} , {timestamps:true});


const Comment= mongoose.model('Comment',commentSchema);
export default Comment