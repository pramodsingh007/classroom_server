import mongoose from "mongoose";

const ClassroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  teacherName: {
    type: String,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  schedule: [
    {
      subject: String,
      timeStart: String,
      timeEnd: String,
      day: String,
    },
  ],
});

const Classroom = mongoose.model("Classroom", ClassroomSchema);

export default Classroom;
