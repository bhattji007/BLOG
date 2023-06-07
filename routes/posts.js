import express from 'express';
import postSchema from '../models/postModel.js'
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';


dotenv.config();


const router=express.Router();


router.post('/',async (req,res)=>{
    try{
        console.log(req.body);
        const title=req.body.title;
        const desc=req.body.desc;
        const createdAt= new Date();
        const postId=uuidv4();
        const username=req.user.username;
        const user_id=req.user.id;
        const post=await postSchema.create({id:postId,user_id:user_id,username:username,title:title,description:desc,likes:0,createdAt:createdAt,comments:[]})
        if(!post){
            return res.status(403).json({ message: 'some error happened' });
        }
        const obj={
            id:postId,
            title:title,
            desciption:desc,
            createdAt:createdAt
        }
        res.json(obj);
    }
        catch(err){
             res.json({message:err});
        }
});
router.delete('/:id',async (req,res)=>{
    try{
        console.log(req.params.id);
        const post = await postSchema.findOne({id:req.params.id})
        if(!post){
            return res.status(403).json({ message: 'no such post' });
        }
        if (post.username!=req.user.username){
            return res.status(403).json({ message: 'cannot delete some else post' });
        }
        await postSchema.findOneAndDelete({id:req.params.id});
        res.sendStatus(200);
    }
        catch(err){
             res.json({message:err});
        }
});

router.get('/:id',async (req,res)=>{
    try{
        console.log(req.params.id);
        const post = await postSchema.findOne({id:req.params.id})
        if(!post){
            return res.status(403).json({ message: 'no such post' });
        }
        // if (post.username!=req.user.username){
        //     return res.status(403).json({ message: 'cannot access someone else post' });
        // }
        const obj={
            likes:post.likes,
            comments:post.comments
        }
        res.json(obj);
    }
        catch(err){
             res.json({message:err});
        }
});





export default router;