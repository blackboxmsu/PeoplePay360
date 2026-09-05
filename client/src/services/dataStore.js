// PeoplePay360 Centralized Data Store & State Manager
// Coordinates HR Configuration, Master Data, Operations, and Payroll

const STORAGE_KEY = 'peoplepay360_master_data_v3';

// --- INITIAL MASTER SEED DATA ---

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
  }
];

export const SEED_EMPLOYEES = [
  {
    id: 'emp-1',
    initials: 'RD',
    name: 'Raviraj Dhokiya',
    jobPosition: 'System Administrator & Managing Director',
    department: 'Executive',
    manager: 'Board of Directors',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai Head Office',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'admin@peoplepay360.com',
    phone: '+91 98765 00001',
    contractsCount: 1,
    attendanceCount: 22,
    timeOffCount: 2,
    bankAccount: 'HDFC0001001 - 98765432001'
  },
  {
    id: 'emp-2',
    initials: 'MR',
    name: 'Meet Rathod',
    jobPosition: 'HR Manager',
    department: 'Human Resources',
    manager: 'Raviraj Dhokiya',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'hrmanager@peoplepay360.com',
    phone: '+91 98765 00002',
    contractsCount: 1,
    attendanceCount: 21,
    timeOffCount: 1,
    bankAccount: 'ICIC0002002 - 98765432002'
  },
  {
    id: 'emp-3',
    initials: 'NC',
    name: 'Neev Chovatiya',
    jobPosition: 'HR Payroll Specialist',
    department: 'Finance & Payroll',
    manager: 'Ujjwal Rathod',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'payrolluser@peoplepay360.com',
    phone: '+91 98765 00003',
    contractsCount: 1,
    attendanceCount: 20,
    timeOffCount: 2,
    bankAccount: 'SBIN0003003 - 98765432003'
  },
  {
    id: 'emp-4',
    initials: 'UR',
    name: 'Ujjwal Rathod',
    jobPosition: 'HR Payroll Manager',
    department: 'Finance & Payroll',
    manager: 'Raviraj Dhokiya',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'payrollmanager@peoplepay360.com',
    phone: '+91 98765 00004',
    contractsCount: 1,
    attendanceCount: 22,
    timeOffCount: 1,
    bankAccount: 'KKBK0004004 - 98765432004'
  },
  {
    id: 'emp-5',
    initials: 'PS',
    name: 'Parth Solanki',
    jobPosition: 'Senior Frontend Engineer',
    department: 'Engineering',
    manager: 'Raviraj Dhokiya',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai Tech Hub',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'employee@peoplepay360.com',
    phone: '+91 98765 00005',
    contractsCount: 1,
    attendanceCount: 20,
    timeOffCount: 2,
    bankAccount: 'HDFC0005005 - 98765432005'
  },
  {
    id: 'emp-6',
    initials: 'AM',
    name: 'Ayush Moradiya',
    jobPosition: 'Backend Systems Engineer',
    department: 'Engineering',
    manager: 'Raviraj Dhokiya',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Pune',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'ayush@peoplepay360.com',
    phone: '+91 98765 00006',
    contractsCount: 1,
    attendanceCount: 19,
    timeOffCount: 1,
    bankAccount: 'ICIC0006006 - 98765432006'
  },
  {
    id: 'emp-7',
    initials: 'KP',
    name: 'Krish Palat',
    jobPosition: 'Full Stack Developer',
    department: 'Engineering',
    manager: 'Raviraj Dhokiya',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Bangalore',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'krish@peoplepay360.com',
    phone: '+91 98765 00007',
    contractsCount: 1,
    attendanceCount: 18,
    timeOffCount: 2,
    bankAccount: 'AXIS0007007 - 98765432007'
  },
  {
    id: 'emp-8',
    initials: 'RO',
    name: 'Rooney',
    jobPosition: 'QA Automation Specialist',
    department: 'Engineering',
    manager: 'Meet Rathod',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai Tech Hub',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'rooney@peoplepay360.com',
    phone: '+91 98765 00008',
    contractsCount: 1,
    attendanceCount: 21,
    timeOffCount: 1,
    bankAccount: 'SBIN0008008 - 98765432008'
  }
];

