import express from 'express';
import postSchema from '../models/postModel.js'
import {v4 as uuidv4} from 'uuid';
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
        const cmmnt=data.comments;
        const cmntId=uuidv4();
        const updates={
            comment:req.body.comment,
            id:cmntId
        }
        cmmnt.push(updates)
        const update=await postSchema.findOneAndUpdate({id:req.params.id},{comments:cmmnt});
        res.json({commentId:cmntId});
        }
        catch(err){
             res.json({message:err});
        }
});

export default router;