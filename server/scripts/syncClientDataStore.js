import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const masterDataPath = path.join(__dirname, 'masterData.json');
const targetDataStorePath = path.resolve(__dirname, '../../client/src/services/dataStore.js');

const rawData = fs.readFileSync(masterDataPath, 'utf-8');
const data = JSON.parse(rawData);

const fileHeader = `// PeoplePay360 Centralized Data Store & State Manager
// Coordinates HR Configuration, Master Data, Operations, and Payroll
// Upgraded with full ~50 records per schema

const STORAGE_KEY = 'peoplepay360_master_data_v3';

// --- INITIAL MASTER SEED DATA ---

export const SEED_WORKING_SCHEDULES = ${JSON.stringify(data.workingSchedules, null, 2)};

export const SEED_EMPLOYEES = ${JSON.stringify(data.employees, null, 2)};

export const SEED_CONTRACTS = ${JSON.stringify(data.contracts, null, 2)};

export const SEED_TIMEOFF_TYPES = ${JSON.stringify(data.timeOffTypes, null, 2)};

export const SEED_ALLOCATIONS = ${JSON.stringify(data.allocations, null, 2)};

export const SEED_TIMEOFF_REQUESTS = ${JSON.stringify(data.timeOffRequests, null, 2)};

export const SEED_SALARY_STRUCTURES = ${JSON.stringify(data.salaryStructures, null, 2)};

export const SEED_ATTENDANCE = ${JSON.stringify(data.attendance, null, 2)};

export const SEED_PAYRUNS = ${JSON.stringify(data.payruns, null, 2)};

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

  resetToSeedData() {
    this.data = {
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
    this.save();
    return this.data;
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
        id: schedule.id || \`ws-\${Date.now()}\`
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
        id: employee.id || \`emp-\${Date.now()}\`,
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
        id: contract.id || \`con-\${Date.now()}\`
      });
    }
    this.save();
  }

  getContractForPeriod(employeeIdOrName, periodStart, periodEnd) {
    const pStart = new Date(periodStart);
    const pEnd = new Date(periodEnd);

    const empContracts = this.data.contracts.filter(
      (c) => c.employeeId === employeeIdOrName || c.employeeName.toLowerCase() === (employeeIdOrName || '').toLowerCase()
    );

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
        id: tot.id || \`tot-\${Date.now()}\`
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
        id: allocation.id || \`alc-\${Date.now()}\`
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
        id: request.id || \`req-\${Date.now()}\`
      });
    }
    this.save();
  }

  updateRequestStatus(requestId, newStatus) {
    const req = this.data.timeOffRequests.find((r) => r.id === requestId);
    if (!req) return;

    const previousStatus = req.status;
    req.status = newStatus;

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
          req.allocationUsed = \`\${matchingAlc.type} (\${matchingAlc.validity}) [Deducted \${durationNum} \${matchingAlc.unit}]\`;
        } else if (previousStatus === 'Approved' && (newStatus === 'Refused' || newStatus === 'To Approve')) {
          matchingAlc.taken = Math.max(0, (Number(matchingAlc.taken) || 0) - durationNum);
          matchingAlc.remaining = Math.max(0, Number(matchingAlc.allocated) - matchingAlc.taken);
          if (matchingAlc.deductionLog) {
            matchingAlc.deductionLog = matchingAlc.deductionLog.filter((l) => l.requestId !== req.id);
          }
          req.allocationUsed = \`\${matchingAlc.type} (\${matchingAlc.validity}) [Restored]\`;
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
        id: structure.id || \`str-\${Date.now()}\`
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
        id: record.id || \`att-\${Date.now()}\`
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
        id: payrun.id || \`pr-\${Date.now()}\`
      });
    }
    this.save();
  }
}

export const store = new DataStore();
export default store;
`;

fs.writeFileSync(targetDataStorePath, fileHeader, 'utf-8');
console.log(`Successfully synchronized ${targetDataStorePath}!`);
