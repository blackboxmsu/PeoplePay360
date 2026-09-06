import mongoose from 'mongoose';

const salaryRuleSchema = new mongoose.Schema({
  customId: {
    type: String,
    unique: true,
    sparse: true
  },
  structureId: {
    type: String,
    required: true
  },
  structureName: {
    type: String,
    required: true
  },
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
}, {
  timestamps: true
});

const SalaryRule = mongoose.model('SalaryRule', salaryRuleSchema);
export default SalaryRule;
