import mongoose from 'mongoose';

const embeddedSalaryRuleSchema = new mongoose.Schema({
  sequence: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    uppercase: true
  },
  category: {
    type: String,
    enum: ['Basic', 'Allowance', 'Gross', 'Deduction', 'Net'],
    required: true
  },
  computation: {
    type: String,
    enum: ['Percentage of Wage', 'Percentage of Basic', 'Fixed Amount', 'Formula'],
    required: true
  },
  percentage: {
    type: Number,
    default: 0
  },
  fixedAmount: {
    type: Number,
    default: 0
  },
  formula: {
    type: String,
    default: ''
  }
}, { _id: false });

const salaryStructureSchema = new mongoose.Schema({
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
  rulesCount: {
    type: Number,
    default: 0
  },
  employeesCount: {
    type: Number,
    default: 0
  },
  active: {
    type: Boolean,
    default: true
  },
  rules: [embeddedSalaryRuleSchema]
}, {
  timestamps: true
});

const SalaryStructure = mongoose.model('SalaryStructure', salaryStructureSchema);
export default SalaryStructure;
