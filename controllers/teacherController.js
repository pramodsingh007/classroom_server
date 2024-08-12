import Classroom from "../models/Classroom.js";
import { User } from "../models/User.js";
import { convertTimeToMinutes } from "../utils/time.js";

export const getStudents = async (req, res) => {
  try {
    
    const teacherId = req.params.id;
    const foundedTeacher = await User.findById(teacherId);
    if (!foundedTeacher) {
      return res.status(404).send("No teacher found");
    }

    const students = await User.find({ classroomName: foundedTeacher.classroomName ,role:'student'});

    res.status(200).send(students);
  } catch (error) {
    res.status(500).send("Server error");
  }
};



export const getClassrooms = async (req, res) => {
  try {
    const teacherId = req.params.id;
    const foundedTeacher = await User.findById(teacherId);
    if (!foundedTeacher) {
      return res.status(404).send("No teacher found");
    }

    const classroom = await Classroom.find({_id:foundedTeacher.classroom});

    res.status(200).send(classroom);
  } catch (error) {
    res.status(500).send("Server error");
  }
};


export const createTimetable = async (req, res) => {
  try {
    const { id } = req.params;
    const classroomId = id
    const { subject, timeStart, timeEnd, day } = req.body;

    // Validation (can be extended as needed)
    if (!subject || !timeStart || !timeEnd || !day) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Find the classroom by ID
    const classroom = await Classroom.findById(classroomId);

    if (!classroom) {
      return res.status(404).json({ message: 'Classroom not found' });
    }


     // Convert classroom times and timetable times to minutes for comparison
     const classStartTime = convertTimeToMinutes(classroom.startTime);
     const classEndTime = convertTimeToMinutes(classroom.endTime);
     const timetableStartTime = convertTimeToMinutes(timeStart);
     const timetableEndTime = convertTimeToMinutes(timeEnd);
 
     // Validate that the timetable times are within the classroom times
     if (timetableStartTime < classStartTime || timetableEndTime > classEndTime) {
       return res.status(400).json({ 
         message: `Timetable times must be between ${classroom.startTime} and ${classroom.endTime}` 
       });
     }

    // Add the new timetable entry to the schedule array
    classroom.schedule.push({
      subject,
      timeStart,
      timeEnd,
      day,
    });

    // Save the updated classroom
    await classroom.save();

    // Send a success response
    res.status(201).json({ message: 'Timetable added successfully', classroom });
  } catch (error) {
    console.error('Error adding timetable:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}