import Classroom from "../models/Classroom.js";
import { User } from "../models/User.js";

export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" });
    res.status(200).json(teachers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const deletedTeacher = await User.findByIdAndDelete(teacherId);

    if (!deletedTeacher) {
      return res.status(404).send("Teacher not found");
    }

    res.status(200).send({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const editTeacher = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const updatedTeacher = await User.findByIdAndUpdate(
      teacherId,
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedTeacher) {
      return res.status(404).send("Teacher not found");
    }

    res.status(200).send(updatedTeacher);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
export const deleteStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const deletedStudent = await User.findByIdAndDelete(studentId);

    if (!deletedStudent) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const editStudent = async (req, res) => {
  try {
    const studentId = req.params.id;

    const updatedStudent = await User.findByIdAndUpdate(
      studentId,
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedStudent) {
      return res.status(404).send("Student not found");
    }

    res.status(200).send(updatedStudent);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" });
    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const createClassroom = async (req, res) => {
  try {
    const { name, startTime, endTime, schedule,day } = req.body;

    // Validation (this can be extended as needed)
    if (!name  || !startTime || !endTime) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new classroom instance
    const newClassroom = new Classroom({
      name,
      startTime,
      endTime,
      schedule,
      day
    });

    // Save the classroom to the database
    await newClassroom.save();

    // Send a success response
    res.status(201).json({
      message: "Classroom created successfully",
      classroom: newClassroom,
    });
  } catch (error) {
    console.error("Error creating classroom:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllClassrooms = async (req, res) => {
  try {
    const classrooms = await Classroom.find({});
    res.status(200).json(classrooms);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteClassroom = async (req, res) => {
  try {
    const classroomId = req.params.id;

    const deletedClassroom = await Classroom.findByIdAndDelete(classroomId);

    if (!deletedClassroom) {
      return res.status(404).send("Classroom not found");
    }

    res.status(200).send({ message: "Classroom deleted successfully" });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const editClassroom = async (req, res) => {
  try {
    const classroomId = req.params.id;

    const updatedClassroom = await Classroom.findByIdAndUpdate(
      classroomId,
      req.body,
      { new: true, runValidators: true } // `new: true` returns the updated document
    );

    if (!updatedClassroom) {
      return res.status(404).send("Classroom not found");
    }

    res.status(200).send(updatedClassroom);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
