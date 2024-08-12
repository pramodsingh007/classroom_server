// middleware/auth.js
import jwt from 'jsonwebtoken';
import { secretKey } from '../config/index.js';

export const authenticate = (req, res, next) => {
  try{
    const token = req.headers["authorization"].split(" ")[1];
    
    console.log(token)
    if (!token) return res.status(401).send({ message: 'No token provided' });
    
    jwt.verify(token, secretKey, (err, decoded) => {
    if (err) return res.status(401).send({ message: 'Invalid token' });
    req.user = decoded;
    next();
  });
}catch(err){
  res.status(401).send({ message: 'No token founded' });
}
};

export const authorize = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.role)) {
      return res.status(403).send({ message: 'Forbidden' });
    }
    next();
  };
};
