import express from 'express';
import userSchema from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const router=express.Router();


router.post('/:id',async (req,res)=>{
    try{
        // console.log(req.user.id,req.params.id);
        const data= await userSchema.findOne({id:req.params.id});
        if(!data){
            return res.status(404).json({ message: 'user not found' });
        }
        const addition=data.followers + 1;
        // console.log(addition);
        const addition2=req.user.following+1;
        const update=await userSchema.findOneAndUpdate({id:req.params.id},{followers:addition});
        const update1=await userSchema.findOneAndUpdate({id:req.user.id},{following:addition2});
        res.sendStatus(200);
        }
        catch(err){
             res.json({message:err});
        }
});

export default router;