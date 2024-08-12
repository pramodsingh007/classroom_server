import express from 'express';
import bodyParser from  'body-parser';
import connectDB from './utils/db.js';
import authRoute from './routes/auth.js';
import principalRoute from './routes/principle.js';
import teacherRoute from './routes/teacher.js';
import studentRoute from './routes/student.js';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
app.use(bodyParser.json());
app.use(cors({credentials:true,origin:process.env.FRONTEND_URL}))

// Connect to MongoDB
connectDB()

//port
const port = process.env.PORT||8000;

app.use('/api',authRoute)
app.use('/api',principalRoute)
app.use('/api',teacherRoute)
app.use('/api',studentRoute)


// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});