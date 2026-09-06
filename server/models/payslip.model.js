import mongoose from 'mongoose';

const payslipLineSchema = new mongoose.Schema({
  code: String,
  name: String,
  category: String,
  amount: Number
}, { _id: false });

const payslipSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true,
    sparse: true
  },
  payrunId: {
    type: String,
    required: true
  },
  payrunName: {
    type: String,
    default: ''
  },
  employeeId: {
    type: String,
    required: true
  },
  employeeName: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  contractWage: {
    type: Number,
    required: true
  },
  workedDays: {
    type: Number,
    default: 22
  },
  basic: {
    type: Number,
    required: true
  },
  gross: {
    type: Number,
    required: true
  },
  net: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['Draft', 'Validated', 'Paid'],
    default: 'Draft'
  },
  warning: {
    type: String,
    default: '—'
  },
  lines: [payslipLineSchema]
}, {
  timestamps: true
});

payslipSchema.index({ payrunId: 1, employeeId: 1 });

const Payslip = mongoose.model('Payslip', payslipSchema);
export default Payslip;
