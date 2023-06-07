import express from 'express';
import userSchema from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import {auth} from 'express-oauth2-jwt-bearer'
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async (req, res, next) => {
  try {
    // Get token from header
    const token1=req.headers.authorization;
    if (!token1) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const token =token1.split(' ')[1];

    // Verify token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Add user data to request object
    const user = await userSchema.findById(decodedToken.id).select('-password');
    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



// export default  checkJwt;