import mongoose from 'mongoose';

const TimetableSchema = new mongoose.Schema({
  classroom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  },
  schedule: [
    {
      day: String,
      time: String,
      subject: String,
    },
  ],
});

const Timetable = mongoose.model('Timetable', TimetableSchema);

export default Timetable