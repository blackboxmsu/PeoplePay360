// PeoplePay360 Centralized Data Store & State Manager
// Coordinates HR Configuration, Master Data, Operations, and Payroll

const STORAGE_KEY = 'peoplepay360_master_data_v2';

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
    initials: 'AM',
    name: 'Aarav Mehta',
    jobPosition: 'Payroll Specialist',
    department: 'Finance',
    manager: 'Sara Khan',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'aarav@oxp.com',
    phone: '+91 98765 43210',
    contractsCount: 2,
    attendanceCount: 14,
    timeOffCount: 3,
    bankAccount: 'HDFC0001234 - 98765432101'
  },
  {
    id: 'emp-2',
    initials: 'SK',
    name: 'Sara Khan',
    jobPosition: 'HR Officer',
    department: 'HR',
    manager: 'Aditi Roy',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Bangalore',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'sara@oxp.com',
    phone: '+91 98765 43211',
    contractsCount: 1,
    attendanceCount: 12,
    timeOffCount: 2,
    bankAccount: '' // A/C missing warning demonstration
  },
  {
    id: 'emp-3',
    initials: 'JD',
    name: 'John Dsouza',
    jobPosition: 'Developer',
    department: 'Engineering',
    manager: 'Rahul Verma',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Pune',
    employmentType: 'Contract',
    status: 'Active',
    workEmail: 'john@oxp.com',
    phone: '+91 98765 43212',
    contractsCount: 2,
    attendanceCount: 15,
    timeOffCount: 1,
    bankAccount: 'ICIC0005432 - 12345678902'
  },
  {
    id: 'emp-4',
    initials: 'NP',
    name: 'Neha Patel',
    jobPosition: 'Recruiter',
    department: 'HR',
    manager: 'Sara Khan',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'neha@oxp.com',
    phone: '+91 98765 43213',
    contractsCount: 1,
    attendanceCount: 10,
    timeOffCount: 4,
    bankAccount: 'SBIN0008765 - 55443322110'
  },
  {
    id: 'emp-5',
    initials: 'RP',
    name: 'Rohan Patel',
    jobPosition: 'Junior Software Engineer',
    department: 'Engineering',
    manager: 'Sara Khan',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    company: 'OxP Pvt Ltd',
    workLocation: 'Mumbai Tech Hub',
    employmentType: 'Full-time',
    status: 'Active',
    workEmail: 'employee@peoplepay360.com',
    phone: '+91 98765 43219',
    contractsCount: 1,
    attendanceCount: 18,
    timeOffCount: 2,
    bankAccount: 'KKBK0001928 - 99887766554'
  }
];

