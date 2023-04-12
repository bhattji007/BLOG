import mongoose from "mongoose";

const userData=new  mongoose.Schema({
    id:{
        type:String,
        required:true,
        unique:true
    },
    username:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true
    },
    followers:Number,
    following:Number
})
const userSchema=mongoose.model('userData',userData);
export default userSchema