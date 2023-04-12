import express from 'express';
import postSchema from '../models/postModel.js'
import dotenv from 'dotenv';

dotenv.config();


const router=express.Router();


router.get('/',async (req,res)=>{
    try{
        // console.log(req.user.id,req.params.id);
        const data= await postSchema.find({user_id:req.user.id});
        if(!data){
            return res.status(404).json({ message: 'post not found' });
        }
        console.log(data);
        res.json(data);
        }
        catch(err){
             res.json({message:err});
        }
});

export default router;