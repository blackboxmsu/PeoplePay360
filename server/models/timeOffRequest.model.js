import mongoose from 'mongoose';

const timeOffRequestSchema = new mongoose.Schema({
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
  type: {
    type: String,
    required: true
  },
  startDate: {
    type: String,
    required: true
  },
  endDate: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true,
    default: 1
  },
  status: {
    type: String,
    enum: ['Approved', 'To Approve', 'Refused'],
    default: 'To Approve'
  },
  approver: {
    type: String,
    default: 'Sara Khan'
  },
  allocationUsed: {
    type: String,
    default: ''
  },
  reason: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const TimeOffRequest = mongoose.model('TimeOffRequest', timeOffRequestSchema);
export default TimeOffRequest;
