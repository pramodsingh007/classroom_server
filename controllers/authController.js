import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secretKey } from "../config/index.js";
import Classroom from "../models/Classroom.js";

export const signup = async (req, res) => {
  const { name, email, password, role, classroom } = req.body;
  // Check if the role is valid
  if (!["principal", "teacher", "student"].includes(role)) {
    return res.status(400).send({ message: "Invalid role" });
  }

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).send({ message: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const foundendClassroom = await Classroom.findOne({ name: classroom });
  if (!foundendClassroom)
    return res.status(404).send({ message: "classroom not founded" });
  // Create a new user
  const user = new User({
    email: email,
    password: hashedPassword,
    role: role,
    name: name,
    classroom: foundendClassroom.id,
    classroomName: foundendClassroom.name,
  });

  try {
    await user.save();
    res.send({ message: "Principle created successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error creating Principle" });
  }
};

export const login = async (req, res) => {
  const { email, password, role } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.status(401).send({ message: "Invalid email or password" });

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword)
    return res.status(401).send({ message: "Invalid email or password" });

  const token = jwt.sign({ _id: user.id, role: user.role }, secretKey, {
    expiresIn: "1h",
  });

  res.send({ token });
};
