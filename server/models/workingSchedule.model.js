import mongoose from 'mongoose';

const dayScheduleSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    required: true
  },
  active: {
    type: Boolean,
    default: true
  },
  startTime: {
    type: String,
    default: '09:00'
  },
  endTime: {
    type: String,
    default: '18:00'
  },
  breakHours: {
    type: Number,
    default: 1.0
  }
}, { _id: false });

const workingScheduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  calendarType: {
    type: String,
    default: 'Standard 5-Day'
  },
  company: {
    type: String,
    default: 'OxP Pvt Ltd'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  weeklyHours: {
    type: Number,
    required: true,
    default: 40.0
  },
  daysPerWeek: {
    type: Number,
    default: 5
  },
  notes: {
    type: String,
    default: ''
  },
  days: [dayScheduleSchema]
}, {
  timestamps: true
});

const WorkingSchedule = mongoose.model('WorkingSchedule', workingScheduleSchema);
export default WorkingSchedule;
