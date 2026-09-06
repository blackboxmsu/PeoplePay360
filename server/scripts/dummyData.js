// PeoplePay360 Master Comprehensive Dummy Dataset (50 records per primary schema)

export const SEED_DEPARTMENTS = [
  { id: 'dept-1', name: 'Finance & Payroll', code: 'FIN', description: 'Financial planning, payroll execution, and statutory compliance', managerName: 'Aarav Mehta', active: true },
  { id: 'dept-2', name: 'Human Resources', code: 'HR', description: 'People operations, recruitment, talent management and culture', managerName: 'Sara Khan', active: true },
  { id: 'dept-3', name: 'Engineering', code: 'ENG', description: 'Core software engineering, platform architecture, and DevOps', managerName: 'Rahul Dravid', active: true },
  { id: 'dept-4', name: 'Product Management', code: 'PROD', description: 'Product roadmap, feature prioritization, UX design and research', managerName: 'Priya Sharma', active: true },
  { id: 'dept-5', name: 'Sales & Business Dev', code: 'SALES', description: 'Enterprise sales, client acquisition, and partnerships', managerName: 'Rajesh Nair', active: true },
  { id: 'dept-6', name: 'Marketing & Growth', code: 'MKT', description: 'Brand marketing, digital campaigns, content, and events', managerName: 'Sneha Joshi', active: true },
  { id: 'dept-7', name: 'Customer Success', code: 'CS', description: 'Client onboarding, technical support, and account retention', managerName: 'Kabir Deshmukh', active: true },
  { id: 'dept-8', name: 'Operations & Admin', code: 'OPS', description: 'Office management, IT facilities, procurement, and vendor relations', managerName: 'Devendra Rao', active: true },
  { id: 'dept-9', name: 'Quality Assurance', code: 'QA', description: 'Software quality engineering, automated testing, and release audits', managerName: 'Tanvi Kulkarni', active: true },
  { id: 'dept-10', name: 'Legal & Compliance', code: 'LEGAL', description: 'Regulatory governance, employment law, and corporate contracts', managerName: 'Riya Sengupta', active: true }
];

