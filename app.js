import express from 'express';
import user from './routes/user.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import userOps from'./routes/userOps.js'
import userOps2 from'./routes/userOps2.js'
import {auth} from 'express-oauth2-jwt-bearer'
import { getAuthorizationUrl, getCalender,getEvents,getGsuiteToken } from './routes/google.js';
import jwks from 'jwks-rsa'
import posts from'./routes/posts.js'
import postOps from './routes/postOps.js'
import postOps1 from './routes/postOps1.js'
import postOps2 from './routes/postOps2.js'
import postOps3 from './routes/postOps3.js'
import userSchema from './models/userModel.js';
// import checkJwt from './middleware/middleware.js'
import cors from 'cors'
import { expressjwt } from 'express-jwt'


dotenv.config();
const checkJwt = auth({
  audience: 'https://dev-yipr7szg0njkh7iw.us.auth0.com/api/v2/',
  issuerBaseURL: 'https://dev-yipr7szg0njkh7iw.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// const checkJwt = expressjwt({
//   secret: jwks.expressJwtSecret({
//     cache: true,
//     rateLimit: true,
//     jwksRequestsPerMinute: 5,
//     jwksUri: 'https://dev-yipr7szg0njkh7iw.us.auth0.com/.well-known/jwks.json'
//   }),
//   aud: 'https://auth0-demo.com/api/v2/',
//   issuer: 'dev-yipr7szg0njkh7iw.us.auth0.com/',
//   algorithms: ['RS256']
// })

const clientId=`831992996968-cifgn7ptbn6r3637p7pd5i0p3i8qssop.apps.googleusercontent.com`
const clientSecret=`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`

const cors_config = {
  origin: ['http://127.0.0.1:5173', 'http://localhost:3000', 'http://127.0.0.1:3000', 'https://saasden.club','https://auth0-demo-six.vercel.app/','https://blog-fe0k.onrender.com'],
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true
}

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
app.use(cors(cors_config))
// app.use('/api/posts',verifyToken,posts);
// app.use('/api/like',verifyToken,postOps);
// app.use('/api/unlike',verifyToken,postOps1);
// app.use('/api/comment',verifyToken,postOps2);
// app.use('/api/all_posts',verifyToken,postOps3);
app.get('/api/userdata',checkJwt,async(req,res)=>{
  const data = await userSchema.find({});
  res.json(data)})

app.get('/rest/v1/calendar/init/',checkJwt, async (req, res) => {
    const url= await getAuthorizationUrl(clientId,clientSecret);
     res.redirect(url);
 });
app.get('/rest/v1/calendar/redirect/',checkJwt, async (req, res) => {
     const code=req.query.code;
     console.log(code);
     const token= await getGsuiteToken(code,clientId,clientSecret);
     const calender= await getCalender(token);
     const Id=calender.items[0].id;
     const events=await getEvents(token,Id)
      res.json(events);
  });
app.listen(3000,()=>{console.log("server is up and running")});