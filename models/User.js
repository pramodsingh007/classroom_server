import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["principal", "teacher", "student"],
    required: true,
  },
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Classroom"
  },
  classroomName: {
    type: String,
  },
});

export const User = mongoose.model("User", userSchema);
