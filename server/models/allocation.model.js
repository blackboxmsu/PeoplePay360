import mongoose from 'mongoose';

const deductionLogSchema = new mongoose.Schema({
  requestId: String,
  duration: Number,
  date: String,
  note: String
}, { _id: false });

const allocationSchema = new mongoose.Schema({
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
  allocated: {
    type: Number,
    required: true,
    default: 0
  },
  taken: {
    type: Number,
    default: 0
  },
  remaining: {
    type: Number,
    required: true,
    default: 0
  },
  unit: {
    type: String,
    default: 'Days'
  },
  status: {
    type: String,
    enum: ['Approved', 'To Approve', 'Refused'],
    default: 'Approved'
  },
  validity: {
    type: String,
    default: '2026 Annual Balance'
  },
  approver: {
    type: String,
    default: 'Sara Khan'
  },
  description: {
    type: String,
    default: ''
  },
  deductionLog: [deductionLogSchema]
}, {
  timestamps: true
});

const Allocation = mongoose.model('Allocation', allocationSchema);
export default Allocation;
