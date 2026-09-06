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

// 60 realistic corporate employees
export const RAW_EMPLOYEES = [
  { id: 'emp-1', name: 'Raviraj Dhokiya', role: 'admin', job: 'System Administrator & Managing Director', dept: 'Operations & Admin', mgr: 'Board of Directors', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai Head Office', type: 'Full-time', wage: 250000, bank: 'HDFC0001001 - 98765432001', email: 'admin@peoplepay360.com', phone: '+91 98765 00001', struct: 'Executive Leadership' },
  { id: 'emp-2', name: 'Meet Rathod', role: 'hr_manager', job: 'HR Manager', dept: 'Human Resources', mgr: 'Raviraj Dhokiya', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai Head Office', type: 'Full-time', wage: 110000, bank: 'ICIC0001002 - 98765432002', email: 'hrmanager@peoplepay360.com', phone: '+91 98765 00002', struct: 'Regular Salary' },
  { id: 'emp-3', name: 'Neev Chovatiya', role: 'hr_payroll_user', job: 'HR Payroll Specialist', dept: 'Finance & Payroll', mgr: 'Ujjwal Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai Head Office', type: 'Full-time', wage: 90000, bank: 'SBIN0001003 - 98765432003', email: 'payrolluser@peoplepay360.com', phone: '+91 98765 00003', struct: 'Regular Salary' },
  { id: 'emp-4', name: 'Ujjwal Rathod', role: 'hr_payroll_manager', job: 'HR Payroll Manager', dept: 'Finance & Payroll', mgr: 'Raviraj Dhokiya', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai Head Office', type: 'Full-time', wage: 160000, bank: 'KKBK0001004 - 98765432004', email: 'payrollmanager@peoplepay360.com', phone: '+91 98765 00004', struct: 'Regular Salary' },
  { id: 'emp-5', name: 'Parth Solanki', role: 'employee', job: 'Senior Software Engineer', dept: 'Engineering', mgr: 'Meet Rathod', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai Tech Hub', type: 'Full-time', wage: 85000, bank: 'UTIB0001005 - 98765432005', email: 'employee@peoplepay360.com', phone: '+91 98765 00005', struct: 'Tech Specialist' },
  { id: 'emp-6', name: 'Ayush Moradiya', role: 'employee', job: 'Backend Systems Engineer', dept: 'Engineering', mgr: 'Meet Rathod', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Pune Tech Hub', type: 'Full-time', wage: 82000, bank: 'HDFC0001006 - 98765432006', email: 'ayush@peoplepay360.com', phone: '+91 98765 00006', struct: 'Tech Specialist' },
  { id: 'emp-7', name: 'Krish Palat', role: 'employee', job: 'Full Stack Developer', dept: 'Engineering', mgr: 'Meet Rathod', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Bangalore Engineering Hub', type: 'Full-time', wage: 78000, bank: 'ICIC0001007 - 98765432007', email: 'krish@peoplepay360.com', phone: '+91 98765 00007', struct: 'Tech Specialist' },
  { id: 'emp-8', name: 'Rooney', role: 'employee', job: 'QA Automation Specialist', dept: 'Quality Assurance', mgr: 'Tanvi Kulkarni', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai Tech Hub', type: 'Full-time', wage: 75000, bank: 'SBIN0001008 - 98765432008', email: 'rooney@peoplepay360.com', phone: '+91 98765 00008', struct: 'Regular Salary' },
  { id: 'emp-9', name: 'Aarav Mehta', role: 'hr_payroll_user', job: 'Senior Payroll Specialist', dept: 'Finance & Payroll', mgr: 'Ujjwal Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 95000, bank: 'HDFC0002345 - 11223344556', email: 'aarav.m@peoplepay360.com', phone: '+91 98201 11223', struct: 'Regular Salary' },
  { id: 'emp-10', name: 'Sara Khan', role: 'hr_manager', job: 'Senior HR Business Partner', dept: 'Human Resources', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Bangalore', type: 'Full-time', wage: 105000, bank: 'ICIC0003456 - 22334455667', email: 'sara.k@peoplepay360.com', phone: '+91 98202 22334', struct: 'Regular Salary' },
  { id: 'emp-11', name: 'Vikram Malhotra', role: 'employee', job: 'Principal Cloud Architect', dept: 'Engineering', mgr: 'Meet Rathod', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Bangalore', type: 'Full-time', wage: 220000, bank: 'UTIB0004567 - 33445566778', email: 'vikram.m@peoplepay360.com', phone: '+91 98203 33445', struct: 'Tech Specialist' },
  { id: 'emp-12', name: 'Priya Sharma', role: 'employee', job: 'Head of Product Management', dept: 'Product Management', mgr: 'Raviraj Dhokiya', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 175000, bank: 'SBIN0005678 - 44556677889', email: 'priya.s@peoplepay360.com', phone: '+91 98204 44556', struct: 'Executive Leadership' },
  { id: 'emp-13', name: 'Rajesh Nair', role: 'employee', job: 'VP of Enterprise Sales', dept: 'Sales & Business Dev', mgr: 'Raviraj Dhokiya', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 230000, bank: 'HDFC0006789 - 55667788990', email: 'rajesh.n@peoplepay360.com', phone: '+91 98205 55667', struct: 'Executive Leadership' },
  { id: 'emp-14', name: 'Sneha Joshi', role: 'employee', job: 'Head of Brand & Growth Marketing', dept: 'Marketing & Growth', mgr: 'Raviraj Dhokiya', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 140000, bank: 'ICIC0007890 - 66778899001', email: 'sneha.j@peoplepay360.com', phone: '+91 98206 66778', struct: 'Regular Salary' },
  { id: 'emp-15', name: 'Kabir Deshmukh', role: 'employee', job: 'Director of Customer Experience', dept: 'Customer Success', mgr: 'Raviraj Dhokiya', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Bangalore', type: 'Full-time', wage: 135000, bank: 'KKBK0008901 - 77889900112', email: 'kabir.d@peoplepay360.com', phone: '+91 98207 77889', struct: 'Regular Salary' },
  { id: 'emp-16', name: 'Devendra Rao', role: 'employee', job: 'Director of Corporate Operations', dept: 'Operations & Admin', mgr: 'Raviraj Dhokiya', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Hyderabad', type: 'Full-time', wage: 170000, bank: 'UTIB0009012 - 88990011223', email: 'devendra.r@peoplepay360.com', phone: '+91 98208 88990', struct: 'Executive Leadership' },
  { id: 'emp-17', name: 'Tanvi Kulkarni', role: 'employee', job: 'Quality Assurance Lead', dept: 'Quality Assurance', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Pune', type: 'Full-time', wage: 120000, bank: 'SBIN0000123 - 99001122334', email: 'tanvi.k@peoplepay360.com', phone: '+91 98209 99001', struct: 'Regular Salary' },
  { id: 'emp-18', name: 'Riya Sengupta', role: 'employee', job: 'Lead Legal & Compliance Counsel', dept: 'Legal & Compliance', mgr: 'Raviraj Dhokiya', ws: 'ws-8', wsName: 'Consulting Flexible 30 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 155000, bank: 'HDFC0001239 - 10293847561', email: 'riya.s@peoplepay360.com', phone: '+91 98210 10293', struct: 'Regular Salary' },
  { id: 'emp-19', name: 'Aditya Kapoor', role: 'employee', job: 'Engineering Lead', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Pune', type: 'Full-time', wage: 150000, bank: 'ICIC0002348 - 21304958672', email: 'aditya.k@peoplepay360.com', phone: '+91 98211 21304', struct: 'Tech Specialist' },
  { id: 'emp-20', name: 'Ananya Iyer', role: 'employee', job: 'Senior Financial Analyst', dept: 'Finance & Payroll', mgr: 'Ujjwal Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 92000, bank: 'KKBK0003457 - 32415069783', email: 'ananya.i@peoplepay360.com', phone: '+91 98212 32415', struct: 'Regular Salary' },
  { id: 'emp-21', name: 'Siddharth Varma', role: 'employee', job: 'Backend Microservices Developer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 90000, bank: 'UTIB0004566 - 43526170894', email: 'siddharth.v@peoplepay360.com', phone: '+91 98213 43526', struct: 'Tech Specialist' },
  { id: 'emp-22', name: 'Pooja Hegde', role: 'employee', job: 'Senior Technical Recruiter', dept: 'Human Resources', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Bangalore', type: 'Full-time', wage: 72000, bank: 'SBIN0005675 - 54637281905', email: 'pooja.h@peoplepay360.com', phone: '+91 98214 54637', struct: 'Regular Salary' },
  { id: 'emp-23', name: 'Manav Reddy', role: 'employee', job: 'Strategic Account Executive', dept: 'Sales & Business Dev', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Hyderabad', type: 'Full-time', wage: 110000, bank: 'HDFC0006784 - 65748392016', email: 'manav.r@peoplepay360.com', phone: '+91 98215 65748', struct: 'Sales Commission' },
  { id: 'emp-24', name: 'Diya Bansal', role: 'employee', job: 'Accounts Payable Specialist', dept: 'Finance & Payroll', mgr: 'Aarav Mehta', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 65000, bank: 'ICIC0007893 - 76859403127', email: 'diya.b@peoplepay360.com', phone: '+91 98216 76859', struct: 'Regular Salary' },
  { id: 'emp-25', name: 'Arjun Singhania', role: 'employee', job: 'Lead UI/UX Designer', dept: 'Product Management', mgr: 'Priya Sharma', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 95000, bank: 'KKBK0008902 - 87960514238', email: 'arjun.s@peoplepay360.com', phone: '+91 98217 87960', struct: 'Regular Salary' },
  { id: 'emp-26', name: 'Shreya Ghoshal', role: 'employee', job: 'Content Strategy Specialist', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Kolkata', type: 'Full-time', wage: 78000, bank: 'UTIB0009011 - 98071625349', email: 'shreya.g@peoplepay360.com', phone: '+91 98218 98071', struct: 'Regular Salary' },
  { id: 'emp-27', name: 'Varun Grover', role: 'employee', job: 'Full Stack Engineer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 94000, bank: 'SBIN0000120 - 09182736450', email: 'varun.g@peoplepay360.com', phone: '+91 98219 09182', struct: 'Tech Specialist' },
  { id: 'emp-28', name: 'Kriti Sanon', role: 'employee', job: 'Employee Engagement Partner', dept: 'Human Resources', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 76000, bank: 'HDFC0001231 - 19283746502', email: 'kriti.s@peoplepay360.com', phone: '+91 98220 19283', struct: 'Regular Salary' },
  { id: 'emp-29', name: 'Nikhil Chinapa', role: 'employee', job: 'Technical Support Specialist', dept: 'Customer Success', mgr: 'Kabir Deshmukh', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Bangalore', type: 'Full-time', wage: 68000, bank: 'ICIC0002342 - 28374650913', email: 'nikhil.c@peoplepay360.com', phone: '+91 98221 28374', struct: 'Regular Salary' },
  { id: 'emp-30', name: 'Alia Bhattacharya', role: 'employee', job: 'Data Pipeline Engineer', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Kolkata', type: 'Full-time', wage: 98000, bank: 'KKBK0003453 - 37465091824', email: 'alia.b@peoplepay360.com', phone: '+91 98222 37465', struct: 'Tech Specialist' },
  { id: 'emp-31', name: 'Gautam Gambhir', role: 'employee', job: 'Senior Facilities Manager', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 88000, bank: 'UTIB0004564 - 46509182735', email: 'gautam.g@peoplepay360.com', phone: '+91 98223 46509', struct: 'Regular Salary' },
  { id: 'emp-32', name: 'Simran Walia', role: 'employee', job: 'Automation Test Specialist', dept: 'Quality Assurance', mgr: 'Tanvi Kulkarni', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Chandigarh', type: 'Full-time', wage: 80000, bank: 'SBIN0005675 - 55609182736', email: 'simran.w@peoplepay360.com', phone: '+91 98224 55609', struct: 'Regular Salary' },
  { id: 'emp-33', name: 'Tarun Khanna', role: 'employee', job: 'Tax & Statutory Compliance Officer', dept: 'Finance & Payroll', mgr: 'Ujjwal Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 125000, bank: 'HDFC0006786 - 64718293047', email: 'tarun.k@peoplepay360.com', phone: '+91 98225 64718', struct: 'Regular Salary' },
  { id: 'emp-34', name: 'Natasha Poonawalla', role: 'employee', job: 'Inside Sales Representative', dept: 'Sales & Business Dev', mgr: 'Manav Reddy', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Pune', type: 'Full-time', wage: 65000, bank: 'ICIC0007897 - 73829104158', email: 'natasha.p@peoplepay360.com', phone: '+91 98226 73829', struct: 'Sales Commission' },
  { id: 'emp-35', name: 'Pranav Anand', role: 'employee', job: 'Mobile iOS/Android Engineer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Chennai', type: 'Full-time', wage: 88000, bank: 'KKBK0008908 - 82930415269', email: 'pranav.a@peoplepay360.com', phone: '+91 98227 82930', struct: 'Tech Specialist' },
  { id: 'emp-36', name: 'Swati Piramal', role: 'employee', job: 'Performance Marketing Specialist', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 70000, bank: 'UTIB0009019 - 91041526370', email: 'swati.p@peoplepay360.com', phone: '+91 98228 91041', struct: 'Regular Salary' },
  { id: 'emp-37', name: 'Harsh Vardhan', role: 'employee', job: 'Security Operations Engineer', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Bangalore', type: 'Full-time', wage: 115000, bank: 'SBIN0000128 - 10293847581', email: 'harsh.v@peoplepay360.com', phone: '+91 98229 10293', struct: 'Tech Specialist' },
  { id: 'emp-38', name: 'Lavanya Sundaram', role: 'employee', job: 'Treasury Management Executive', dept: 'Finance & Payroll', mgr: 'Aarav Mehta', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Chennai', type: 'Full-time', wage: 76000, bank: 'HDFC0001237 - 21304958692', email: 'lavanya.s@peoplepay360.com', phone: '+91 98230 21304', struct: 'Regular Salary' },
  { id: 'emp-39', name: 'Rishi Kapoor', role: 'employee', job: 'Associate Product Manager', dept: 'Product Management', mgr: 'Priya Sharma', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 80000, bank: 'ICIC0002346 - 32415069703', email: 'rishi.k@peoplepay360.com', phone: '+91 98231 32415', struct: 'Regular Salary' },
  { id: 'emp-40', name: 'Avani Chaturvedi', role: 'employee', job: 'Site Reliability Engineer', dept: 'Engineering', mgr: 'Harsh Vardhan', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Hyderabad', type: 'Full-time', wage: 98000, bank: 'KKBK0003455 - 43526170814', email: 'avani.c@peoplepay360.com', phone: '+91 98232 43526', struct: 'Tech Specialist' },
  { id: 'emp-41', name: 'Mohit Chauhan', role: 'employee', job: 'Regional Sales Manager - West', dept: 'Sales & Business Dev', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Ahmedabad', type: 'Full-time', wage: 140000, bank: 'UTIB0004564 - 54637281925', email: 'mohit.c@peoplepay360.com', phone: '+91 98233 54637', struct: 'Sales Commission' },
  { id: 'emp-42', name: 'Sunita Narain', role: 'employee', job: 'Senior Procurement Executive', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 70000, bank: 'SBIN0005673 - 65748392036', email: 'sunita.n@peoplepay360.com', phone: '+91 98234 65748', struct: 'Regular Salary' },
  { id: 'emp-43', name: 'Rahul Dravid', role: 'employee', job: 'Senior Engineering Manager', dept: 'Engineering', mgr: 'Meet Rathod', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Bangalore', type: 'Full-time', wage: 200000, bank: 'HDFC0006782 - 76859403147', email: 'rahul.d@peoplepay360.com', phone: '+91 98235 76859', struct: 'Executive Leadership' },
  { id: 'emp-44', name: 'Fatima Sana', role: 'employee', job: 'Customer Support Engineer', dept: 'Customer Success', mgr: 'Kabir Deshmukh', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Pune', type: 'Full-time', wage: 58000, bank: 'ICIC0007891 - 87960514258', email: 'fatima.s@peoplepay360.com', phone: '+91 98236 87960', struct: 'Regular Salary' },
  { id: 'emp-45', name: 'Rohan Patel', role: 'employee', job: 'Frontend Developer', dept: 'Engineering', mgr: 'Aditya Kapoor', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Ahmedabad Tech Hub', type: 'Full-time', wage: 68000, bank: 'KKBK0008900 - 98071625369', email: 'rohan.p@peoplepay360.com', phone: '+91 98237 98071', struct: 'Tech Specialist' },
  { id: 'emp-46', name: 'Chetan Bhagat', role: 'employee', job: 'Brand Communications Lead', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 68000, bank: 'UTIB0009019 - 09182736470', email: 'chetan.b@peoplepay360.com', phone: '+91 98238 09182', struct: 'Regular Salary' },
  { id: 'emp-47', name: 'Deepinder Goyal', role: 'employee', job: 'Staff Architect', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 170000, bank: 'SBIN0000128 - 19283746581', email: 'deepinder.g@peoplepay360.com', phone: '+91 98239 10293', struct: 'Tech Specialist' },
  { id: 'emp-48', name: 'Jaspreet Bumrah', role: 'employee', job: 'Performance Engineering Lead', dept: 'Quality Assurance', mgr: 'Tanvi Kulkarni', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Ahmedabad', type: 'Full-time', wage: 90000, bank: 'HDFC0001237 - 28374650992', email: 'jaspreet.b@peoplepay360.com', phone: '+91 98240 21304', struct: 'Regular Salary' },
  { id: 'emp-49', name: 'Vidya Balan', role: 'employee', job: 'People Operations Executive', dept: 'Human Resources', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 84000, bank: 'ICIC0002346 - 37465091803', email: 'vidya.b@peoplepay360.com', phone: '+91 98241 32415', struct: 'Regular Salary' },
  { id: 'emp-50', name: 'Sachin Tendulkar', role: 'employee', job: 'VP of Strategic Partnerships', dept: 'Sales & Business Dev', mgr: 'Rajesh Nair', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 215000, bank: 'KKBK0003455 - 46509182714', email: 'sachin.t@peoplepay360.com', phone: '+91 98242 43526', struct: 'Executive Leadership' },
  { id: 'emp-51', name: 'Mithali Raj', role: 'employee', job: 'Workplace Experience Manager', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Hyderabad', type: 'Full-time', wage: 92000, bank: 'UTIB0004564 - 55609182725', email: 'mithali.r@peoplepay360.com', phone: '+91 98243 54637', struct: 'Regular Salary' },
  { id: 'emp-52', name: 'Boman Irani', role: 'employee', job: 'Corporate IT Support Specialist', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 62000, bank: 'SBIN0005673 - 64718293036', email: 'boman.i@peoplepay360.com', phone: '+91 98244 65748', struct: 'Regular Salary' },
  { id: 'emp-53', name: 'Kunal Roy', role: 'employee', job: 'Cloud Infrastructure Specialist', dept: 'Engineering', mgr: 'Vikram Malhotra', ws: 'ws-7', wsName: 'DevOps 24x7 Rota', loc: 'Bangalore', type: 'Full-time', wage: 110000, bank: 'HDFC0001053 - 98765432053', email: 'kunal.r@peoplepay360.com', phone: '+91 98245 76859', struct: 'Tech Specialist' },
  { id: 'emp-54', name: 'Zoya Akhtar', role: 'employee', job: 'Digital Media Producer', dept: 'Marketing & Growth', mgr: 'Sneha Joshi', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 82000, bank: 'ICIC0001054 - 98765432054', email: 'zoya.a@peoplepay360.com', phone: '+91 98246 87960', struct: 'Regular Salary' },
  { id: 'emp-55', name: 'Farhan Akhtar', role: 'employee', job: 'Creative Design Director', dept: 'Product Management', mgr: 'Priya Sharma', ws: 'ws-2', wsName: 'Tech Flexible 35 Hours', loc: 'Mumbai', type: 'Full-time', wage: 130000, bank: 'KKBK0001055 - 98765432055', email: 'farhan.a@peoplepay360.com', phone: '+91 98247 98071', struct: 'Regular Salary' },
  { id: 'emp-56', name: 'Kareena Kapoor', role: 'employee', job: 'Talent Acquisition Specialist', dept: 'Human Resources', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 75000, bank: 'UTIB0001056 - 98765432056', email: 'kareena.k@peoplepay360.com', phone: '+91 98248 09182', struct: 'Regular Salary' },
  { id: 'emp-57', name: 'Shahid Kapoor', role: 'employee', job: 'Enterprise Client Success Specialist', dept: 'Customer Success', mgr: 'Kabir Deshmukh', ws: 'ws-4', wsName: 'Extended Support 45 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 72000, bank: 'SBIN0001057 - 98765432057', email: 'shahid.k@peoplepay360.com', phone: '+91 98249 10293', struct: 'Regular Salary' },
  { id: 'emp-58', name: 'Anushka Sharma', role: 'employee', job: 'Corporate Governance Specialist', dept: 'Legal & Compliance', mgr: 'Riya Sengupta', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Bangalore', type: 'Full-time', wage: 95000, bank: 'HDFC0001058 - 98765432058', email: 'anushka.s@peoplepay360.com', phone: '+91 98250 21304', struct: 'Regular Salary' },
  { id: 'emp-59', name: 'Virat Kohli', role: 'employee', job: 'Director of Fitness & Wellness', dept: 'Human Resources', mgr: 'Meet Rathod', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Delhi NCR', type: 'Full-time', wage: 125000, bank: 'ICIC0001059 - 98765432059', email: 'virat.k@peoplepay360.com', phone: '+91 98251 32415', struct: 'Regular Salary' },
  { id: 'emp-60', name: 'Smriti Mandhana', role: 'employee', job: 'Operations Excellence Lead', dept: 'Operations & Admin', mgr: 'Devendra Rao', ws: 'ws-1', wsName: 'Standard 40 Hours', loc: 'Mumbai', type: 'Full-time', wage: 98000, bank: 'KKBK0001060 - 98765432060', email: 'smriti.m@peoplepay360.com', phone: '+91 98252 43526', struct: 'Regular Salary' }
];

export function buildData() {
  console.log('[Generator] Building 60 Interconnected Master HRMS Records...');

  // 1. Employees (60 records)
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
      attendanceCount: 45,
      timeOffCount: 2,
      bankAccount: e.bank,
      isBankVerified: !!e.bank
    };
  });

  // 2. Contracts (60 records)
  const contracts = RAW_EMPLOYEES.map((e, idx) => {
    const conNum = `CON/2026/${String(idx + 1).padStart(4, '0')}`;
    const isExpired = idx === 51; // 1 historical contract example
    const isDraft = idx === 59;   // 1 draft contract example
    const startDate = isExpired ? '2025-01-01' : (idx % 2 === 0 ? '2026-01-01' : '2025-07-01');
    const endDate = isExpired ? '2025-12-31' : '';
    const status = isExpired ? 'Expired' : (isDraft ? 'Draft' : 'Running');

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

  // 3. Time Off Allocations (60 records)
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
      approver: e.mgr && e.mgr !== 'Board of Directors' ? e.mgr : 'Meet Rathod',
      description: `${type} balance grant for calendar year 2026.`,
      deductionLog: taken > 0 ? [
        { requestId: `req-${idx + 1}`, duration: taken, date: '15-Aug-2026', note: 'Personal leave approved' }
      ] : []
    };
  });

  // 4. Time Off Requests (60 records)
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
      approver: e.mgr && e.mgr !== 'Board of Directors' ? e.mgr : 'Meet Rathod',
      allocationUsed: `${type} (2026 Annual Balance)`,
      reason: REASONS[idx % REASONS.length]
    };
  });

  // 5. Attendance (~2,700 records: multi-month history across July, August, September 2026)
  // Working days:
  // July 2026: 1 to 31 (23 working days Mon-Fri)
  // August 2026: 1 to 31 (21 working days Mon-Fri)
  // September 2026: 1 to 5 (5 working days)
  const workingDays = [];
  const months = [
    { year: 2026, month: 6, days: 31, shortName: 'Jul' }, // month 6 = July in JS Date
    { year: 2026, month: 7, days: 31, shortName: 'Aug' }, // month 7 = August
    { year: 2026, month: 8, days: 5, shortName: 'Sep' }   // month 8 = September (first 5 days)
  ];

  months.forEach(m => {
    for (let d = 1; d <= m.days; d++) {
      const dt = new Date(m.year, m.month, d);
      const dayOfWeek = dt.getDay(); // 0 = Sun, 6 = Sat
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Mon-Fri
        const dayPadded = String(d).padStart(2, '0');
        workingDays.push({
          dateStr: `${dayPadded}-${m.shortName}-${m.year}`,
          rawDate: dt
        });
      }
    }
  });

  console.log(`[Generator] Generating attendance for ${RAW_EMPLOYEES.length} employees across ${workingDays.length} working days...`);
  const attendance = [];
  let attCounter = 1;

  RAW_EMPLOYEES.forEach((e, empIdx) => {
    workingDays.forEach((wd, wdIdx) => {
      // Deterministic realistic variance
      const seed = (empIdx * 17 + wdIdx * 31) % 100;
      let checkIn = '09:05';
      let checkOut = '18:10';
      let workedHours = '9.08';
      let status = 'Present';
      let overtime = '0.00 hrs';
      let notes = 'Recorded via automated biometric attendance integration.';

      if (seed < 4) { // 4% Absent
        checkIn = '—';
        checkOut = '—';
        workedHours = '0.00';
        status = 'Absent';
        notes = 'Unplanned absence / no punch recorded.';
      } else if (seed < 8) { // 4% Half Day
        checkIn = '09:00';
        checkOut = '13:30';
        workedHours = '4.50';
        status = 'Half Day';
        notes = 'Half day leave approved by manager.';
      } else if (seed < 15) { // 7% Late
        checkIn = '10:15';
        checkOut = '18:15';
        workedHours = '8.00';
        status = 'Late';
        notes = 'Late arrival due to public transit delay.';
      } else { // 85% Present
        status = 'Present';
        const minVariance = (seed % 10) - 5;
        const inMin = 9 * 60 + 5 + minVariance;
        const outMin = 18 * 60 + 10 + (seed % 25);
        const durationHours = ((outMin - inMin) / 60).toFixed(2);
        workedHours = String(durationHours);

        const inH = String(Math.floor(inMin / 60)).padStart(2, '0');
        const inM = String(inMin % 60).padStart(2, '0');
        const outH = String(Math.floor(outMin / 60)).padStart(2, '0');
        const outM = String(outMin % 60).padStart(2, '0');

        checkIn = `${inH}:${inM}`;
        checkOut = `${outH}:${outM}`;

        if (outMin > 18 * 60 + 30) {
          const otM = outMin - 18 * 60;
          overtime = `${(otM / 60).toFixed(2)} hrs`;
        }
      }

      attendance.push({
        id: `att-${attCounter}`,
        customId: `att-${attCounter}`,
        employeeId: e.id,
        employeeName: e.name,
        date: wd.dateStr,
        checkIn,
        checkOut,
        workedHours,
        status,
        department: e.dept,
        manager: e.mgr,
        overtime,
        notes,
        isManuallyEdited: status === 'Late' || status === 'Half Day'
      });
      attCounter++;
    });
  });

  // 6. Users (60+ records with full credentials)
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

  // 7. Payruns (3 monthly batches) & Payslips (180 records across all 60 employees)
  const MONTH_NAMES = [
    { name: 'July 2026', start: '2026-07-01', end: '2026-07-31', status: 'Paid' },
    { name: 'August 2026', start: '2026-08-01', end: '2026-08-31', status: 'Paid' },
    { name: 'September 2026', start: '2026-09-01', end: '2026-09-30', status: 'Draft' }
  ];

  const payslips = [];
  let psCounter = 1;

  const payruns = MONTH_NAMES.map((m, mIdx) => {
    const prId = `pr-${mIdx + 1}`;
    let prWarnings = 0;

    const prPayslips = RAW_EMPLOYEES.map(emp => {
      const psId = `ps-${psCounter++}`;
      const vals = computePayslipValues(emp.wage, emp.struct);
      let warning = '—';
      if (!emp.bank) {
        warning = 'A/C missing';
        prWarnings++;
      }

      const basicNum = vals.basic;
      const grossNum = vals.gross;
      const netNum = vals.net;
      const hraNum = Math.round(basicNum * 0.40);
      const allowNum = Math.max(0, grossNum - basicNum - hraNum);
      const pfNum = Math.round(basicNum * 0.12);
      const ptNum = 3000;
      const tdsNum = Math.max(0, grossNum - netNum - pfNum - ptNum);

      const lines = [
        { code: 'BASIC', name: 'Basic Salary (50%)', category: 'Basic', amount: basicNum },
        { code: 'HRA', name: 'House Rent Allowance (40%)', category: 'Allowance', amount: hraNum }
      ];
      if (allowNum > 0) {
        lines.push({ code: 'ALLOW', name: 'Special Allowance', category: 'Allowance', amount: allowNum });
      }
      lines.push({ code: 'GROSS', name: 'Gross Salary', category: 'Gross', amount: grossNum });
      lines.push({ code: 'PF', name: 'Provident Fund (12%)', category: 'Deduction', amount: pfNum });
      lines.push({ code: 'PT', name: 'Professional Tax', category: 'Deduction', amount: ptNum });
      if (tdsNum > 0) {
        lines.push({ code: 'TDS', name: 'Tax Deducted at Source (TDS)', category: 'Deduction', amount: tdsNum });
      }
      lines.push({ code: 'NET', name: 'Net Salary', category: 'Net', amount: netNum });

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
        basic: basicNum,
        gross: grossNum,
        net: netNum,
        status: m.status,
        warning,
        lines
      };

      payslips.push(psObj);
      return {
        id: psId,
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.dept,
        contractWage: emp.wage,
        workedDays: 22,
        basic: basicNum,
        gross: grossNum,
        net: netNum,
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
console.log(`[Generator] ✓ Master Data written successfully to ${outputPath}`);
console.log(`[Counts]:
  - Departments: ${data.departments.length}
  - Working Schedules: ${data.workingSchedules.length}
  - Time Off Types: ${data.timeOffTypes.length}
  - Salary Structures: ${data.salaryStructures.length}
  - Employees: ${data.employees.length}
  - Contracts: ${data.contracts.length}
  - Allocations: ${data.allocations.length}
  - Time Off Requests: ${data.timeOffRequests.length}
  - Attendance Records: ${data.attendance.length}
  - Users: ${data.users.length}
  - Payruns: ${data.payruns.length}
  - Payslips: ${data.payslips.length}
`);
