import express from 'express';
import postSchema from '../models/postModel.js'
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const router=express.Router();


router.post('/:id',async (req,res)=>{
    try{
        // console.log(req.user.id,req.params.id);
        const data= await postSchema.findOne({id:req.params.id});
        if(!data){
            return res.status(404).json({ message: 'post not found' });
        }
        const addition=data.likes + 1;
        const update=await postSchema.findOneAndUpdate({id:req.params.id},{likes:addition});
        res.sendStatus(200);
        }
        catch(err){
             res.json({message:err});
        }
});

export default router;