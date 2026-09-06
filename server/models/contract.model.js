import mongoose from 'mongoose';

const contractSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true,
    sparse: true
  },
  contractNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  employeeId: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    default: ''
  },
  duration: {
    type: String,
    default: 'Ongoing'
  },
  wage: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Running', 'Expired', 'Draft'],
    default: 'Running'
  },
  department: {
    type: String,
    required: true
  },
  jobPosition: {
    type: String,
    required: true
  },
  workingScheduleId: {
    type: String,
    default: 'ws-1'
  },
  workingSchedule: {
    type: String,
    default: 'Standard 40 Hours'
  },
  structureType: {
    type: String,
    default: 'Regular Salary'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const Contract = mongoose.model('Contract', contractSchema);
export default Contract;
