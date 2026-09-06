import mongoose from 'mongoose';

const payrunPayslipSummarySchema = new mongoose.Schema({
  id: String,
  employeeId: String,
  employeeName: String,
  department: String,
  contractWage: Number,
  workedDays: Number,
  basic: Number,
  gross: Number,
  net: Number,
  status: {
    type: String,
    enum: ['Draft', 'Validated', 'Paid'],
    default: 'Draft'
  },
  warning: {
    type: String,
    default: '—'
  }
}, { _id: false });

const payrunSchema = new mongoose.Schema({
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
  structure: {
    type: String,
    default: 'Regular Salary'
  },
  periodStart: {
    type: String,
    required: true
  },
  periodEnd: {
    type: String,
    required: true
  },
  employeeCount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Draft', 'Validated', 'Paid'],
    default: 'Draft'
  },
  warningsCount: {
    type: Number,
    default: 0
  },
  payslips: [payrunPayslipSummarySchema]
}, {
  timestamps: true
});

const Payrun = mongoose.model('Payrun', payrunSchema);
export default Payrun;
