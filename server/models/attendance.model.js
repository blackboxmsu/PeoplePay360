import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true,
    sparse: true
  },
  employeeId: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  checkIn: {
    type: String,
    default: '—'
  },
  checkOut: {
    type: String,
    default: '—'
  },
  workedHours: {
    type: String,
    default: '0.00'
  },
  status: {
    type: String,
    enum: ['Present', 'Late', 'Absent', 'Half Day'],
    default: 'Present'
  },
  department: {
    type: String,
    required: true
  },
  manager: {
    type: String,
    default: ''
  },
  overtime: {
    type: String,
    default: '0.00 hrs'
  },
  notes: {
    type: String,
    default: ''
  },
  isManuallyEdited: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

attendanceSchema.index({ employeeId: 1, date: 1 });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