export const SEED_CONTRACTS = [
  {
    id: 'con-1',
    contractNumber: 'CON/2026/0001',
    employeeId: 'emp-1',
    employeeName: 'Raviraj Dhokiya',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 150000,
    status: 'Running',
    department: 'Executive',
    jobPosition: 'System Administrator & Managing Director',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Executive managing director contract.'
  },
  {
    id: 'con-2',
    contractNumber: 'CON/2026/0002',
    employeeId: 'emp-2',
    employeeName: 'Meet Rathod',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 95000,
    status: 'Running',
    department: 'Human Resources',
    jobPosition: 'HR Manager',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'HR Management baseline contract.'
  },
  {
    id: 'con-3',
    contractNumber: 'CON/2026/0003',
    employeeId: 'emp-3',
    employeeName: 'Neev Chovatiya',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 75000,
    status: 'Running',
    department: 'Finance & Payroll',
    jobPosition: 'HR Payroll Specialist',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Payroll operations and computation contract.'
  },
  {
    id: 'con-4',
    contractNumber: 'CON/2026/0004',
    employeeId: 'emp-4',
    employeeName: 'Ujjwal Rathod',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 115000,
    status: 'Running',
    department: 'Finance & Payroll',
    jobPosition: 'HR Payroll Manager',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Head of payroll management and salary rules approval.'
  },
  {
    id: 'con-5',
    contractNumber: 'CON/2026/0005',
    employeeId: 'emp-5',
    employeeName: 'Parth Solanki',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 75000,
    status: 'Running',
    department: 'Engineering',
    jobPosition: 'Senior Frontend Engineer',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    structureType: 'Regular Salary',
    notes: 'Engineering frontend lead contract.'
  },
  {
    id: 'con-6',
    contractNumber: 'CON/2026/0006',
    employeeId: 'emp-6',
    employeeName: 'Ayush Moradiya',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 72000,
    status: 'Running',
    department: 'Engineering',
    jobPosition: 'Backend Systems Engineer',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    structureType: 'Regular Salary',
    notes: 'Core backend engineering contract.'
  },
  {
    id: 'con-7',
    contractNumber: 'CON/2026/0007',
    employeeId: 'emp-7',
    employeeName: 'Krish Palat',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 68000,
    status: 'Running',
    department: 'Engineering',
    jobPosition: 'Full Stack Developer',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    structureType: 'Regular Salary',
    notes: 'Full-stack application developer contract.'
  },
  {
    id: 'con-8',
    contractNumber: 'CON/2026/0008',
    employeeId: 'emp-8',
    employeeName: 'Rooney',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 65000,
    status: 'Running',
    department: 'Engineering',
    jobPosition: 'QA Automation Specialist',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Quality assurance and automated testing contract.'
  }
];

export const SEED_TIMEOFF_TYPES = [
  {
    id: 'tot-1',
    name: 'Paid Time Off',
    unit: 'Days',
    allocation: 'Required',
    approval: 'Manager',
    status: 'Active',
    payrollEntry: 'Leave Work Entry',
    displayColor: 'Green',
    notes: 'Standard annual leave. Balances must be allocated and approved before usage.'
  },
  {
    id: 'tot-2',
    name: 'Sick Leave',
    unit: 'Days',
    allocation: 'No',
    approval: 'Manager',
    status: 'Active',
    payrollEntry: 'Leave Work Entry',
    displayColor: 'Amber',
    notes: 'Unallocated emergency medical leave approved directly by manager.'
  },
  {
    id: 'tot-3',
    name: 'Comp Off',
    unit: 'Hours',
    allocation: 'Required',
    approval: 'Officer',
    status: 'Active',
    payrollEntry: 'Compensatory Overtime',
    displayColor: 'Blue',
    notes: 'Granted for weekend shift or holiday releases.'
  }
];

