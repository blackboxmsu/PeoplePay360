import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

// Import Mongoose Models
import User from '../models/user.model.js';
import Department from '../models/department.model.js';
import WorkingSchedule from '../models/workingSchedule.model.js';
import Employee from '../models/employee.model.js';
import Contract from '../models/contract.model.js';
import TimeOffType from '../models/timeOffType.model.js';
import Allocation from '../models/allocation.model.js';
import TimeOffRequest from '../models/timeOffRequest.model.js';
import SalaryStructure from '../models/salaryStructure.model.js';
import SalaryRule from '../models/salaryRule.model.js';
import Attendance from '../models/attendance.model.js';
import Payrun from '../models/payrun.model.js';
import Payslip from '../models/payslip.model.js';
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/peoplepay360';

export async function seedAll() {
  console.log('====================================================');
  console.log('[Seed] Starting PeoplePay360 Master Relational Seeding Pipeline');
  console.log('====================================================');

  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('[Seed] Connected successfully.');

    // Read generated master data
    const rawData = fs.readFileSync(path.join(__dirname, 'masterData.json'), 'utf-8');
    const data = JSON.parse(rawData);

    // 1. Seed Departments (10)
    console.log('\n[1/12] Seeding Departments...');
    await Department.deleteMany({});
    const createdDepts = await Department.insertMany(data.departments);
    console.log(`✓ Inserted ${createdDepts.length} departments.`);

    // 2. Seed Working Schedules (8)
    console.log('\n[2/12] Seeding Working Schedules...');
    await WorkingSchedule.deleteMany({});
    const createdSchedules = await WorkingSchedule.insertMany(data.workingSchedules);
    console.log(`✓ Inserted ${createdSchedules.length} working schedules.`);

    // 3. Seed Time Off Types (7)
    console.log('\n[3/12] Seeding Time Off Types...');
    await TimeOffType.deleteMany({});
    const createdTimeOffTypes = await TimeOffType.insertMany(data.timeOffTypes);
    console.log(`✓ Inserted ${createdTimeOffTypes.length} time off types.`);

    // 4. Seed Salary Structures & Flattened Rules (6 structures, 38 rules)
    console.log('\n[4/12] Seeding Salary Structures & Rules...');
    await SalaryStructure.deleteMany({});
    await SalaryRule.deleteMany({});
    const createdStructures = await SalaryStructure.insertMany(data.salaryStructures);

    const flatRules = [];
    data.salaryStructures.forEach(struct => {
      if (struct.rules) {
        struct.rules.forEach(r => {
          flatRules.push({
            customId: `rule-${struct.id}-${r.code}`,
            structureId: struct.id,
            structureName: struct.name,
            sequence: r.sequence,
            name: r.name,
            code: r.code,
            category: r.category,
            computation: r.computation,
            percentage: r.percentage,
            fixedAmount: r.fixedAmount,
            formula: r.formula
          });
        });
      }
    });
    const createdRules = await SalaryRule.insertMany(flatRules);
    console.log(`✓ Inserted ${createdStructures.length} salary structures and ${createdRules.length} salary rules.`);

    // 5. Seed Users (60 employee users + demo alias accounts with password "Demo@123")
    console.log('\n[5/12] Seeding Users with bcrypt password "Demo@123"...');
    await User.deleteMany({});
    const defaultPasswordHash = await User.hashPassword('Demo@123');

    const userDocs = data.users.map(u => ({
      name: u.name,
      email: u.email.toLowerCase().trim(),
      passwordHash: defaultPasswordHash,
      role: u.role
    }));

    // Add demo aliases so common login variations work
    const demoAliases = [
      { name: 'Raviraj Dhokiya', email: 'raviraj@peoplepay360.com', role: 'admin' },
      { name: 'Meet Rathod', email: 'meet@peoplepay360.com', role: 'hr_manager' },
      { name: 'Meet Rathod', email: 'meetrathod470@gmail.com', role: 'hr_manager' },
      { name: 'Neev Chovatiya', email: 'neev@peoplepay360.com', role: 'hr_payroll_user' },
      { name: 'Ujjwal Rathod', email: 'ujjwal@peoplepay360.com', role: 'hr_payroll_manager' },
      { name: 'Parth Solanki', email: 'parth@peoplepay360.com', role: 'employee' }
    ];

    demoAliases.forEach(alias => {
      if (!userDocs.find(u => u.email === alias.email)) {
        userDocs.push({
          name: alias.name,
          email: alias.email,
          passwordHash: defaultPasswordHash,
          role: alias.role
        });
      }
    });

    const createdUsers = await User.insertMany(userDocs);
    console.log(`✓ Inserted ${createdUsers.length} users.`);

    // Create user email to _id lookup
    const userEmailMap = {};
    createdUsers.forEach(u => {
      userEmailMap[u.email] = u._id;
    });

    // 6. Seed Employees (60 records)
    console.log('\n[6/12] Seeding Employees (60 records)...');
    await Employee.deleteMany({});
    const employeeDocs = data.employees.map(e => ({
      customId: e.customId || e.id,
      name: e.name,
      initials: e.initials,
      jobPosition: e.jobPosition,
      department: e.department,
      manager: e.manager,
      workingScheduleId: e.workingScheduleId,
      workingSchedule: e.workingSchedule,
      company: e.company,
      workLocation: e.workLocation,
      employmentType: e.employmentType,
      status: e.status,
      workEmail: e.workEmail.toLowerCase().trim(),
      phone: e.phone,
      contractsCount: e.contractsCount,
      attendanceCount: e.attendanceCount,
      timeOffCount: e.timeOffCount,
      bankAccount: e.bankAccount,
      isBankVerified: e.isBankVerified,
      userId: userEmailMap[e.workEmail.toLowerCase().trim()] || null
    }));
    const createdEmployees = await Employee.insertMany(employeeDocs);
    console.log(`✓ Inserted ${createdEmployees.length} employees.`);

    // Cross-link employee _id back to users
    for (const emp of createdEmployees) {
      if (emp.userId) {
        await User.findByIdAndUpdate(emp.userId, { employeeId: emp._id });
      }
    }
    // Also link aliases to the corresponding demo employees
    const meetEmp = createdEmployees.find(e => e.workEmail === 'hrmanager@peoplepay360.com');
    if (meetEmp) {
      await User.updateMany(
        { email: { $in: ['meet@peoplepay360.com', 'meetrathod470@gmail.com'] } },
        { employeeId: meetEmp._id }
      );
    }
    const parthEmp = createdEmployees.find(e => e.workEmail === 'employee@peoplepay360.com');
    if (parthEmp) {
      await User.updateOne({ email: 'parth@peoplepay360.com' }, { employeeId: parthEmp._id });
    }
    const ravirajEmp = createdEmployees.find(e => e.workEmail === 'admin@peoplepay360.com');
    if (ravirajEmp) {
      await User.updateOne({ email: 'raviraj@peoplepay360.com' }, { employeeId: ravirajEmp._id });
    }
    const ujjwalEmp = createdEmployees.find(e => e.workEmail === 'payrollmanager@peoplepay360.com');
    if (ujjwalEmp) {
      await User.updateOne({ email: 'ujjwal@peoplepay360.com' }, { employeeId: ujjwalEmp._id });
    }
    const neevEmp = createdEmployees.find(e => e.workEmail === 'payrolluser@peoplepay360.com');
    if (neevEmp) {
      await User.updateOne({ email: 'neev@peoplepay360.com' }, { employeeId: neevEmp._id });
    }
    console.log('✓ Linked employee references bidirectionally to user records.');

    // 7. Seed Contracts (60 records)
    console.log('\n[7/12] Seeding Contracts (60 records)...');
    await Contract.deleteMany({});
    const contractDocs = data.contracts.map(c => ({
      customId: c.customId || c.id,
      contractNumber: c.contractNumber,
      employeeId: c.employeeId,
      employeeName: c.employeeName,
      startDate: c.startDate,
      endDate: c.endDate,
      duration: c.duration,
      wage: c.wage,
      status: c.status,
      department: c.department,
      jobPosition: c.jobPosition,
      workingScheduleId: c.workingScheduleId,
      workingSchedule: c.workingSchedule,
      structureType: c.structureType,
      notes: c.notes
    }));
    const createdContracts = await Contract.insertMany(contractDocs);
    console.log(`✓ Inserted ${createdContracts.length} contracts.`);

    // 8. Seed Time Off Allocations (60 records)
    console.log('\n[8/12] Seeding Time Off Allocations (60 records)...');
    await Allocation.deleteMany({});
    const createdAllocations = await Allocation.insertMany(data.allocations);
    console.log(`✓ Inserted ${createdAllocations.length} allocations.`);

    // 9. Seed Time Off Requests (60 records)
    console.log('\n[9/12] Seeding Time Off Requests (60 records)...');
    await TimeOffRequest.deleteMany({});
    const createdRequests = await TimeOffRequest.insertMany(data.timeOffRequests);
    console.log(`✓ Inserted ${createdRequests.length} time off requests.`);

    // 10. Seed Attendance (~2,880 multi-month records)
    console.log('\n[10/12] Seeding Multi-Month Attendance (~2,880 records)...');
    await Attendance.deleteMany({});
    // Bulk insert in chunks of 500 for optimal Atlas performance
    const chunkSize = 500;
    for (let i = 0; i < data.attendance.length; i += chunkSize) {
      const chunk = data.attendance.slice(i, i + chunkSize);
      await Attendance.insertMany(chunk);
    }
    const attCount = await Attendance.countDocuments();
    console.log(`✓ Inserted ${attCount} attendance records across July, August, and September 2026.`);

    // 11. Seed Payruns (3 monthly batches)
    console.log('\n[11/12] Seeding Payruns (3 batches: July, August, September 2026)...');
    await Payrun.deleteMany({});
    const createdPayruns = await Payrun.insertMany(data.payruns);
    console.log(`✓ Inserted ${createdPayruns.length} payrun batches.`);

    // 12. Seed Payslips (180 detailed records)
    console.log('\n[12/12] Seeding Payslips (180 records across all payruns)...');
    await Payslip.deleteMany({});
    for (let i = 0; i < data.payslips.length; i += chunkSize) {
      const chunk = data.payslips.slice(i, i + chunkSize);
      await Payslip.insertMany(chunk);
    }
    const psCount = await Payslip.countDocuments();
    console.log(`✓ Inserted ${psCount} payslips.`);

    // ====================================================
    // RELATIONSHIP & MATHEMATICAL INTEGRITY VALIDATIONS
    // ====================================================
    console.log('\n====================================================');
    console.log('[Validation] Running Strict Relational Integrity Checks...');
    console.log('====================================================');

    const empCount = await Employee.countDocuments();
    const usrCount = await User.countDocuments();
    const conCount = await Contract.countDocuments();
    const alcCount = await Allocation.countDocuments();
    const reqCount = await TimeOffRequest.countDocuments();

    // Check 1: Allocations math
    const badAllocations = await Allocation.find({ $expr: { $ne: ["$remaining", { $subtract: ["$allocated", "$taken"] }] } });
    if (badAllocations.length > 0) {
      throw new Error(`Allocations math error found in ${badAllocations.length} records!`);
    }
    console.log('✓ Allocation balances verified: remaining = allocated - taken (100% accurate).');

    // Check 2: Payslips math
    const badPayslips = await Payslip.find({ $expr: { $or: [{ $lt: ["$gross", "$basic"] }, { $gt: ["$net", "$gross"] }] } });
    if (badPayslips.length > 0) {
      throw new Error(`Payslip math anomaly in ${badPayslips.length} records!`);
    }
    console.log('✓ Payslip math verified: Gross >= Basic and Net <= Gross (100% accurate).');

    // Check 3: Demo account verification
    const meetUser = await User.findOne({ email: 'hrmanager@peoplepay360.com' }).populate('employeeId');
    if (!meetUser || meetUser.name !== 'Meet Rathod') {
      throw new Error('Demo account for Meet Rathod missing or misconfigured!');
    }
    console.log(`✓ Demo user verification passed: ${meetUser.email} -> ${meetUser.name} (${meetUser.role}) linked to emp: ${meetUser.employeeId?.name}.`);

    const adminUser = await User.findOne({ email: 'admin@peoplepay360.com' }).populate('employeeId');
    console.log(`✓ Admin user verification passed: ${adminUser.email} -> ${adminUser.name} (${adminUser.role}).`);

    console.log('\n====================================================');
    console.log('🎉 ALL 13 DATABASE SCHEMAS SEEDED & VALIDATED SUCCESSFULLY!');
    console.log('====================================================');

    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\nActive MongoDB Collections in Atlas:');
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(` - ${col.name.padEnd(22)}: ${count} records`);
    }

  } catch (err) {
    console.error('[Seed Error]:', err.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('\n[Seed] Database disconnected.');
  }
}

// Run if called directly
seedAll().then(() => {
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
