import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  initials: {
    type: String,
    default: ''
  },
  jobPosition: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  manager: {
    type: String,
    default: ''
  },
  workingScheduleId: {
    type: String,
    default: 'ws-1'
  },
  workingSchedule: {
    type: String,
    default: 'Standard 40 Hours'
  },
  company: {
    type: String,
    default: 'OxP Pvt Ltd'
  },
  workLocation: {
    type: String,
    default: 'Mumbai'
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Intern'],
    default: 'Full-time'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Onboarding', 'Notice'],
    default: 'Active'
  },
  workEmail: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    default: ''
  },
  contractsCount: {
    type: Number,
    default: 1
  },
  attendanceCount: {
    type: Number,
    default: 0
  },
  timeOffCount: {
    type: Number,
    default: 0
  },
  bankAccount: {
    type: String,
    default: ''
  },
  isBankVerified: {
    type: Boolean,
    default: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);
export default Employee;