export const SEED_ALLOCATIONS = [
  {
    id: 'alc-1',
    employeeId: 'emp-1',
    employeeName: 'Raviraj Dhokiya',
    type: 'Paid Time Off',
    allocated: 25,
    taken: 5,
    remaining: 20,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Executive annual leave quota for calendar year 2026.',
    deductionLog: [
      { requestId: 'req-hist-1', duration: 5, date: '15-May-2026', note: 'Annual break' }
    ]
  },
  {
    id: 'alc-2',
    employeeId: 'emp-2',
    employeeName: 'Meet Rathod',
    type: 'Paid Time Off',
    allocated: 22,
    taken: 4,
    remaining: 18,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Raviraj Dhokiya',
    description: 'HR Manager annual leave quota.',
    deductionLog: [
      { requestId: 'req-hist-2', duration: 4, date: '10-Jul-2026', note: 'Mid-year leave' }
    ]
  },
  {
    id: 'alc-3',
    employeeId: 'emp-3',
    employeeName: 'Neev Chovatiya',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 3,
    remaining: 17,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Payroll specialist leave quota.',
    deductionLog: [
      { requestId: 'req-hist-3', duration: 3, date: '12-Jun-2026', note: 'Family vacation' }
    ]
  },
  {
    id: 'alc-4',
    employeeId: 'emp-4',
    employeeName: 'Ujjwal Rathod',
    type: 'Paid Time Off',
    allocated: 22,
    taken: 2,
    remaining: 20,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Raviraj Dhokiya',
    description: 'Payroll Manager leave quota.',
    deductionLog: [
      { requestId: 'req-hist-4', duration: 2, date: '18-Aug-2026', note: 'Personal days' }
    ]
  },
  {
    id: 'alc-5',
    employeeId: 'emp-5',
    employeeName: 'Parth Solanki',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 4,
    remaining: 16,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Senior Frontend Engineer annual leave allocation.',
    deductionLog: [
      { requestId: 'req-1', duration: 2, date: '12-Sep-2026', note: 'Tech conference' },
      { requestId: 'req-hist-5', duration: 2, date: '01-Jun-2026', note: 'Personal vacation' }
    ]
  },
  {
    id: 'alc-6',
    employeeId: 'emp-6',
    employeeName: 'Ayush Moradiya',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 3,
    remaining: 17,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Backend Engineer annual leave allocation.',
    deductionLog: [
      { requestId: 'req-hist-6', duration: 3, date: '05-May-2026', note: 'Summer break' }
    ]
  },
  {
    id: 'alc-7',
    employeeId: 'emp-7',
    employeeName: 'Krish Palat',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 2,
    remaining: 18,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'Full Stack Engineer annual leave allocation.',
    deductionLog: [
      { requestId: 'req-hist-7', duration: 2, date: '20-Apr-2026', note: 'Family visit' }
    ]
  },
  {
    id: 'alc-8',
    employeeId: 'emp-8',
    employeeName: 'Rooney',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 2,
    remaining: 18,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Meet Rathod',
    description: 'QA Engineer annual leave allocation.',
    deductionLog: [
      { requestId: 'req-hist-8', duration: 2, date: '14-Feb-2026', note: 'Winter holiday' }
    ]
  }
];

export const SEED_TIMEOFF_REQUESTS = [
  {
    id: 'req-1',
    employeeId: 'emp-5',
    employeeName: 'Parth Solanki',
    type: 'Paid Time Off',
    startDate: '2026-09-12',
    endDate: '2026-09-13',
    duration: 2,
    status: 'Approved',
    approver: 'Meet Rathod',
    allocationUsed: 'Paid Time Off (2026 Annual Balance)',
    reason: 'Frontend architecture seminar'
  },
  {
    id: 'req-2',
    employeeId: 'emp-6',
    employeeName: 'Ayush Moradiya',
    type: 'Sick Leave',
    startDate: '2026-09-18',
    endDate: '2026-09-18',
    duration: 1,
    status: 'Approved',
    approver: 'Meet Rathod',
    allocationUsed: 'None (Direct Approval Policy)',
    reason: 'Medical checkup'
  },
  {
    id: 'req-3',
    employeeId: 'emp-7',
    employeeName: 'Krish Palat',
    type: 'Paid Time Off',
    startDate: '2026-09-22',
    endDate: '2026-09-24',
    duration: 3,
    status: 'To Approve',
    approver: 'Meet Rathod',
    allocationUsed: 'Paid Time Off (2026 Annual Balance)',
    reason: 'Personal family event'
  },
  {
    id: 'req-4',
    employeeId: 'emp-8',
    employeeName: 'Rooney',
    type: 'Comp Off',
    startDate: '2026-09-27',
    endDate: '2026-09-27',
    duration: 1,
    status: 'To Approve',
    approver: 'Meet Rathod',
    allocationUsed: 'Comp Off Balance',
    reason: 'Weekend release deployment support'
  }
];