export const SEED_WORKING_SCHEDULES = [
  {
    id: 'ws-1',
    name: 'Standard 40 Hours',
    calendarType: 'Standard 5-Day',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 40.0,
    daysPerWeek: 5,
    notes: 'Standard corporate 8-hour workday with 1-hour lunch break.',
    days: [
      { day: 'Monday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Tuesday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Wednesday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Thursday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Friday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Saturday', active: false, startTime: '09:00', endTime: '14:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  },
  {
    id: 'ws-2',
    name: 'Tech Flexible 35 Hours',
    calendarType: 'Flexible',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 35.0,
    daysPerWeek: 5,
    notes: 'Engineering flexible schedule: 7 hours/day core window.',
    days: [
      { day: 'Monday', active: true, startTime: '10:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Tuesday', active: true, startTime: '10:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Wednesday', active: true, startTime: '10:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Thursday', active: true, startTime: '10:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Friday', active: true, startTime: '10:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Saturday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  },
  {
    id: 'ws-3',
    name: 'Part-Time 20 Hours',
    calendarType: 'Part-Time',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 20.0,
    daysPerWeek: 5,
    notes: 'Morning shift 4 hours/day for part-time specialists.',
    days: [
      { day: 'Monday', active: true, startTime: '09:00', endTime: '13:00', breakHours: 0.0 },
      { day: 'Tuesday', active: true, startTime: '09:00', endTime: '13:00', breakHours: 0.0 },
      { day: 'Wednesday', active: true, startTime: '09:00', endTime: '13:00', breakHours: 0.0 },
      { day: 'Thursday', active: true, startTime: '09:00', endTime: '13:00', breakHours: 0.0 },
      { day: 'Friday', active: true, startTime: '09:00', endTime: '13:00', breakHours: 0.0 },
      { day: 'Saturday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  },
  {
    id: 'ws-4',
    name: 'Extended Support 45 Hours',
    calendarType: 'Support Shift',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 45.0,
    daysPerWeek: 5,
    notes: 'Customer support schedule covering 9 hours daily.',
    days: [
      { day: 'Monday', active: true, startTime: '08:30', endTime: '18:30', breakHours: 1.0 },
      { day: 'Tuesday', active: true, startTime: '08:30', endTime: '18:30', breakHours: 1.0 },
      { day: 'Wednesday', active: true, startTime: '08:30', endTime: '18:30', breakHours: 1.0 },
      { day: 'Thursday', active: true, startTime: '08:30', endTime: '18:30', breakHours: 1.0 },
      { day: 'Friday', active: true, startTime: '08:30', endTime: '18:30', breakHours: 1.0 },
      { day: 'Saturday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  },
  {
    id: 'ws-5',
    name: 'Weekend Shift 36 Hours',
    calendarType: 'Shift Rotation',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 36.0,
    daysPerWeek: 3,
    notes: 'Friday through Sunday 12-hour coverage with 1-hour meal break.',
    days: [
      { day: 'Monday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Tuesday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Wednesday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Thursday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Friday', active: true, startTime: '08:00', endTime: '21:00', breakHours: 1.0 },
      { day: 'Saturday', active: true, startTime: '08:00', endTime: '21:00', breakHours: 1.0 },
      { day: 'Sunday', active: true, startTime: '08:00', endTime: '21:00', breakHours: 1.0 }
    ]
  },
  {
    id: 'ws-6',
    name: 'Night Operations 40 Hours',
    calendarType: 'Night Shift',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 40.0,
    daysPerWeek: 5,
    notes: 'Overnight systems monitoring shift 21:00 to 06:00.',
    days: [
      { day: 'Monday', active: true, startTime: '21:00', endTime: '06:00', breakHours: 1.0 },
      { day: 'Tuesday', active: true, startTime: '21:00', endTime: '06:00', breakHours: 1.0 },
      { day: 'Wednesday', active: true, startTime: '21:00', endTime: '06:00', breakHours: 1.0 },
      { day: 'Thursday', active: true, startTime: '21:00', endTime: '06:00', breakHours: 1.0 },
      { day: 'Friday', active: true, startTime: '21:00', endTime: '06:00', breakHours: 1.0 },
      { day: 'Saturday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  },
  {
    id: 'ws-7',
    name: 'DevOps 24x7 Rota',
    calendarType: 'Rotation',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 40.0,
    daysPerWeek: 5,
    notes: 'Site reliability engineering on-call rotation.',
    days: [
      { day: 'Monday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Tuesday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Wednesday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Thursday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Friday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
      { day: 'Saturday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  },
  {
    id: 'ws-8',
    name: 'Consulting Flexible 30 Hours',
    calendarType: 'Flexible 4-Day',
    company: 'OxP Pvt Ltd',
    status: 'Active',
    weeklyHours: 30.0,
    daysPerWeek: 4,
    notes: 'Four-day compact working week for advisors and consultants.',
    days: [
      { day: 'Monday', active: true, startTime: '09:30', endTime: '18:00', breakHours: 1.0 },
      { day: 'Tuesday', active: true, startTime: '09:30', endTime: '18:00', breakHours: 1.0 },
      { day: 'Wednesday', active: true, startTime: '09:30', endTime: '18:00', breakHours: 1.0 },
      { day: 'Thursday', active: true, startTime: '09:30', endTime: '18:00', breakHours: 1.0 },
      { day: 'Friday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Saturday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 },
      { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
    ]
  }
];

export const SEED_TIMEOFF_TYPES = [
  { id: 'tot-1', name: 'Paid Time Off', unit: 'Days', allocation: 'Required', approval: 'Manager', status: 'Active', payrollEntry: 'Leave Work Entry', displayColor: 'Green', notes: 'Standard annual paid leave with allocation grant.' },
  { id: 'tot-2', name: 'Sick Leave', unit: 'Days', allocation: 'No', approval: 'Manager', status: 'Active', payrollEntry: 'Leave Work Entry', displayColor: 'Amber', notes: 'Medical emergency leave approved directly by manager.' },
  { id: 'tot-3', name: 'Comp Off', unit: 'Hours', allocation: 'Required', approval: 'Officer', status: 'Active', payrollEntry: 'Compensatory Overtime', displayColor: 'Blue', notes: 'Granted for weekend deployment or emergency coverage.' },
  { id: 'tot-4', name: 'Casual Leave', unit: 'Days', allocation: 'Required', approval: 'Manager', status: 'Active', payrollEntry: 'Leave Work Entry', displayColor: 'Purple', notes: 'Short-notice personal affairs leave.' },
  { id: 'tot-5', name: 'Maternity / Paternity Leave', unit: 'Days', allocation: 'Required', approval: 'HR', status: 'Active', payrollEntry: 'Parental Leave', displayColor: 'Green', notes: 'Statutory parental leave with HR verification.' },
  { id: 'tot-6', name: 'Bereavement Leave', unit: 'Days', allocation: 'No', approval: 'Manager', status: 'Active', payrollEntry: 'Leave Work Entry', displayColor: 'Amber', notes: 'Compassionate leave for family loss.' },
  { id: 'tot-7', name: 'Sabbatical / Unpaid Leave', unit: 'Days', allocation: 'Required', approval: 'HR', status: 'Active', payrollEntry: 'Unpaid Leave Entry', displayColor: 'Red', notes: 'Long-term unpaid career break approved by executive HR.' }
];

export const SEED_SALARY_STRUCTURES = [
  {
    id: 'str-1',
    name: 'Regular Salary',
    rulesCount: 7,
    employeesCount: 22,
    active: true,
    rules: [
      { sequence: 1, name: 'Basic Salary', code: 'BASIC', category: 'Basic', computation: 'Percentage of Wage', percentage: 50, fixedAmount: 0, formula: 'WAGE * 0.50' },
      { sequence: 10, name: 'House Rent Allowance', code: 'HRA', category: 'Allowance', computation: 'Percentage of Basic', percentage: 40, fixedAmount: 0, formula: 'BASIC * 0.40' },
      { sequence: 20, name: 'Standard Allowance', code: 'STD', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 10000, formula: '10000' },
      { sequence: 60, name: 'Gross Salary', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'BASIC + HRA + STD' },
      { sequence: 80, name: 'Provident Fund', code: 'PF', category: 'Deduction', computation: 'Percentage of Basic', percentage: 12, fixedAmount: 0, formula: 'BASIC * 0.12' },
      { sequence: 100, name: 'Professional Tax', code: 'PT', category: 'Deduction', computation: 'Fixed Amount', percentage: 0, fixedAmount: 3000, formula: '3000' },
      { sequence: 110, name: 'Net Salary', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS - PF - PT' }
    ]
  },
  {
    id: 'str-2',
    name: 'Tech Specialist',
    rulesCount: 8,
    employeesCount: 12,
    active: true,
    rules: [
      { sequence: 1, name: 'Basic Salary', code: 'BASIC', category: 'Basic', computation: 'Percentage of Wage', percentage: 55, fixedAmount: 0, formula: 'WAGE * 0.55' },
      { sequence: 10, name: 'House Rent Allowance', code: 'HRA', category: 'Allowance', computation: 'Percentage of Basic', percentage: 40, fixedAmount: 0, formula: 'BASIC * 0.40' },
      { sequence: 20, name: 'Tech & R&D Allowance', code: 'TECH', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 15000, formula: '15000' },
      { sequence: 30, name: 'Special Allowance', code: 'SPL', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 8000, formula: '8000' },
      { sequence: 60, name: 'Gross Salary', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'BASIC + HRA + TECH + SPL' },
      { sequence: 80, name: 'Provident Fund', code: 'PF', category: 'Deduction', computation: 'Percentage of Basic', percentage: 12, fixedAmount: 0, formula: 'BASIC * 0.12' },
      { sequence: 100, name: 'Professional Tax', code: 'PT', category: 'Deduction', computation: 'Fixed Amount', percentage: 0, fixedAmount: 3000, formula: '3000' },
      { sequence: 110, name: 'Net Salary', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS - PF - PT' }
    ]
  },
  {
    id: 'str-3',
    name: 'Executive Leadership',
    rulesCount: 8,
    employeesCount: 5,
    active: true,
    rules: [
      { sequence: 1, name: 'Basic Salary', code: 'BASIC', category: 'Basic', computation: 'Percentage of Wage', percentage: 50, fixedAmount: 0, formula: 'WAGE * 0.50' },
      { sequence: 10, name: 'House Rent Allowance', code: 'HRA', category: 'Allowance', computation: 'Percentage of Basic', percentage: 50, fixedAmount: 0, formula: 'BASIC * 0.50' },
      { sequence: 20, name: 'Executive Perk', code: 'EXEC', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 30000, formula: '30000' },
      { sequence: 30, name: 'Car & Travel Allowance', code: 'CAR', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 15000, formula: '15000' },
      { sequence: 60, name: 'Gross Salary', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'BASIC + HRA + EXEC + CAR' },
      { sequence: 80, name: 'Provident Fund', code: 'PF', category: 'Deduction', computation: 'Percentage of Basic', percentage: 12, fixedAmount: 0, formula: 'BASIC * 0.12' },
      { sequence: 100, name: 'Professional Tax', code: 'PT', category: 'Deduction', computation: 'Fixed Amount', percentage: 0, fixedAmount: 3000, formula: '3000' },
      { sequence: 110, name: 'Net Salary', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS - PF - PT' }
    ]
  },
  {
    id: 'str-4',
    name: 'Contractor Fixed',
    rulesCount: 3,
    employeesCount: 4,
    active: true,
    rules: [
      { sequence: 1, name: 'Fixed Retainer', code: 'RETAINER', category: 'Basic', computation: 'Percentage of Wage', percentage: 100, fixedAmount: 0, formula: 'WAGE * 1.00' },
      { sequence: 10, name: 'TDS Deduction (10%)', code: 'TDS', category: 'Deduction', computation: 'Percentage of Wage', percentage: 10, fixedAmount: 0, formula: 'RETAINER * 0.10' },
      { sequence: 20, name: 'Net Payout', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'RETAINER - TDS' }
    ]
  },
  {
    id: 'str-5',
    name: 'Intern Salary',
    rulesCount: 4,
    employeesCount: 3,
    active: true,
    rules: [
      { sequence: 1, name: 'Stipend Base', code: 'STIPEND', category: 'Basic', computation: 'Percentage of Wage', percentage: 80, fixedAmount: 0, formula: 'WAGE * 0.80' },
      { sequence: 10, name: 'Travel Conveyance', code: 'CONV', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 5000, formula: '5000' },
      { sequence: 20, name: 'Gross Stipend', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'STIPEND + CONV' },
      { sequence: 30, name: 'Net Stipend', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS' }
    ]
  },
  {
    id: 'str-6',
    name: 'Sales Commission',
    rulesCount: 7,
    employeesCount: 4,
    active: true,
    rules: [
      { sequence: 1, name: 'Basic Salary', code: 'BASIC', category: 'Basic', computation: 'Percentage of Wage', percentage: 45, fixedAmount: 0, formula: 'WAGE * 0.45' },
      { sequence: 10, name: 'House Rent Allowance', code: 'HRA', category: 'Allowance', computation: 'Percentage of Basic', percentage: 40, fixedAmount: 0, formula: 'BASIC * 0.40' },
      { sequence: 20, name: 'Sales Target Bonus', code: 'BONUS', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 14000, formula: '14000' },
      { sequence: 60, name: 'Gross Salary', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'BASIC + HRA + BONUS' },
      { sequence: 80, name: 'Provident Fund', code: 'PF', category: 'Deduction', computation: 'Percentage of Basic', percentage: 12, fixedAmount: 0, formula: 'BASIC * 0.12' },
      { sequence: 100, name: 'Professional Tax', code: 'PT', category: 'Deduction', computation: 'Fixed Amount', percentage: 0, fixedAmount: 3000, formula: '3000' },
      { sequence: 110, name: 'Net Salary', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS - PF - PT' }
    ]
  }
];

// Helper to calculate payslip breakdown
export function computePayslipValues(contractWage, structureName) {
  let basic = Math.round(contractWage * 0.50);
  let hra = Math.round(basic * 0.40);
  let allow = 10000;
  if (structureName === 'Tech Specialist') {
    basic = Math.round(contractWage * 0.55);
    hra = Math.round(basic * 0.40);
    allow = 23000;
  } else if (structureName === 'Executive Leadership') {
    basic = Math.round(contractWage * 0.50);
    hra = Math.round(basic * 0.50);
    allow = 45000;
  } else if (structureName === 'Contractor Fixed') {
    return { basic: contractWage, gross: contractWage, net: Math.round(contractWage * 0.90) };
  } else if (structureName === 'Intern Salary') {
    return { basic: Math.round(contractWage * 0.80), gross: contractWage, net: contractWage };
  }
  const gross = basic + hra + allow;
  const pf = Math.round(basic * 0.12);
  const pt = 3000;
  const net = gross - pf - pt;
  return { basic, gross, net };
}
