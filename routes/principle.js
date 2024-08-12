import express from 'express';
import { createClassroom, deleteClassroom, deleteStudent, deleteTeacher, editClassroom, editStudent, editTeacher, getAllClassrooms, getAllStudents, getAllTeachers } from "../controllers/principalController.js";
import { authenticate, authorize } from "../middleware/auth.js";

const principalRoute = express.Router();

// Creating classroom and assigning teacher
principalRoute.post('/classroom',authenticate,authorize(['principal']),createClassroom );
principalRoute.get('/get-classrooms',authenticate,authorize(['principal','teacher']),getAllClassrooms );
principalRoute.delete('/delete-classroom/:id',authenticate,authorize(['principal']),deleteClassroom );
principalRoute.put('/update-classroom/:id',authenticate,authorize(['principal']),editClassroom );
principalRoute.get('/get-teachers',authenticate,authorize(['principal']),getAllTeachers)
principalRoute.delete('/delete-teacher/:id',authenticate,authorize(['principal']),deleteTeacher)
principalRoute.put('/update-teacher/:id',authenticate,authorize(['principal']),editTeacher)
principalRoute.delete('/delete-student/:id',authenticate,authorize(['principal','teacher']),deleteStudent)
principalRoute.put('/update-student/:id',authenticate,authorize(['principal','teacher']),editStudent)
principalRoute.get('/get-students',authenticate,authorize(['principal']),getAllStudents)



export default principalRoute