export const SEED_SALARY_STRUCTURES = [
  {
    id: 'str-1',
    name: 'Regular Salary',
    rulesCount: 7,
    employeesCount: 8,
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
    name: 'Intern Salary',
    rulesCount: 4,
    employeesCount: 6,
    active: true,
    rules: [
      { sequence: 1, name: 'Stipend Base', code: 'STIPEND', category: 'Basic', computation: 'Percentage of Wage', percentage: 80, fixedAmount: 0, formula: 'WAGE * 0.80' },
      { sequence: 10, name: 'Travel Conveyance', code: 'CONV', category: 'Allowance', computation: 'Fixed Amount', percentage: 0, fixedAmount: 5000, formula: '5000' },
      { sequence: 20, name: 'Gross Stipend', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'STIPEND + CONV' },
      { sequence: 30, name: 'Net Stipend', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS' }
    ]
  },
  {
    id: 'str-3',
    name: 'Contractor Fixed',
    rulesCount: 3,
    employeesCount: 4,
    active: true,
    rules: [
      { sequence: 1, name: 'Fixed Retainer', code: 'RETAINER', category: 'Basic', computation: 'Percentage of Wage', percentage: 100, fixedAmount: 0, formula: 'WAGE * 1.00' },
      { sequence: 10, name: 'TDS Deduction (10%)', code: 'TDS', category: 'Deduction', computation: 'Percentage of Wage', percentage: 10, fixedAmount: 0, formula: 'RETAINER * 0.10' },
      { sequence: 20, name: 'Net Payout', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'RETAINER - TDS' }
    ]
  }
];

export const SEED_ATTENDANCE = [
  { id: 'att-1', employeeId: 'emp-1', employeeName: 'Raviraj Dhokiya', date: '02-Sep-2026', checkIn: '08:55', checkOut: '18:15', workedHours: '9.33', status: 'Present', department: 'Executive', manager: 'Board of Directors', overtime: '0.33 hrs', notes: 'Executive check-in via mobile biometric.' },
  { id: 'att-2', employeeId: 'emp-2', employeeName: 'Meet Rathod', date: '02-Sep-2026', checkIn: '09:05', checkOut: '18:05', workedHours: '9.00', status: 'Present', department: 'Human Resources', manager: 'Raviraj Dhokiya', overtime: '0.00 hrs', notes: 'HR Department morning attendance logged.' },
  { id: 'att-3', employeeId: 'emp-3', employeeName: 'Neev Chovatiya', date: '02-Sep-2026', checkIn: '09:10', checkOut: '18:10', workedHours: '9.00', status: 'Present', department: 'Finance & Payroll', manager: 'Ujjwal Rathod', overtime: '0.00 hrs', notes: 'Payroll system verification attendance.' },
  { id: 'att-4', employeeId: 'emp-4', employeeName: 'Ujjwal Rathod', date: '02-Sep-2026', checkIn: '09:00', checkOut: '18:30', workedHours: '9.50', status: 'Present', department: 'Finance & Payroll', manager: 'Raviraj Dhokiya', overtime: '0.50 hrs', notes: 'Month-end payroll batch computation.' },
  { id: 'att-5', employeeId: 'emp-5', employeeName: 'Parth Solanki', date: '02-Sep-2026', checkIn: '10:00', checkOut: '18:00', workedHours: '8.00', status: 'Present', department: 'Engineering', manager: 'Raviraj Dhokiya', overtime: '0.00 hrs', notes: 'Engineering flexible schedule punch.' },
  { id: 'att-6', employeeId: 'emp-5', employeeName: 'Parth Solanki', date: '01-Sep-2026', checkIn: '09:55', checkOut: '18:10', workedHours: '8.25', status: 'Present', department: 'Engineering', manager: 'Raviraj Dhokiya', overtime: '0.25 hrs', notes: 'Engineering flexible schedule punch.' },
  { id: 'att-7', employeeId: 'emp-6', employeeName: 'Ayush Moradiya', date: '02-Sep-2026', checkIn: '10:15', checkOut: '18:15', workedHours: '8.00', status: 'Present', department: 'Engineering', manager: 'Raviraj Dhokiya', overtime: '0.00 hrs', notes: 'Pune remote hub attendance.' },
  { id: 'att-8', employeeId: 'emp-7', employeeName: 'Krish Palat', date: '02-Sep-2026', checkIn: '10:05', checkOut: '18:05', workedHours: '8.00', status: 'Present', department: 'Engineering', manager: 'Raviraj Dhokiya', overtime: '0.00 hrs', notes: 'Bangalore engineering hub punch.' },
  { id: 'att-9', employeeId: 'emp-8', employeeName: 'Rooney', date: '02-Sep-2026', checkIn: '09:00', checkOut: '18:00', workedHours: '9.00', status: 'Present', department: 'Engineering', manager: 'Meet Rathod', overtime: '0.00 hrs', notes: 'QA release testing day punch.' }
];

export const SEED_PAYRUNS = [
  {
    id: 'pr-1',
    name: 'January 2026',
    structure: 'Regular Salary',
    periodStart: '2026-01-01',
    periodEnd: '2026-01-31',
    employeeCount: 8,
    status: 'Paid',
    warningsCount: 0,
    payslips: [
      { id: 'ps-1', employeeId: 'emp-1', employeeName: 'Raviraj Dhokiya', department: 'Executive', contractWage: 150000, workedDays: 22, basic: 75000, gross: 115000, net: 103000, status: 'Paid', warning: '—' },
      { id: 'ps-2', employeeId: 'emp-2', employeeName: 'Meet Rathod', department: 'Human Resources', contractWage: 95000, workedDays: 22, basic: 47500, gross: 76500, net: 67800, status: 'Paid', warning: '—' },
      { id: 'ps-3', employeeId: 'emp-3', employeeName: 'Neev Chovatiya', department: 'Finance & Payroll', contractWage: 75000, workedDays: 22, basic: 37500, gross: 62500, net: 55000, status: 'Paid', warning: '—' },
      { id: 'ps-4', employeeId: 'emp-4', employeeName: 'Ujjwal Rathod', department: 'Finance & Payroll', contractWage: 115000, workedDays: 22, basic: 57500, gross: 90500, net: 80600, status: 'Paid', warning: '—' },
      { id: 'ps-5', employeeId: 'emp-5', employeeName: 'Parth Solanki', department: 'Engineering', contractWage: 75000, workedDays: 22, basic: 37500, gross: 62500, net: 55000, status: 'Paid', warning: '—' },
      { id: 'ps-6', employeeId: 'emp-6', employeeName: 'Ayush Moradiya', department: 'Engineering', contractWage: 72000, workedDays: 22, basic: 36000, gross: 60400, net: 53080, status: 'Paid', warning: '—' },
      { id: 'ps-7', employeeId: 'emp-7', employeeName: 'Krish Palat', department: 'Engineering', contractWage: 68000, workedDays: 22, basic: 34000, gross: 57600, net: 50520, status: 'Paid', warning: '—' },
      { id: 'ps-8', employeeId: 'emp-8', employeeName: 'Rooney', department: 'Engineering', contractWage: 65000, workedDays: 22, basic: 32500, gross: 55500, net: 48600, status: 'Paid', warning: '—' }
    ]
  },
  {
    id: 'pr-2',
    name: 'February 2026',
    structure: 'Regular Salary',
    periodStart: '2026-02-01',
    periodEnd: '2026-02-28',
    employeeCount: 8,
    status: 'Validated',
    warningsCount: 0,
    payslips: [
      { id: 'ps-9', employeeId: 'emp-1', employeeName: 'Raviraj Dhokiya', department: 'Executive', contractWage: 150000, workedDays: 20, basic: 75000, gross: 115000, net: 103000, status: 'Validated', warning: '—' },
      { id: 'ps-10', employeeId: 'emp-2', employeeName: 'Meet Rathod', department: 'Human Resources', contractWage: 95000, workedDays: 20, basic: 47500, gross: 76500, net: 67800, status: 'Validated', warning: '—' },
      { id: 'ps-11', employeeId: 'emp-3', employeeName: 'Neev Chovatiya', department: 'Finance & Payroll', contractWage: 75000, workedDays: 20, basic: 37500, gross: 62500, net: 55000, status: 'Validated', warning: '—' },
      { id: 'ps-12', employeeId: 'emp-4', employeeName: 'Ujjwal Rathod', department: 'Finance & Payroll', contractWage: 115000, workedDays: 20, basic: 57500, gross: 90500, net: 80600, status: 'Validated', warning: '—' },
      { id: 'ps-13', employeeId: 'emp-5', employeeName: 'Parth Solanki', department: 'Engineering', contractWage: 75000, workedDays: 20, basic: 37500, gross: 62500, net: 55000, status: 'Validated', warning: '—' },
      { id: 'ps-14', employeeId: 'emp-6', employeeName: 'Ayush Moradiya', department: 'Engineering', contractWage: 72000, workedDays: 20, basic: 36000, gross: 60400, net: 53080, status: 'Validated', warning: '—' },
      { id: 'ps-15', employeeId: 'emp-7', employeeName: 'Krish Palat', department: 'Engineering', contractWage: 68000, workedDays: 20, basic: 34000, gross: 57600, net: 50520, status: 'Validated', warning: '—' },
      { id: 'ps-16', employeeId: 'emp-8', employeeName: 'Rooney', department: 'Engineering', contractWage: 65000, workedDays: 20, basic: 32500, gross: 55500, net: 48600, status: 'Validated', warning: '—' }
    ]
  }
];

// --- STORE IMPLEMENTATION ---

class DataStore {
  constructor() {
    this.listeners = new Set();
    this.data = this.load();
  }

  load() {
    try {
      if (typeof localStorage !== 'undefined') {
        const serialized = localStorage.getItem(STORAGE_KEY);
        if (serialized) {
          const parsed = JSON.parse(serialized);
          return {
            workingSchedules: parsed.workingSchedules || SEED_WORKING_SCHEDULES,
            employees: parsed.employees || SEED_EMPLOYEES,
            contracts: parsed.contracts || SEED_CONTRACTS,
            timeOffTypes: parsed.timeOffTypes || SEED_TIMEOFF_TYPES,
            allocations: parsed.allocations || SEED_ALLOCATIONS,
            timeOffRequests: parsed.timeOffRequests || SEED_TIMEOFF_REQUESTS,
            salaryStructures: parsed.salaryStructures || SEED_SALARY_STRUCTURES,
            attendance: parsed.attendance || SEED_ATTENDANCE,
            payruns: parsed.payruns || SEED_PAYRUNS
          };
        }
      }
    } catch (e) {
      console.warn('Error reading from localStorage, using seed data', e);
    }
    return {
      workingSchedules: SEED_WORKING_SCHEDULES,
      employees: SEED_EMPLOYEES,
      contracts: SEED_CONTRACTS,
      timeOffTypes: SEED_TIMEOFF_TYPES,
      allocations: SEED_ALLOCATIONS,
      timeOffRequests: SEED_TIMEOFF_REQUESTS,
      salaryStructures: SEED_SALARY_STRUCTURES,
      attendance: SEED_ATTENDANCE,
      payruns: SEED_PAYRUNS
    };
  }

  save() {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
      }
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
    this.notify();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    this.listeners.forEach((l) => l(this.data));
  }

  // --- Working Schedules (A3) ---
  getWorkingSchedules() {
    return this.data.workingSchedules;
  }

  calculateWeeklyHours(days) {
    if (!days || !Array.isArray(days)) return 0;
    return days.reduce((acc, day) => {
      if (!day.active || !day.startTime || !day.endTime) return acc;
      const [sh, sm] = day.startTime.split(':').map(Number);
      const [eh, em] = day.endTime.split(':').map(Number);
      const startMinutes = sh * 60 + sm;
      const endMinutes = eh * 60 + em;
      let durationHours = (endMinutes - startMinutes) / 60;
      if (durationHours < 0) durationHours += 24;
      const netHours = Math.max(0, durationHours - (Number(day.breakHours) || 0));
      return acc + netHours;
    }, 0);
  }

  saveWorkingSchedule(schedule) {
    const totalHours = this.calculateWeeklyHours(schedule.days);
    const updatedSchedule = {
      ...schedule,
      weeklyHours: Number(totalHours.toFixed(1)),
      daysPerWeek: schedule.days.filter((d) => d.active).length
    };

    const existingIdx = this.data.workingSchedules.findIndex((s) => s.id === schedule.id);
    if (existingIdx >= 0) {
      this.data.workingSchedules[existingIdx] = updatedSchedule;
    } else {
      this.data.workingSchedules.push({
        ...updatedSchedule,
        id: schedule.id || `ws-${Date.now()}`
      });
    }
    this.save();
    return updatedSchedule;
  }

  deleteWorkingSchedule(id) {
    this.data.workingSchedules = this.data.workingSchedules.filter((s) => s.id !== id);
    this.save();
  }

  // --- Employees (A1) ---
  getEmployees() {
    return this.data.employees;
  }

  saveEmployee(employee) {
    let schedName = employee.workingSchedule;
    if (employee.workingScheduleId) {
      const ws = this.data.workingSchedules.find((s) => s.id === employee.workingScheduleId);
      if (ws) schedName = ws.name;
    }

    const initials = employee.name
      ? employee.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
      : 'EM';

    const complete = {
      ...employee,
      initials,
      workingSchedule: schedName || 'Standard 40 Hours'
    };

    const idx = this.data.employees.findIndex((e) => e.id === employee.id);
    if (idx >= 0) {
      this.data.employees[idx] = { ...this.data.employees[idx], ...complete };
    } else {
      this.data.employees.push({
        ...complete,
        id: employee.id || `emp-${Date.now()}`,
        contractsCount: 1,
        attendanceCount: 0,
        timeOffCount: 0
      });
    }
    this.save();
  }

  // --- Contracts (A2) ---
  getContracts() {
    return this.data.contracts;
  }

  saveContract(contract) {
    const idx = this.data.contracts.findIndex((c) => c.id === contract.id);
    if (idx >= 0) {
      this.data.contracts[idx] = { ...this.data.contracts[idx], ...contract };
    } else {
      this.data.contracts.push({
        ...contract,
        id: contract.id || `con-${Date.now()}`
      });
    }
    this.save();
  }

  // Find active period-specific contract for an employee, validating no concurrent contracts
  getContractForPeriod(employeeIdOrName, periodStart, periodEnd) {
    const pStart = new Date(periodStart);
    const pEnd = new Date(periodEnd);

    const empContracts = this.data.contracts.filter(
      (c) => c.employeeId === employeeIdOrName || c.employeeName.toLowerCase() === (employeeIdOrName || '').toLowerCase()
    );

    // Active running contracts overlapping the period
    const applicable = empContracts.filter((c) => {
      if (c.status !== 'Running') return false;
      const cStart = new Date(c.startDate);
      const cEnd = c.endDate ? new Date(c.endDate) : new Date('2099-12-31');
      return cStart <= pEnd && cEnd >= pStart;
    });

    return {
      contracts: applicable,
      isConcurrentError: applicable.length > 1,
      contract: applicable.length === 1 ? applicable[0] : null
    };
  }

  // --- Time Off Types & Allocations & Requests (A4) ---
  getTimeOffTypes() {
    return this.data.timeOffTypes;
  }

  saveTimeOffType(tot) {
    const idx = this.data.timeOffTypes.findIndex((t) => t.id === tot.id);
    if (idx >= 0) {
      this.data.timeOffTypes[idx] = { ...this.data.timeOffTypes[idx], ...tot };
    } else {
      this.data.timeOffTypes.push({
        ...tot,
        id: tot.id || `tot-${Date.now()}`
      });
    }
    this.save();
  }

  getAllocations() {
    return this.data.allocations;
  }

  saveAllocation(allocation) {
    const idx = this.data.allocations.findIndex((a) => a.id === allocation.id);
    const rem = Number(allocation.allocated) - Number(allocation.taken || 0);
    const complete = {
      ...allocation,
      remaining: Math.max(0, rem),
      deductionLog: allocation.deductionLog || []
    };

    if (idx >= 0) {
      this.data.allocations[idx] = { ...this.data.allocations[idx], ...complete };
    } else {
      this.data.allocations.push({
        ...complete,
        id: allocation.id || `alc-${Date.now()}`
      });
    }
    this.save();
  }

  getTimeOffRequests() {
    return this.data.timeOffRequests;
  }

  saveTimeOffRequest(request) {
    const idx = this.data.timeOffRequests.findIndex((r) => r.id === request.id);
    if (idx >= 0) {
      this.data.timeOffRequests[idx] = { ...this.data.timeOffRequests[idx], ...request };
    } else {
      this.data.timeOffRequests.unshift({
        ...request,
        id: request.id || `req-${Date.now()}`
      });
    }
    this.save();
  }

  // Requirement A4: Approved leave requests automatically deduct from assigned allocations
  updateRequestStatus(requestId, newStatus) {
    const req = this.data.timeOffRequests.find((r) => r.id === requestId);
    if (!req) return;

    const previousStatus = req.status;
    req.status = newStatus;

    // Check if leave type requires allocation
    const leaveTypeObj = this.data.timeOffTypes.find((t) => t.name === req.type);
    const requiresAllocation = !leaveTypeObj || leaveTypeObj.allocation !== 'No';

    if (requiresAllocation) {
      const matchingAlc = this.data.allocations.find(
        (a) =>
          (a.employeeName.toLowerCase() === req.employeeName.toLowerCase() || a.employeeId === req.employeeId) &&
          a.type === req.type &&
          a.status === 'Approved'
      );

      const durationNum = parseFloat(req.duration) || 1;

      if (matchingAlc) {
        if (newStatus === 'Approved' && previousStatus !== 'Approved') {
          matchingAlc.taken = (Number(matchingAlc.taken) || 0) + durationNum;
          matchingAlc.remaining = Math.max(0, Number(matchingAlc.allocated) - matchingAlc.taken);
          if (!matchingAlc.deductionLog) matchingAlc.deductionLog = [];
          matchingAlc.deductionLog.push({
            requestId: req.id,
            duration: durationNum,
            date: req.startDate,
            note: req.reason || 'Approved leave deduction'
          });
          req.allocationUsed = `${matchingAlc.type} (${matchingAlc.validity}) [Deducted ${durationNum} ${matchingAlc.unit}]`;
        } else if (previousStatus === 'Approved' && (newStatus === 'Refused' || newStatus === 'To Approve')) {
          matchingAlc.taken = Math.max(0, (Number(matchingAlc.taken) || 0) - durationNum);
          matchingAlc.remaining = Math.max(0, Number(matchingAlc.allocated) - matchingAlc.taken);
          if (matchingAlc.deductionLog) {
            matchingAlc.deductionLog = matchingAlc.deductionLog.filter((l) => l.requestId !== req.id);
          }
          req.allocationUsed = `${matchingAlc.type} (${matchingAlc.validity}) [Restored]`;
        }
      }
    }

    this.save();
  }

  // --- Salary Structures & Rules (A5 & A6) ---
  getSalaryStructures() {
    return this.data.salaryStructures;
  }

  saveSalaryStructure(structure) {
    const idx = this.data.salaryStructures.findIndex((s) => s.id === structure.id);
    const complete = {
      ...structure,
      rulesCount: structure.rules?.length || 0
    };
    if (idx >= 0) {
      this.data.salaryStructures[idx] = { ...this.data.salaryStructures[idx], ...complete };
    } else {
      this.data.salaryStructures.push({
        ...complete,
        id: structure.id || `str-${Date.now()}`
      });
    }
    this.save();
  }

  getAllSalaryRules() {
    const all = [];
    this.data.salaryStructures.forEach((struct) => {
      if (struct.rules) {
        struct.rules.forEach((r) => {
          all.push({ ...r, structure: struct.name, structureId: struct.id });
        });
      }
    });
    return all.sort((a, b) => a.sequence - b.sequence);
  }

  // --- Attendance (A7 Reporting) ---
  getAttendance() {
    return this.data.attendance;
  }

  saveAttendance(record) {
    const idx = this.data.attendance.findIndex((a) => a.id === record.id);
    if (idx >= 0) {
      this.data.attendance[idx] = { ...this.data.attendance[idx], ...record };
    } else {
      this.data.attendance.unshift({
        ...record,
        id: record.id || `att-${Date.now()}`
      });
    }
    this.save();
  }

  // --- Payruns & Payslips ---
  getPayruns() {
    return this.data.payruns;
  }

  savePayrun(payrun) {
    const idx = this.data.payruns.findIndex((p) => p.id === payrun.id);
    if (idx >= 0) {
      this.data.payruns[idx] = { ...this.data.payruns[idx], ...payrun };
    } else {
      this.data.payruns.unshift({
        ...payrun,
        id: payrun.id || `pr-${Date.now()}`
      });
    }
    this.save();
  }
}

export const store = new DataStore();
export default store;