export const SEED_CONTRACTS = [
  {
    id: 'con-1',
    contractNumber: 'CON/2026/0042',
    employeeId: 'emp-1',
    employeeName: 'Aarav Mehta',
    startDate: '2026-01-01',
    endDate: '', // Ongoing
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 85000,
    status: 'Running',
    department: 'Finance',
    jobPosition: 'Payroll Specialist',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Active running contract for 2026 payroll processing.'
  },
  {
    id: 'con-2',
    contractNumber: 'CON/2025/0019',
    employeeId: 'emp-1',
    employeeName: 'Aarav Mehta',
    startDate: '2025-07-01',
    endDate: '2025-12-31',
    duration: '6 Months (01-Jul-2025 to 31-Dec-2025)',
    wage: 78000,
    status: 'Expired',
    department: 'Finance',
    jobPosition: 'Junior Payroll Analyst',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Historical contract superseded upon promotion on 01-Jan-2026.'
  },
  {
    id: 'con-3',
    contractNumber: 'CON/2026/0018',
    employeeId: 'emp-2',
    employeeName: 'Sara Khan',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 95000,
    status: 'Running',
    department: 'HR',
    jobPosition: 'HR Officer',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Active executive contract.'
  },
  {
    id: 'con-4',
    contractNumber: 'CON/2025/0091',
    employeeId: 'emp-3',
    employeeName: 'John Dsouza',
    startDate: '2025-09-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Sep-2025)',
    wage: 72000,
    status: 'Running',
    department: 'Engineering',
    jobPosition: 'Developer',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    structureType: 'Regular Salary',
    notes: 'Contract staff ongoing developer agreement.'
  },
  {
    id: 'con-5',
    contractNumber: 'CON/2026/0055',
    employeeId: 'emp-4',
    employeeName: 'Neha Patel',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 68000,
    status: 'Running',
    department: 'HR',
    jobPosition: 'Recruiter',
    workingScheduleId: 'ws-1',
    workingSchedule: 'Standard 40 Hours',
    structureType: 'Regular Salary',
    notes: 'Full-time HR recruiter agreement.'
  },
  {
    id: 'con-6',
    contractNumber: 'CON/2026/0088',
    employeeId: 'emp-5',
    employeeName: 'Rohan Patel',
    startDate: '2026-01-01',
    endDate: '',
    duration: 'Ongoing (Started 01-Jan-2026)',
    wage: 65000,
    status: 'Running',
    department: 'Engineering',
    jobPosition: 'Junior Software Engineer',
    workingScheduleId: 'ws-2',
    workingSchedule: 'Tech Flexible 35 Hours',
    structureType: 'Regular Salary',
    notes: 'Junior engineer baseline contract.'
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
    employeeName: 'Aarav Mehta',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 8,
    remaining: 12,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Sara Khan',
    description: 'Annual leave quota for calendar year 2026.',
    deductionLog: [
      { requestId: 'req-1', duration: 3, date: '12-Sep-2026', note: 'Family vacation' },
      { requestId: 'req-hist-1', duration: 5, date: '15-May-2026', note: 'Summer break' }
    ]
  },
  {
    id: 'alc-2',
    employeeId: 'emp-2',
    employeeName: 'Sara Khan',
    type: 'Paid Time Off',
    allocated: 18,
    taken: 4,
    remaining: 14,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Aditi Roy',
    description: 'Executive leave allocation.',
    deductionLog: [
      { requestId: 'req-hist-2', duration: 4, date: '10-Jul-2026', note: 'Mid-year leave' }
    ]
  },
  {
    id: 'alc-3',
    employeeId: 'emp-4',
    employeeName: 'Neha Patel',
    type: 'Comp Off',
    allocated: 2,
    taken: 0,
    remaining: 2,
    unit: 'Days',
    status: 'To Approve',
    validity: 'Q3 Balance',
    approver: 'Sara Khan',
    description: 'Compensation off for weekend hiring drive (Awaiting approval before availability).',
    deductionLog: []
  },
  {
    id: 'alc-4',
    employeeId: 'emp-5',
    employeeName: 'Rohan Patel',
    type: 'Paid Time Off',
    allocated: 20,
    taken: 4,
    remaining: 16,
    unit: 'Days',
    status: 'Approved',
    validity: '2026 Annual Balance',
    approver: 'Sara Khan',
    description: 'Standard software engineer leave allocation.',
    deductionLog: [
      { requestId: 'req-hist-3', duration: 4, date: '01-Jun-2026', note: 'Personal vacation' }
    ]
  }
];

export const SEED_TIMEOFF_REQUESTS = [
  {
    id: 'req-1',
    employeeId: 'emp-1',
    employeeName: 'Aarav Mehta',
    type: 'Paid Time Off',
    startDate: '2026-09-12',
    endDate: '2026-09-14',
    duration: 3,
    status: 'Approved',
    approver: 'Sara Khan',
    allocationUsed: 'Paid Time Off (2026 Annual Balance)',
    reason: 'Family vacation'
  },
  {
    id: 'req-2',
    employeeId: 'emp-2',
    employeeName: 'Sara Khan',
    type: 'Sick Leave',
    startDate: '2026-09-18',
    endDate: '2026-09-18',
    duration: 1,
    status: 'Approved',
    approver: 'Aditi Roy',
    allocationUsed: 'None (Direct Approval Policy)',
    reason: 'Doctor consultation'
  },
  {
    id: 'req-3',
    employeeId: 'emp-3',
    employeeName: 'John Dsouza',
    type: 'Comp Off',
    startDate: '2026-09-27',
    endDate: '2026-09-27',
    duration: 1,
    status: 'To Approve',
    approver: 'Rahul Verma',
    allocationUsed: 'Comp Off Balance',
    reason: 'Weekend release deployment support'
  },
  {
    id: 'req-4',
    employeeId: 'emp-5',
    employeeName: 'Rohan Patel',
    type: 'Paid Time Off',
    startDate: '2026-09-22',
    endDate: '2026-09-23',
    duration: 2,
    status: 'To Approve',
    approver: 'Sara Khan',
    allocationUsed: 'Paid Time Off (2026 Annual Balance)',
    reason: 'Personal family emergency'
  }
];

