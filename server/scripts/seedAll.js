import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/peoplepay360';

export async function seedAll() {
  console.log('====================================================');
  console.log('[Seed] Starting PeoplePay360 Master Seeding Pipeline');
  console.log('====================================================');

  try {
    console.log('[Seed] Connecting to MongoDB Atlas...');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('[Seed] Connected successfully.');

    // Read generated master data
    const rawData = fs.readFileSync(path.join(__dirname, 'masterData.json'), 'utf-8');
    const data = JSON.parse(rawData);

    // 1. Seed Departments
    console.log('\n[1/12] Seeding Departments...');
    await Department.deleteMany({});
    const createdDepts = await Department.insertMany(data.departments);
    console.log(`✓ Inserted ${createdDepts.length} departments.`);

    // 2. Seed Working Schedules
    console.log('\n[2/12] Seeding Working Schedules...');
    await WorkingSchedule.deleteMany({});
    const createdSchedules = await WorkingSchedule.insertMany(data.workingSchedules);
    console.log(`✓ Inserted ${createdSchedules.length} working schedules.`);

    // 3. Seed Time Off Types
    console.log('\n[3/12] Seeding Time Off Types...');
    await TimeOffType.deleteMany({});
    const createdTimeOffTypes = await TimeOffType.insertMany(data.timeOffTypes);
    console.log(`✓ Inserted ${createdTimeOffTypes.length} time off types.`);

    // 4. Seed Salary Structures & Flattened Rules
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

    // 5. Seed Users (50 records)
    console.log('\n[5/12] Seeding Users (50 accounts with password "Demo@123")...');
    await User.deleteMany({});
    const defaultPasswordHash = await User.hashPassword('Demo@123');

    const userDocs = data.users.map(u => ({
      name: u.name,
      email: u.email.toLowerCase().trim(),
      passwordHash: defaultPasswordHash,
      role: u.role
    }));
    const createdUsers = await User.insertMany(userDocs);
    console.log(`✓ Inserted ${createdUsers.length} users.`);

    // Create user email to _id lookup
    const userEmailMap = {};
    createdUsers.forEach(u => {
      userEmailMap[u.email] = u._id;
    });

    // 6. Seed Employees (50 records)
    console.log('\n[6/12] Seeding Employees (50 records)...');
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
      workEmail: e.workEmail,
      phone: e.phone,
      contractsCount: e.contractsCount,
      attendanceCount: e.attendanceCount,
      timeOffCount: e.timeOffCount,
      bankAccount: e.bankAccount,
      isBankVerified: e.isBankVerified,
      userId: userEmailMap[e.workEmail.toLowerCase()] || null
    }));
    const createdEmployees = await Employee.insertMany(employeeDocs);
    console.log(`✓ Inserted ${createdEmployees.length} employees.`);

    // Link employee _id back to users
    for (const emp of createdEmployees) {
      if (emp.userId) {
        await User.findByIdAndUpdate(emp.userId, { employeeId: emp._id });
      }
    }
    console.log('✓ Linked employee references to user records.');

    // 7. Seed Contracts (50 records)
    console.log('\n[7/12] Seeding Contracts (50 records)...');
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

    // 8. Seed Time Off Allocations (50 records)
    console.log('\n[8/12] Seeding Time Off Allocations (50 records)...');
    await Allocation.deleteMany({});
    const createdAllocations = await Allocation.insertMany(data.allocations);
    console.log(`✓ Inserted ${createdAllocations.length} allocations.`);

    // 9. Seed Time Off Requests (50 records)
    console.log('\n[9/12] Seeding Time Off Requests (50 records)...');
    await TimeOffRequest.deleteMany({});
    const createdRequests = await TimeOffRequest.insertMany(data.timeOffRequests);
    console.log(`✓ Inserted ${createdRequests.length} time off requests.`);

    // 10. Seed Attendance (50 records)
    console.log('\n[10/12] Seeding Attendance (50 records)...');
    await Attendance.deleteMany({});
    const createdAttendance = await Attendance.insertMany(data.attendance);
    console.log(`✓ Inserted ${createdAttendance.length} attendance records.`);

    // 11. Seed Payruns (9 batches)
    console.log('\n[11/12] Seeding Payruns (9 batches)...');
    await Payrun.deleteMany({});
    const createdPayruns = await Payrun.insertMany(data.payruns);
    console.log(`✓ Inserted ${createdPayruns.length} payrun batches.`);

    // 12. Seed Payslips (126 records)
    console.log('\n[12/12] Seeding Payslips (126 records across all payruns)...');
    await Payslip.deleteMany({});
    const createdPayslips = await Payslip.insertMany(data.payslips);
    console.log(`✓ Inserted ${createdPayslips.length} payslips.`);

    console.log('\n====================================================');
    console.log('🎉 ALL DATABASE SCHEMAS SEEDED SUCCESSFULLY WITH ~50 RECORDS!');
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
