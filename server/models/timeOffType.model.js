import mongoose from 'mongoose';

const timeOffTypeSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true,
    sparse: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  unit: {
    type: String,
    enum: ['Days', 'Hours'],
    default: 'Days'
  },
  allocation: {
    type: String,
    enum: ['Required', 'No'],
    default: 'Required'
  },
  approval: {
    type: String,
    default: 'Manager'
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active'
  },
  payrollEntry: {
    type: String,
    default: 'Leave Work Entry'
  },
  displayColor: {
    type: String,
    default: 'Green'
  },
  notes: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

const TimeOffType = mongoose.model('TimeOffType', timeOffTypeSchema);
export default TimeOffType;
