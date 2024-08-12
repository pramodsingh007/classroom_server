import Classroom from "../models/Classroom.js";
import Timetable from "../models/Timetable.js";
import { User } from "../models/User.js";




export const assignClassRoomAndTeacher = async (req, res) => {
    try {
      const { studentId, classroomId } = req.body;
  
      let classroom = await Classroom.findById(classroomId);
      if (!classroom) {
        return res.status(400).json({ msg: 'Invalid classroom ID' });
      }
  
      let student = await User.findById(studentId);
      if (!student || student.role !== 'student') {
        return res.status(400).json({ msg: 'Invalid student ID' });
      }
  
      classroom.students.push(studentId);
      student.classroom = classroomId;
  
      await classroom.save();
      await student.save();
  
      res.json({ msg: 'Student assigned to classroom' });
    } catch (err) {
      res.status(500).json({ msg: 'Internal server error' });
    }
  }





export const getClassroomDetails = async (req, res) => {
    try {
      const student = req.user;
  
      let classroom = await Classroom.findById(student.classroom).populate('teacher students');
  
      if (!classroom) {
        return res.status(400).json({ msg: 'No classroom found' });
      }
  
      res.json(classroom);
    } catch (err) {
      res.status(500).json({ msg: 'Internal Server error' });
    }
  }