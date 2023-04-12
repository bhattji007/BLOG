import express from 'express';
import userSchema from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {v4 as uuidv4} from 'uuid';

dotenv.config();


const router=express.Router();

router.post('/authenticate',async (req,res)=>{
    try {
        // Get user input
        const { username, password } = req.body;
    
        // Find user in database
        const user = await userSchema.findOne({ username });
    
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        if (password != user.password) {
          return res.status(401).json({ message: 'Invalid credentials' });
        }
    
        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    
        // Return user data and JWT token
        res.json({ user, token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
});



router.post('/',async (req,res)=>{
    // try{
        console.log(req.body);
        
        const username=req.body.username;
        const password=req.body.password;
        // const Name=req.body.name;
        const Id = uuidv4();
        // const follower=[]
        // const follow=[]
        const update= await userSchema.create({id:Id,username:username,password:password,followers:0,following:0});
        if (update){
        console.log(update);
        res.sendStatus(200);
        }
        else{
            console.log(update);
            res.sendStatus(400);
        }
        // }
        // catch(err){
        //      res.sendStatus(400);
        // }
});



export default router;