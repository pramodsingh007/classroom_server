import express from 'express';
import { authenticate, authorize } from '../middleware/auth.js';
import { getClassmates, getClassroom } from '../controllers/studentController.js';

const studentRoute = express.Router();

// Get classroom details
studentRoute.get('/student/:id/classroom',authenticate,authorize(["student"]), getClassroom);
studentRoute.get('/students/:id/classmates',authenticate,authorize(["student"]), getClassmates);

export default studentRoute