export const SEED_SALARY_STRUCTURES = [
  {
    id: 'str-1',
    name: 'Regular Salary',
    rulesCount: 7,
    employeesCount: 42,
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
  { id: 'att-1', employeeId: 'emp-1', employeeName: 'Aarav Mehta', date: '02-Sep-2026', checkIn: '09:05', checkOut: '18:10', workedHours: '9.08', status: 'Present', department: 'Finance', manager: 'Sara Khan', overtime: '0.50 hrs', notes: 'System-generated from check in/out or manually corrected by an authorized user.' },
  { id: 'att-2', employeeId: 'emp-2', employeeName: 'Sara Khan', date: '02-Sep-2026', checkIn: '09:15', checkOut: '18:02', workedHours: '8.78', status: 'Present', department: 'HR', manager: 'Aditi Roy', overtime: '0.00 hrs', notes: 'System-generated from check in/out or manually corrected by an authorized user.' },
  { id: 'att-3', employeeId: 'emp-3', employeeName: 'John Dsouza', date: '02-Sep-2026', checkIn: '09:32', checkOut: '17:58', workedHours: '8.43', status: 'Present', department: 'Engineering', manager: 'Rahul Verma', overtime: '0.00 hrs', notes: 'System-generated from check in/out or manually corrected by an authorized user.' },
  { id: 'att-4', employeeId: 'emp-4', employeeName: 'Neha Patel', date: '02-Sep-2026', checkIn: '—', checkOut: '—', workedHours: '0.00', status: 'Absent', department: 'HR', manager: 'Sara Khan', overtime: '0.00 hrs', notes: 'Unplanned absence / no punch recorded.' },
  { id: 'att-5', employeeId: 'emp-5', employeeName: 'Rohan Patel', date: '02-Sep-2026', checkIn: '09:00', checkOut: '18:00', workedHours: '9.00', status: 'Present', department: 'Engineering', manager: 'Sara Khan', overtime: '0.00 hrs', notes: 'System-generated from check in/out or manually corrected by an authorized user.' },
  { id: 'att-6', employeeId: 'emp-5', employeeName: 'Rohan Patel', date: '01-Sep-2026', checkIn: '09:05', checkOut: '18:15', workedHours: '9.17', status: 'Present', department: 'Engineering', manager: 'Sara Khan', overtime: '0.17 hrs', notes: 'System-generated from check in/out or manually corrected by an authorized user.' }
];

export const SEED_PAYRUNS = [
  {
    id: 'pr-1',
    name: 'January 2026',
    structure: 'Regular Salary',
    periodStart: '2026-01-01',
    periodEnd: '2026-01-31',
    employeeCount: 4,
    status: 'Paid',
    warningsCount: 1,
    payslips: [
      { id: 'ps-1', employeeId: 'emp-1', employeeName: 'Aarav Mehta', department: 'Finance', contractWage: 85000, workedDays: 22, basic: 42500, gross: 69500, net: 61400, status: 'Paid', warning: '—' },
      { id: 'ps-2', employeeId: 'emp-2', employeeName: 'Sara Khan', department: 'HR', contractWage: 95000, workedDays: 22, basic: 47500, gross: 76500, net: 67800, status: 'Paid', warning: 'A/C missing' },
      { id: 'ps-3', employeeId: 'emp-3', employeeName: 'John Dsouza', department: 'Engineering', contractWage: 72000, workedDays: 21, basic: 36000, gross: 60400, net: 53080, status: 'Paid', warning: '—' },
      { id: 'ps-4', employeeId: 'emp-4', employeeName: 'Neha Patel', department: 'HR', contractWage: 68000, workedDays: 20, basic: 34000, gross: 57600, net: 50520, status: 'Paid', warning: '—' }
    ]
  },
  {
    id: 'pr-2',
    name: 'February 2026',
    structure: 'Regular Salary',
    periodStart: '2026-02-01',
    periodEnd: '2026-02-28',
    employeeCount: 4,
    status: 'Validated',
    warningsCount: 2,
    payslips: [
      { id: 'ps-5', employeeId: 'emp-1', employeeName: 'Aarav Mehta', department: 'Finance', contractWage: 85000, workedDays: 20, basic: 42500, gross: 69500, net: 61400, status: 'Validated', warning: '—' },
      { id: 'ps-6', employeeId: 'emp-2', employeeName: 'Sara Khan', department: 'HR', contractWage: 95000, workedDays: 20, basic: 47500, gross: 76500, net: 67800, status: 'Validated', warning: 'A/C missing' },
      { id: 'ps-7', employeeId: 'emp-3', employeeName: 'John Dsouza', department: 'Engineering', contractWage: 72000, workedDays: 19, basic: 36000, gross: 60400, net: 53080, status: 'Draft', warning: 'Duplicate' },
      { id: 'ps-8', employeeId: 'emp-4', employeeName: 'Neha Patel', department: 'HR', contractWage: 68000, workedDays: 20, basic: 34000, gross: 57600, net: 50520, status: 'Validated', warning: '—' }
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
