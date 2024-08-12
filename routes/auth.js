import { login, signup } from "../controllers/authController.js";
import express from 'express';

const authRoute = express.Router();

authRoute.post('/signup',signup);
authRoute.post('/login', login);


export default authRoute