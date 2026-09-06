import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  SEED_DEPARTMENTS,
  SEED_WORKING_SCHEDULES,
  SEED_TIMEOFF_TYPES,
  SEED_SALARY_STRUCTURES,
  computePayslipValues
} from './dummyData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 50 realistic employees with diverse roles and departments
const RAW_EMPLOYEES = [
  { id: 'emp-1', name: 'Aarav Mehta', role: 'hr_payroll_manager', job: 'Payroll Specialist', dept: 'Finance & Payroll', mgr: 'Sara Khan', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 85000, bank: 'HDFC0001234 - 98765432101', email: 'payrollmanager@peoplepay360.com', phone: '+91 98765 43210', struct: 'Regular Salary' },
  { id: 'emp-2', name: 'Sara Khan', role: 'hr_manager', job: 'HR Officer', dept: 'Human Resources', mgr: 'Falguni Nayar', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Bangalore', type: 'Full-time', wage: 95000, bank: '', email: 'hrmanager@peoplepay360.com', phone: '+91 98765 43211', struct: 'Regular Salary' },
  { id: 'emp-3', name: 'John Dsouza', role: 'employee', job: 'Developer', dept: 'Engineering', mgr: 'Rahul Dravid', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Pune', type: 'Contract', wage: 72000, bank: 'ICIC0005432 - 12345678902', email: 'john@oxp.com', phone: '+91 98765 43212', struct: 'Contractor Fixed' },
  { id: 'emp-4', name: 'Neha Patel', role: 'hr_manager', job: 'Recruiter', dept: 'Human Resources', mgr: 'Sara Khan', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 68000, bank: 'SBIN0008765 - 55443322110', email: 'neha@oxp.com', phone: '+91 98765 43213', struct: 'Regular Salary' },
  { id: 'emp-5', name: 'Rohan Patel', role: 'employee', job: 'Junior Software Engineer', dept: 'Engineering', mgr: 'Rahul Dravid', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai Tech Hub', type: 'Full-time', wage: 65000, bank: 'KKBK0001928 - 99887766554', email: 'employee@peoplepay360.com', phone: '+91 98765 43219', struct: 'Tech Specialist' },
  { id: 'emp-6', name: 'Vikram Malhotra', role: 'employee', job: 'Principal Architect', dept: 'Engineering', mgr: 'Rahul Dravid', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Bangalore', type: 'Full-time', wage: 220000, bank: 'HDFC0002345 - 11223344556', email: 'vikram.m@peoplepay360.com', phone: '+91 98201 11223', struct: 'Tech Specialist' },
  { id: 'emp-7', name: 'Priya Sharma', role: 'employee', job: 'Senior Product Manager', dept: 'Product Management', mgr: 'Aarav Mehta', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 160000, bank: 'ICIC0003456 - 22334455667', email: 'priya.s@peoplepay360.com', phone: '+91 98202 22334', struct: 'Regular Salary' },
  { id: 'emp-8', name: 'Aditya Kapoor', role: 'employee', job: 'Tech Lead', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Pune', type: 'Full-time', wage: 150000, bank: 'UTIB0004567 - 33445566778', email: 'aditya.k@peoplepay360.com', phone: '+91 98203 33445', struct: 'Tech Specialist' },
  { id: 'emp-9', name: 'Ananya Iyer', role: 'hr_payroll_user', job: 'Senior Financial Analyst', dept: 'Finance & Payroll', mgr: 'Aarav Mehta', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 110000, bank: 'SBIN0005678 - 44556677889', email: 'payrolluser@peoplepay360.com', phone: '+91 98204 44556', struct: 'Regular Salary' },
  { id: 'emp-10', name: 'Rajesh Nair', role: 'employee', job: 'VP of Global Sales', dept: 'Sales & Business Dev', mgr: 'Falguni Nayar', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 240000, bank: 'HDFC0006789 - 55667788990', email: 'rajesh.n@peoplepay360.com', phone: '+91 98205 55667', struct: 'Executive Leadership' },
  { id: 'emp-11', name: 'Sneha Joshi', role: 'employee', job: 'Growth Marketing Lead', dept: 'Marketing & Growth', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 125000, bank: 'ICIC0007890 - 66778899001', email: 'sneha.j@peoplepay360.com', phone: '+91 98206 66778', struct: 'Regular Salary' },
  { id: 'emp-12', name: 'Kabir Deshmukh', role: 'employee', job: 'Head of Customer Experience', dept: 'Customer Success', mgr: 'Sara Khan', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Bangalore', type: 'Full-time', wage: 130000, bank: 'KKBK0008901 - 77889900112', email: 'kabir.d@peoplepay360.com', phone: '+91 98207 77889', struct: 'Regular Salary' },
  { id: 'emp-13', name: 'Meera Sen', role: 'employee', job: 'Frontend Engineer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Kolkata', type: 'Full-time', wage: 82000, bank: 'UTIB0009012 - 88990011223', email: 'meera.s@peoplepay360.com', phone: '+91 98208 88990', struct: 'Tech Specialist' },
  { id: 'emp-14', name: 'Devendra Rao', role: 'employee', job: 'Operations Director', dept: 'Operations & Admin', mgr: 'Falguni Nayar', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Hyderabad', type: 'Full-time', wage: 175000, bank: 'SBIN0000123 - 99001122334', email: 'devendra.r@peoplepay360.com', phone: '+91 98209 99001', struct: 'Executive Leadership' },
  { id: 'emp-15', name: 'Ishaan Bhat', role: 'employee', job: 'DevOps Engineer', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Bangalore', type: 'Full-time', wage: 95000, bank: 'HDFC0001239 - 10293847561', email: 'ishaan.b@peoplepay360.com', phone: '+91 98210 10293', struct: 'Tech Specialist' },
  { id: 'emp-16', name: 'Tanvi Kulkarni', role: 'employee', job: 'QA Lead', dept: 'Quality Assurance', mgr: 'Rahul Dravid', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Pune', type: 'Full-time', wage: 115000, bank: 'ICIC0002348 - 21304958672', email: 'tanvi.k@peoplepay360.com', phone: '+91 98211 21304', struct: 'Regular Salary' },
  { id: 'emp-17', name: 'Siddharth Varma', role: 'employee', job: 'Backend Developer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 88000, bank: 'KKBK0003457 - 32415069783', email: 'siddharth.v@peoplepay360.com', phone: '+91 98212 32415', struct: 'Tech Specialist' },
  { id: 'emp-18', name: 'Pooja Hegde', role: 'employee', job: 'Talent Acquisition Specialist', dept: 'Human Resources', mgr: 'Neha Patel', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Bangalore', type: 'Full-time', wage: 70000, bank: 'UTIB0004566 - 43526170894', email: 'pooja.h@peoplepay360.com', phone: '+91 98213 43526', struct: 'Regular Salary' },
  { id: 'emp-19', name: 'Manav Reddy', role: 'employee', job: 'Enterprise Account Executive', dept: 'Sales & Business Dev', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Hyderabad', type: 'Full-time', wage: 105000, bank: 'SBIN0005675 - 54637281905', email: 'manav.r@peoplepay360.com', phone: '+91 98214 54637', struct: 'Sales Commission' },
  { id: 'emp-20', name: 'Riya Sengupta', role: 'employee', job: 'Legal & Compliance Counsel', dept: 'Legal & Compliance', mgr: 'Sara Khan', ws: 'ws-8', wsName: 'Consulting Flexible 30 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 145000, bank: 'HDFC0006784 - 65748392016', email: 'riya.s@peoplepay360.com', phone: '+91 98215 65748', struct: 'Regular Salary' },
  { id: 'emp-21', name: 'Kunal Roy', role: 'employee', job: 'Cloud Infrastructure Architect', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Bangalore', type: 'Full-time', wage: 185000, bank: 'ICIC0007893 - 76859403127', email: 'kunal.r@peoplepay360.com', phone: '+91 98216 76859', struct: 'Tech Specialist' },
  { id: 'emp-22', name: 'Diya Bansal', role: 'employee', job: 'Accounts Payable Executive', dept: 'Finance & Payroll', mgr: 'Ananya Iyer', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 62000, bank: 'KKBK0008902 - 87960514238', email: 'diya.b@peoplepay360.com', phone: '+91 98217 87960', struct: 'Regular Salary' },
  { id: 'emp-23', name: 'Arjun Singhania', role: 'employee', job: 'UI/UX Designer', dept: 'Product Management', mgr: 'Priya Sharma', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 90000, bank: 'UTIB0009011 - 98071625349', email: 'arjun.s@peoplepay360.com', phone: '+91 98218 98071', struct: 'Regular Salary' },
  { id: 'emp-24', name: 'Shreya Ghoshal', role: 'employee', job: 'Content Strategist', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Kolkata', type: 'Full-time', wage: 75000, bank: 'SBIN0000120 - 09182736450', email: 'shreya.g@peoplepay360.com', phone: '+91 98219 09182', struct: 'Regular Salary' },
  { id: 'emp-25', name: 'Varun Grover', role: 'employee', job: 'Full Stack Engineer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 92000, bank: 'HDFC0001231 - 19283746502', email: 'varun.g@peoplepay360.com', phone: '+91 98220 19283', struct: 'Tech Specialist' },
  { id: 'emp-26', name: 'Kriti Sanon', role: 'employee', job: 'Employee Experience Specialist', dept: 'Human Resources', mgr: 'Sara Khan', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 72000, bank: 'ICIC0002342 - 28374650913', email: 'kriti.s@peoplepay360.com', phone: '+91 98221 28374', struct: 'Regular Salary' },
  { id: 'emp-27', name: 'Nikhil Chinapa', role: 'employee', job: 'Technical Support Engineer', dept: 'Customer Success', mgr: 'Kabir Deshmukh', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Bangalore', type: 'Full-time', wage: 65000, bank: 'KKBK0003453 - 37465091824', email: 'nikhil.c@peoplepay360.com', phone: '+91 98222 37465', struct: 'Regular Salary' },
  { id: 'emp-28', name: 'Alia Bhattacharya', role: 'employee', job: 'Data Engineer', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Kolkata', type: 'Full-time', wage: 98000, bank: 'UTIB0004564 - 46509182735', email: 'alia.b@peoplepay360.com', phone: '+91 98223 46509', struct: 'Tech Specialist' },
  { id: 'emp-29', name: 'Gautam Gambhir', role: 'employee', job: 'Facilities Manager', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 85000, bank: 'SBIN0005675 - 55609182736', email: 'gautam.g@peoplepay360.com', phone: '+91 98224 55609', struct: 'Regular Salary' },
  { id: 'emp-30', name: 'Simran Walia', role: 'employee', job: 'Automation QA Specialist', dept: 'Quality Assurance', mgr: 'Tanvi Kulkarni', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Chandigarh', type: 'Full-time', wage: 78000, bank: 'HDFC0006786 - 64718293047', email: 'simran.w@peoplepay360.com', phone: '+91 98225 64718', struct: 'Regular Salary' },
  { id: 'emp-31', name: 'Tarun Khanna', role: 'employee', job: 'Tax & Regulatory Specialist', dept: 'Finance & Payroll', mgr: 'Aarav Mehta', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 118000, bank: 'ICIC0007897 - 73829104158', email: 'tarun.k@peoplepay360.com', phone: '+91 98226 73829', struct: 'Regular Salary' },
  { id: 'emp-32', name: 'Natasha Poonawalla', role: 'employee', job: 'Inside Sales Representative', dept: 'Sales & Business Dev', mgr: 'Manav Reddy', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Pune', type: 'Full-time', wage: 60000, bank: 'KKBK0008908 - 82930415269', email: 'natasha.p@peoplepay360.com', phone: '+91 98227 82930', struct: 'Sales Commission' },
  { id: 'emp-33', name: 'Pranav Anand', role: 'employee', job: 'Mobile App Developer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Chennai', type: 'Full-time', wage: 84000, bank: 'UTIB0009019 - 91041526370', email: 'pranav.a@peoplepay360.com', phone: '+91 98228 91041', struct: 'Tech Specialist' },
  { id: 'emp-34', name: 'Swati Piramal', role: 'employee', job: 'Digital Media Specialist', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 68000, bank: 'SBIN0000128 - 10293847581', email: 'swati.p@peoplepay360.com', phone: '+91 98229 10293', struct: 'Regular Salary' },
  { id: 'emp-35', name: 'Harsh Vardhan', role: 'employee', job: 'Security & SecOps Analyst', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Bangalore', type: 'Full-time', wage: 110000, bank: 'HDFC0001237 - 21304958692', email: 'harsh.v@peoplepay360.com', phone: '+91 98230 21304', struct: 'Tech Specialist' },
  { id: 'emp-36', name: 'Lavanya Sundaram', role: 'employee', job: 'Treasury Analyst', dept: 'Finance & Payroll', mgr: 'Ananya Iyer', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Chennai', type: 'Full-time', wage: 74000, bank: '', email: 'lavanya.s@peoplepay360.com', phone: '+91 98231 32415', struct: 'Regular Salary' },
  { id: 'emp-37', name: 'Rishi Kapoor', role: 'employee', job: 'Associate Product Manager', dept: 'Product Management', mgr: 'Priya Sharma', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 78000, bank: 'ICIC0002346 - 32415069703', email: 'rishi.k@peoplepay360.com', phone: '+91 98232 43526', struct: 'Regular Salary' },
  { id: 'emp-38', name: 'Avani Chaturvedi', role: 'employee', job: 'Systems Reliability Engineer', dept: 'Engineering', mgr: 'Ishaan Bhat', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Hyderabad', type: 'Full-time', wage: 96000, bank: 'KKBK0003455 - 43526170814', email: 'avani.c@peoplepay360.com', phone: '+91 98233 54637', struct: 'Tech Specialist' },
  { id: 'emp-39', name: 'Mohit Chauhan', role: 'employee', job: 'Regional Sales Manager - West', dept: 'Sales & Business Dev', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Ahmedabad', type: 'Full-time', wage: 135000, bank: 'UTIB0004564 - 54637281925', email: 'mohit.c@peoplepay360.com', phone: '+91 98234 65748', struct: 'Sales Commission' },
  { id: 'emp-40', name: 'Sunita Narain', role: 'employee', job: 'Procurement Executive', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 66000, bank: 'SBIN0005673 - 65748392036', email: 'sunita.n@peoplepay360.com', phone: '+91 98235 76859', struct: 'Regular Salary' },
  { id: 'emp-41', name: 'Rahul Dravid', role: 'employee', job: 'Engineering Manager', dept: 'Engineering', mgr: 'Sara Khan', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Bangalore', type: 'Full-time', wage: 195000, bank: 'HDFC0006782 - 76859403147', email: 'rahul.d@peoplepay360.com', phone: '+91 98236 87960', struct: 'Executive Leadership' },
  { id: 'emp-42', name: 'Fatima Sana', role: 'employee', job: 'Customer Support Specialist', dept: 'Customer Success', mgr: 'Kabir Deshmukh', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Pune', type: 'Full-time', wage: 54000, bank: 'ICIC0007891 - 87960514258', email: 'fatima.s@peoplepay360.com', phone: '+91 98237 98071', struct: 'Regular Salary' },
  { id: 'emp-43', name: 'Chetan Bhagat', role: 'employee', job: 'Copywriter & Brand Strategist', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 64000, bank: 'KKBK0008900 - 98071625369', email: 'chetan.b@peoplepay360.com', phone: '+91 98238 09182', struct: 'Regular Salary' },
  { id: 'emp-44', name: 'Deepinder Goyal', role: 'employee', job: 'Staff Software Engineer', dept: 'Engineering', mgr: 'Rahul Dravid', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 165000, bank: 'UTIB0009019 - 09182736470', email: 'deepinder.g@peoplepay360.com', phone: '+91 98239 10293', struct: 'Tech Specialist' },
  { id: 'emp-45', name: 'Falguni Nayar', role: 'admin', job: 'Chief Financial Officer', dept: 'Finance & Payroll', mgr: 'Sara Khan', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 260000, bank: 'SBIN0000128 - 19283746581', email: 'admin@peoplepay360.com', phone: '+91 98240 21304', struct: 'Executive Leadership' },
  { id: 'emp-46', name: 'Jaspreet Bumrah', role: 'employee', job: 'Performance Testing Engineer', dept: 'Quality Assurance', mgr: 'Tanvi Kulkarni', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Ahmedabad', type: 'Full-time', wage: 86000, bank: 'HDFC0001237 - 28374650992', email: 'jaspreet.b@peoplepay360.com', phone: '+91 98241 32415', struct: 'Regular Salary' },
  { id: 'emp-47', name: 'Vidya Balan', role: 'employee', job: 'People Operations Partner', dept: 'Human Resources', mgr: 'Sara Khan', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 82000, bank: 'ICIC0002346 - 37465091803', email: 'vidya.b@peoplepay360.com', phone: '+91 98242 43526', struct: 'Regular Salary' },
  { id: 'emp-48', name: 'Sachin Tendulkar', role: 'employee', job: 'Director of Strategic Partnerships', dept: 'Sales & Business Dev', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 210000, bank: 'KKBK0003455 - 46509182714', email: 'sachin.t@peoplepay360.com', phone: '+91 98243 54637', struct: 'Executive Leadership' },
  { id: 'emp-49', name: 'Mithali Raj', role: 'employee', job: 'Logistics & Facilities Lead', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Hyderabad', type: 'Full-time', wage: 90000, bank: 'UTIB0004564 - 55609182725', email: 'mithali.r@peoplepay360.com', phone: '+91 98244 65748', struct: 'Regular Salary' },
  { id: 'emp-50', name: 'Boman Irani', role: 'employee', job: 'Internal IT Support Specialist', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 58000, bank: 'SBIN0005673 - 64718293036', email: 'boman.i@peoplepay360.com', phone: '+91 98245 76859', struct: 'Regular Salary' }
];

export function buildData() {
  // 1. Employees (50 records)
  const employees = RAW_EMPLOYEES.map((e, idx) => {
    const initials = e.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
    return {
      id: e.id,
      customId: e.id,
      initials,
      name: e.name,
      jobPosition: e.job,
      department: e.dept,
      manager: e.mgr,
      workingScheduleId: e.ws,
      workingSchedule: e.wsName,
      company: 'OxP Pvt Ltd',
      workLocation: e.loc,
      employmentType: e.type,
      status: 'Active',
      workEmail: e.email,
      phone: e.phone,
      contractsCount: 1,
      attendanceCount: 12 + (idx % 8),
      timeOffCount: 1 + (idx % 4),
      bankAccount: e.bank,
      isBankVerified: !!e.bank
    };
  });

  // 2. Contracts (50 records)
  const contracts = RAW_EMPLOYEES.map((e, idx) => {
    const conNum = `CON/2026/${String(idx + 1).padStart(4, '0')}`;
    const isExpired = idx === 1; // 1 historical contract example
    const startDate = isExpired ? '2025-01-01' : (idx % 2 === 0 ? '2026-01-01' : '2025-07-01');
    const endDate = isExpired ? '2025-12-31' : '';
    const status = isExpired ? 'Expired' : 'Running';

    return {
      id: `con-${idx + 1}`,
      customId: `con-${idx + 1}`,
      contractNumber: conNum,
      employeeId: e.id,
      employeeName: e.name,
      startDate,
      endDate,
      duration: isExpired ? '1 Year (Expired 31-Dec-2025)' : `Ongoing (Started ${startDate})`,
      wage: e.wage,
      status,
      department: e.dept,
      jobPosition: e.job,
      workingScheduleId: e.ws,
      workingSchedule: e.wsName,
      structureType: e.struct,
      notes: `Standard full-time active agreement for ${e.name} in ${e.dept}.`
    };
  });

  // 3. Time Off Allocations (50 records)
  const LEAVE_TYPES = ['Paid Time Off', 'Sick Leave', 'Comp Off', 'Casual Leave'];
  const allocations = RAW_EMPLOYEES.map((e, idx) => {
    const type = LEAVE_TYPES[idx % LEAVE_TYPES.length];
    const allocated = type === 'Comp Off' ? 4 : (type === 'Sick Leave' ? 12 : 20);
    const taken = idx % 5;
    const remaining = allocated - taken;
    const status = idx === 3 ? 'To Approve' : 'Approved';

    return {
      id: `alc-${idx + 1}`,
      customId: `alc-${idx + 1}`,
      employeeId: e.id,
      employeeName: e.name,
      type,
      allocated,
      taken,
      remaining,
      unit: 'Days',
      status,
      validity: '2026 Annual Balance',
      approver: e.mgr || 'Sara Khan',
      description: `${type} balance grant for calendar year 2026.`,
      deductionLog: taken > 0 ? [
        { requestId: `req-${idx + 1}`, duration: taken, date: '15-Aug-2026', note: 'Personal leave approved' }
      ] : []
    };
  });

  // 4. Time Off Requests (50 records)
  const REASONS = [
    'Family vacation and travel',
    'Personal medical consultation and rest',
    'Weekend release overtime comp-off',
    'Home relocation and settlement',
    'Attending family wedding ceremony',
    'Child school admission and parent meeting',
    'Dental surgery and medical appointment',
    'Emergency home maintenance',
    'Severe fever and doctor advised rest',
    'Festive celebration with extended family'
  ];

  const timeOffRequests = RAW_EMPLOYEES.map((e, idx) => {
    const type = LEAVE_TYPES[idx % LEAVE_TYPES.length];
    const duration = 1 + (idx % 3);
    const day = 10 + (idx % 18);
    const dateStr = `2026-09-${String(day).padStart(2, '0')}`;
    const endDateStr = `2026-09-${String(day + duration - 1).padStart(2, '0')}`;
    const status = idx % 6 === 0 ? 'To Approve' : (idx % 15 === 0 ? 'Refused' : 'Approved');

    return {
      id: `req-${idx + 1}`,
      customId: `req-${idx + 1}`,
      employeeId: e.id,
      employeeName: e.name,
      type,
      startDate: dateStr,
      endDate: endDateStr,
      duration,
      status,
      approver: e.mgr || 'Sara Khan',
      allocationUsed: `${type} (2026 Annual Balance)`,
      reason: REASONS[idx % REASONS.length]
    };
  });

  // 5. Attendance (50 records)
  const attendance = RAW_EMPLOYEES.map((e, idx) => {
    const day = 1 + (idx % 5);
    const dateStr = `0${day}-Sep-2026`;
    const isLate = idx % 7 === 0;
    const isAbsent = idx % 19 === 0;
    const isHalf = idx % 11 === 0;

    let checkIn = '09:05';
    let checkOut = '18:10';
    let workedHours = '9.08';
    let status = 'Present';
    let overtime = '0.00 hrs';

    if (isAbsent) {
      checkIn = '—';
      checkOut = '—';
      workedHours = '0.00';
      status = 'Absent';
    } else if (isLate) {
      checkIn = '10:15';
      checkOut = '18:15';
      workedHours = '8.00';
      status = 'Late';
    } else if (isHalf) {
      checkIn = '09:00';
      checkOut = '13:30';
      workedHours = '4.50';
      status = 'Half Day';
    } else if (idx % 3 === 0) {
      overtime = '0.50 hrs';
      checkOut = '18:40';
      workedHours = '9.58';
    }

    return {
      id: `att-${idx + 1}`,
      customId: `att-${idx + 1}`,
      employeeId: e.id,
      employeeName: e.name,
      date: dateStr,
      checkIn,
      checkOut,
      workedHours,
      status,
      department: e.dept,
      manager: e.mgr,
      overtime,
      notes: isAbsent ? 'Unplanned absence / no punch recorded.' : 'Recorded via automated biometric attendance integration.',
      isManuallyEdited: isLate || isHalf
    };
  });

  // 6. Users (50 records)
  const users = RAW_EMPLOYEES.map((e, idx) => {
    return {
      id: `user-${idx + 1}`,
      name: e.name,
      email: e.email.toLowerCase(),
      role: e.role,
      password: 'Demo@123',
      employeeId: e.id
    };
  });

  // 7. Payruns & Payslips (50+ payslips across payrun periods)
  // Create 9 Payruns (Jan to Sep 2026)
  const MONTH_NAMES = [
    { name: 'January 2026', start: '2026-01-01', end: '2026-01-31', status: 'Paid' },
    { name: 'February 2026', start: '2026-02-01', end: '2026-02-28', status: 'Paid' },
    { name: 'March 2026', start: '2026-03-01', end: '2026-03-31', status: 'Paid' },
    { name: 'April 2026', start: '2026-04-01', end: '2026-04-30', status: 'Paid' },
    { name: 'May 2026', start: '2026-05-01', end: '2026-05-31', status: 'Paid' },
    { name: 'June 2026', start: '2026-06-01', end: '2026-06-30', status: 'Paid' },
    { name: 'July 2026', start: '2026-07-01', end: '2026-07-31', status: 'Paid' },
    { name: 'August 2026', start: '2026-08-01', end: '2026-08-31', status: 'Validated' },
    { name: 'September 2026', start: '2026-09-01', end: '2026-09-30', status: 'Draft' }
  ];

  // Distribute 50+ payslips
  const payslips = [];
  let psCounter = 1;

  const payruns = MONTH_NAMES.map((m, mIdx) => {
    // Each month processes a batch of employees
    const batchEmployees = RAW_EMPLOYEES.slice(0, 10 + (mIdx % 15));
    const prId = `pr-${mIdx + 1}`;
    let prWarnings = 0;

    const prPayslips = batchEmployees.map(emp => {
      const psId = `ps-${psCounter++}`;
      const vals = computePayslipValues(emp.wage, emp.struct);
      let warning = '—';
      if (!emp.bank) {
        warning = 'A/C missing';
        prWarnings++;
      }

      const psObj = {
        id: psId,
        customId: psId,
        payrunId: prId,
        payrunName: m.name,
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.dept,
        contractWage: emp.wage,
        workedDays: 22,
        basic: vals.basic,
        gross: vals.gross,
        net: vals.net,
        status: m.status,
        warning,
        lines: [
          { code: 'BASIC', name: 'Basic Salary', category: 'Basic', amount: vals.basic },
          { code: 'GROSS', name: 'Gross Salary', category: 'Gross', amount: vals.gross },
          { code: 'NET', name: 'Net Salary', category: 'Net', amount: vals.net }
        ]
      };

      payslips.push(psObj);
      return {
        id: psId,
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.dept,
        contractWage: emp.wage,
        workedDays: 22,
        basic: vals.basic,
        gross: vals.gross,
        net: vals.net,
        status: m.status,
        warning
      };
    });

    return {
      id: prId,
      customId: prId,
      name: m.name,
      structure: 'Regular Salary',
      periodStart: m.start,
      periodEnd: m.end,
      employeeCount: prPayslips.length,
      status: m.status,
      warningsCount: prWarnings,
      payslips: prPayslips
    };
  });

  return {
    departments: SEED_DEPARTMENTS,
    workingSchedules: SEED_WORKING_SCHEDULES,
    timeOffTypes: SEED_TIMEOFF_TYPES,
    salaryStructures: SEED_SALARY_STRUCTURES,
    employees,
    contracts,
    allocations,
    timeOffRequests,
    attendance,
    users,
    payruns,
    payslips
  };
}

// Generate files if run directly
const data = buildData();
const outputPath = path.join(__dirname, 'masterData.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
console.log(`Generated master dataset successfully!`);
console.log(`- Departments: ${data.departments.length}`);
console.log(`- Working Schedules: ${data.workingSchedules.length}`);
console.log(`- Time Off Types: ${data.timeOffTypes.length}`);
console.log(`- Salary Structures: ${data.salaryStructures.length}`);
console.log(`- Employees: ${data.employees.length}`);
console.log(`- Contracts: ${data.contracts.length}`);
console.log(`- Time Off Allocations: ${data.allocations.length}`);
console.log(`- Time Off Requests: ${data.timeOffRequests.length}`);
console.log(`- Attendance: ${data.attendance.length}`);
console.log(`- Users: ${data.users.length}`);
console.log(`- Payruns: ${data.payruns.length}`);
console.log(`- Payslips: ${data.payslips.length}`);
