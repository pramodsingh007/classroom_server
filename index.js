import express from 'express';
import bodyParser from  'body-parser';
import connectDB from './utils/db.js';
import authRoute from './routes/auth.js';
import principalRoute from './routes/principle.js';
import teacherRoute from './routes/teacher.js';
import studentRoute from './routes/student.js';
import cors from 'cors';

const app = express();
app.use(bodyParser.json());
app.use(cors({credentials:true,origin:"http://localhost:5173"}))

// Connect to MongoDB
connectDB()

//port
const port = 8000;

app.use('/api',authRoute)
app.use('/api',principalRoute)
app.use('/api',teacherRoute)
app.use('/api',studentRoute)


// Start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});