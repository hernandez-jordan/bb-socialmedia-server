import pkg from 'apollo-server';
const { AuthenticationError } = pkg;
import jwt from "jsonwebtoken";
import {SK} from "../config.js"

export const checkAuth = context => {
  
  const authHeader = context.req.headers.authorization;
  if(authHeader){
    const token = authHeader.split('Bearer ')[1];
    
    if(token){
      try{
        const user = jwt.verify(token, SK.SECRET_KEY);
        return user;
      } catch(err){
          throw new AuthenticationError('Invalid/Expired token')
      }
    }
    throw new Error('Authentication token must be \'Bearer [token]' )
  }
  throw new Error('Authorization header must be provided' )
};
