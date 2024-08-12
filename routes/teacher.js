import express from 'express';
import { createTimetable, getClassrooms, getStudents } from '../controllers/teacherController.js';
import { authenticate, authorize } from '../middleware/auth.js';

const teacherRoute = express.Router();

// Create timetable for classroom
teacherRoute.post('/timetable',createTimetable );
teacherRoute.get('/get-students-by-teacher/:id',authenticate,authorize(["teacher"]),getStudents)
teacherRoute.get('/get-classrooms-by-teacher/:id',authenticate,authorize(["teacher"]),getClassrooms)
teacherRoute.post('/classroom/:id/timetable',authenticate,authorize(["teacher"]),createTimetable)

export default teacherRoute;
