import Classroom from "../models/Classroom.js";
import { User } from "../models/User.js";

export const getClassmates = async (req, res) => {
  try {
    const { id } = req.params;
    const studentId = id;

    // Find the student by ID
    const student = await User.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Find the classroom the student is associated with
    const classmates = await User.find({
      classroomName: student.classroomName,
      role: "student",
    }).select("-password -role -classroom");

    res
      .status(200)
      .json({
        classmates: classmates.filter((c) => c.email !== student.email),
      });
  } catch (error) {
    console.error("Error getting classmates:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getClassroom = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the user by ID and populate the students
    const user = await User.findById(id)

    if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
    const classroom  = await Classroom.findOne({name:user.classroomName})
    if (!classroom) {
      return res.status(404).json({ message: "Classroom not found" });
    }

    res.status(200).send(classroom);
  } catch (error) {
    console.error("Error fetching classroom:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
