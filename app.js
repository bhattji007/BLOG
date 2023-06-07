import express from 'express';
import user from './routes/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userOps from'./routes/userOps.js'
import userOps2 from'./routes/userOps2.js'
import posts from'./routes/posts.js'
import postOps from './routes/postOps.js'
import postOps1 from './routes/postOps1.js'
import postOps2 from './routes/postOps2.js'
import postOps3 from './routes/postOps3.js'
import userSchema from './models/userModel.js';
import checkJwt from './middleware/middleware.js'

dotenv.config();


mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Blog'
  }).then(()=>{
    console.log("connected to mongoDb")
}).catch(err => console.log(err))


const app=express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

app.use('/api',user);
app.use('/api/follow',checkJwt,userOps);
app.use('/api/unfollow',checkJwt,userOps2);
app.get('/api/user',checkJwt,async(req,res)=>{res.json(req.user)});
// app.use('/api/posts',verifyToken,posts);
// app.use('/api/like',verifyToken,postOps);
// app.use('/api/unlike',verifyToken,postOps1);
// app.use('/api/comment',verifyToken,postOps2);
// app.use('/api/all_posts',verifyToken,postOps3);
app.get('/api/userdata',checkJwt,async(req,res)=>{
  const data = await userSchema.find({});
  res.json(data)})
app.listen(3000,()=>{console.log("server is up and running")});