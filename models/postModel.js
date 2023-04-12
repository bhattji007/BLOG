import mongoose from "mongoose";

const postData=new  mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    user_id:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true,
    },
    title:{
        type:String,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    likes:Number,
    createdAt:String,
    comments:[{
        comment:String,
        id:String
    }]
})
const postSchema=mongoose.model('podtData',postData);
export default postSchema