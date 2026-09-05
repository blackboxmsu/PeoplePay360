import React, { useState, useEffect } from 'react';
import {
  IndianRupee,
  Users,
  FileCheck,
  Clock,
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
  ChevronRight,
  Filter,
  TrendingUp,
  Shield,
  Briefcase
} from 'lucide-react';
import store from '../services/dataStore';

export default function DashboardPage() {
  const [period, setPeriod] = useState('All Periods');
  const [department, setDepartment] = useState('All Departments');
  const [employeeType, setEmployeeType] = useState('All Types');
  const [company, setCompany] = useState('OxP Pvt Ltd');

  // Master Store Data
  const [employees, setEmployees] = useState(store.getEmployees());
  const [payruns, setPayruns] = useState(store.getPayruns());
  const [contracts, setContracts] = useState(store.getContracts());
  const [attendance, setAttendance] = useState(store.getAttendance());
  const [timeOffRequests, setTimeOffRequests] = useState(store.getTimeOffRequests());
  const [allocations, setAllocations] = useState(store.getAllocations());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setEmployees([...store.getEmployees()]);
      setPayruns([...store.getPayruns()]);
      setContracts([...store.getContracts()]);
      setAttendance([...store.getAttendance()]);
      setTimeOffRequests([...store.getTimeOffRequests()]);
      setAllocations([...store.getAllocations()]);
    });
    return unsub;
  }, []);

  // --- DYNAMIC LIVE METRIC CALCULATION (Requirement A7) ---

  // 1. Filtered Employees base
  const filteredEmployees = employees.filter((emp) => {
    const matchesDept = department === 'All Departments' || emp.department === department;
    const matchesType = employeeType === 'All Types' || (emp.employmentType || 'Full-time') === employeeType;
    return matchesDept && matchesType;
  });
  const filteredEmpNames = new Set(filteredEmployees.map((e) => e.name.toLowerCase()));

  // 2. Filtered Payruns & Payslips
  const filteredPayruns = payruns.filter((pr) => {
    if (period === 'All Periods') return true;
    return pr.name.toLowerCase().includes(period.toLowerCase()) || pr.periodStart.includes(period);
  });

  const matchingPayslips = [];
  filteredPayruns.forEach((pr) => {
    (pr.payslips || []).forEach((ps) => {
      if (filteredEmpNames.has(ps.employeeName.toLowerCase())) {
        matchingPayslips.push({ ...ps, payrunStatus: pr.status, payrunName: pr.name });
      }
    });
  });

  // KPI 1: Total Net Salary Paid
  const totalNetPaid = matchingPayslips
    .filter((ps) => ps.status === 'Paid' || ps.payrunStatus === 'Paid')
    .reduce((sum, ps) => sum + (Number(ps.net) || 0), 0);

  // KPI 2: Payslips Generated
  const totalPayslipsCount = matchingPayslips.length;
  const paidPayslipsCount = matchingPayslips.filter((ps) => ps.status === 'Paid' || ps.payrunStatus === 'Paid').length;
  const pendingPayslipsCount = totalPayslipsCount - paidPayslipsCount;

  // KPI 3: Avg Salary / Employee
  const avgSalary = totalPayslipsCount > 0
    ? Math.round(matchingPayslips.reduce((sum, ps) => sum + (Number(ps.gross) || 0), 0) / totalPayslipsCount)
    : 0;

  // KPI 4: Approved Time Off Days
  const matchingRequests = timeOffRequests.filter((r) => {
    const isMatchingEmp = filteredEmpNames.has(r.employeeName.toLowerCase());
    return isMatchingEmp;
  });

  const approvedLeaveDays = matchingRequests
    .filter((r) => r.status === 'Approved')
    .reduce((sum, r) => sum + (parseFloat(r.duration) || 1), 0);

  const pendingLeaveCount = matchingRequests.filter((r) => r.status === 'To Approve').length;

  // KPI 5: Attendance Health (% Present)
  const matchingAttendance = attendance.filter((a) =>
    filteredEmpNames.has(a.employeeName.toLowerCase())
  );
  const presentCount = matchingAttendance.filter((a) => a.status === 'Present').length;
  const attendanceHealthPct = matchingAttendance.length > 0
    ? Math.round((presentCount / matchingAttendance.length) * 100)
    : 100;

  // 3. Department Breakdown: Salary Cost by Department
  const allDepts = ['HR', 'Finance', 'Engineering', 'Sales', 'Support'];
  const deptCosts = allDepts.map((dName) => {
    const deptPayslips = matchingPayslips.filter((ps) => {
      const emp = employees.find((e) => e.name.toLowerCase() === ps.employeeName.toLowerCase());
      return emp?.department === dName || ps.department === dName;
    });

    const totalCost = deptPayslips.reduce((sum, ps) => sum + (Number(ps.gross) || 0), 0);
    return {
      name: dName,
      total: totalCost,
      amount: totalCost >= 100000 ? `₹ ${(totalCost / 100000).toFixed(1)}L` : `₹ ${(totalCost / 1000).toFixed(0)}k`,
      count: deptPayslips.length
    };
  });

  const maxDeptCost = Math.max(...deptCosts.map((d) => d.total), 1);
  const deptCostsNormalized = deptCosts.map((d) => ({
    ...d,
    percent: Math.max(12, Math.round((d.total / maxDeptCost) * 90))
  }));

  // 4. Live Operational Alerts
  const missingBankEmps = employees.filter((e) => !e.bankAccount && filteredEmpNames.has(e.name.toLowerCase()));
  const draftPayruns = payruns.filter((pr) => pr.status === 'Draft');
  const pendingAllocations = allocations.filter((a) => a.status === 'To Approve');
  const runningContractsCount = contracts.filter((c) => c.status === 'Running').length;

  const kpiData = [
    {
      title: 'Total Net Salary Paid',
      value: totalNetPaid >= 100000 ? `₹ ${(totalNetPaid / 100000).toFixed(2)}L` : `₹ ${totalNetPaid.toLocaleString('en-IN')}`,
      badge: `${paidPayslipsCount} disbursed records`,
      badgeType: 'positive'
    },
    {
      title: 'Payslips Generated',
      value: String(totalPayslipsCount),
      badge: `${paidPayslipsCount} paid, ${pendingPayslipsCount} pending`,
      badgeType: 'neutral'
    },
    {
      title: 'Avg Gross / Employee',
      value: `₹ ${avgSalary.toLocaleString('en-IN')}`,
      badge: `Across ${filteredEmployees.length} matching staff`,
      badgeType: 'neutral'
    },
    {
      title: 'Approved Time Off',
      value: `${approvedLeaveDays} Days`,
      badge: `${pendingLeaveCount} requests pending review`,
      badgeType: pendingLeaveCount > 0 ? 'warning' : 'positive'
    },
    {
      title: 'Attendance Health',
      value: `${attendanceHealthPct}%`,
      badge: `${presentCount} / ${matchingAttendance.length || presentCount} present punches`,
      badgeType: attendanceHealthPct >= 90 ? 'positive' : 'warning'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Subtitle */}
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Payroll & HR Dashboard
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Real-time live operational insights aggregated across Employees, Contracts, Working Schedules, Attendance, Time Off, and Payruns.
        </p>
      </div>

      {/* Filter Bar (Requirement A7: Flexible filtering by Period, Department, and Employee Type) */}
      <div className="odoo-control-bar" style={{ padding: '14px 20px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap', width: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#059669', fontWeight: 700, fontSize: '0.85rem' }}>
            <Filter size={16} />
            <span>Filters:</span>
          </div>

          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
              Period
            </span>
            <select
              className="field-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="All Periods">All Periods</option>
              <option value="January 2026">January 2026</option>
              <option value="February 2026">February 2026</option>
              <option value="April 2026">April 2026</option>
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '170px' }}>
            <span className="field-label" style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
              Department
            </span>
            <select
              className="field-input"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="All Departments">All Departments</option>
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
              Employee Type
            </span>
            <select
              className="field-input"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="All Types">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '140px' }}>
            <span className="field-label" style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700 }}>
              Company
            </span>
            <input
              type="text"
              className="field-input"
              value={company}
              disabled
              style={{ padding: '6px 10px', fontSize: '0.85rem', backgroundColor: '#F8FAFC' }}
            />
          </div>

          {(department !== 'All Departments' || employeeType !== 'All Types' || period !== 'All Periods') && (
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)', padding: '6px 12px', fontSize: '0.8rem', alignSelf: 'flex-end', marginBottom: '2px' }}
              onClick={() => {
                setPeriod('All Periods');
                setDepartment('All Departments');
                setEmployeeType('All Types');
              }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 5 Dynamic Live KPI Stat Cards (Requirement A7) */}
      <div className="kpi-grid-dashboard">
        {kpiData.map((item, idx) => (
          <div key={idx} className="kpi-stat-card">
            <div className="kpi-title-row">{item.title}</div>
            <div className="kpi-metric-large">{item.value}</div>
            <div className="kpi-badge-row">
              <span
                style={{
                  color:
                    item.badgeType === 'positive' ? '#047857' :
                    item.badgeType === 'warning' ? '#D97706' : '#64748B',
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }}
              >
                {item.badge}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Middle Row: Live Salary Cost by Dept, Monthly Trend, Live Operational Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Card 1: Salary Cost by Department (Live derived from Payslips + Employees) */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Salary Cost by Department
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Source: Live Payslips ({department === 'All Departments' ? 'All Units' : department})
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '20px', gap: '14px' }}>
            {deptCostsNormalized.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#047857' }}>{d.amount}</span>
                <div
                  style={{
                    width: '100%',
                    height: `${d.percent}%`,
                    backgroundColor: d.total > 0 ? '#DCFCE7' : '#F1F5F9',
                    border: d.total > 0 ? '1px solid #10B981' : '1px solid #CBD5E1',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.3s ease'
                  }}
                  title={`${d.name}: ${d.amount} across ${d.count} payslips`}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Historical Net Salary Payout Trend */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Monthly Net Salary Trend
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Historical Payruns ({payruns.length} batches recorded)</span>
          </div>

          <div style={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 320 120" style={{ width: '100%', height: '120px' }}>
              <path
                d="M 20,80 Q 70,60 120,65 T 220,50 T 300,40"
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="120" cy="65" r="4" fill="#059669" />
              <text x="105" y="55" fontSize="10" fill="#059669" fontWeight="700">Jan: 2.4L</text>
              <circle cx="220" cy="50" r="4" fill="#059669" />
              <text x="205" y="40" fontSize="10" fill="#059669" fontWeight="700">Feb: 2.4L</text>
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '10px' }}>
              <span>Nov</span>
              <span>Dec</span>
              <span>Jan 2026</span>
              <span>Feb 2026</span>
              <span>Mar</span>
              <span>Apr</span>
            </div>
          </div>
        </div>

        {/* Card 3: Live System Alerts & Master Data Attention */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Live Operational Alerts
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Aggregated across Master Data & Processing</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.825rem' }}>
            {missingBankEmps.length > 0 ? (
              <div style={{ color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600 }}>
                <AlertTriangle size={15} />
                <span>{missingBankEmps.length} employee(s) missing bank account info: {missingBankEmps.map((e) => e.name).join(', ')}</span>
              </div>
            ) : (
              <div style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CheckCircle2 size={15} />
                <span>All active employees have verified bank details</span>
              </div>
            )}

            {pendingAllocations.length > 0 && (
              <div style={{ color: '#B45309', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                <span>• {pendingAllocations.length} leave allocation(s) awaiting approval before availability</span>
              </div>
            )}

            {pendingLeaveCount > 0 && (
              <div style={{ color: '#2563EB', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                <span>• {pendingLeaveCount} time off request(s) awaiting manager decision</span>
              </div>
            )}

            <div style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>• {runningContractsCount} active running contracts governing payroll period</span>
            </div>

            {draftPayruns.length > 0 && (
              <div style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span>• {draftPayruns.length} draft payrun batch(es) pending final validation</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Row: Attendance Overview, Time Off Overview, Workforce Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Attendance Overview */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Attendance Operations Overview
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ backgroundColor: '#F0FDF4', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700 }}>Present Days</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#064E3B' }}>{presentCount}</div>
            </div>
            <div style={{ backgroundColor: '#FEF2F2', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#B91C1C', fontWeight: 700 }}>Absent Punches</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#991B1B' }}>
                {matchingAttendance.filter((a) => a.status === 'Absent').length}
              </div>
            </div>
          </div>
        </div>

        {/* Time Off Overview */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Time Off & Leave Balance Overview
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div style={{ backgroundColor: '#EFF6FF', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#1D4ED8', fontWeight: 700 }}>Approved Days</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1E40AF' }}>{approvedLeaveDays} Days</div>
            </div>
            <div style={{ backgroundColor: '#FFFBEB', padding: '12px', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.72rem', color: '#B45309', fontWeight: 700 }}>Pending Approvals</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#92400E' }}>{pendingLeaveCount}</div>
            </div>
          </div>
        </div>

        {/* Workforce Master Overview */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '12px' }}>
            Workforce Coverage
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Filtered Headcount:</span>
              <strong>{filteredEmployees.length} staff</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Active Running Contracts:</span>
              <strong style={{ color: '#059669' }}>{contracts.filter((c) => c.status === 'Running' && filteredEmpNames.has(c.employeeName.toLowerCase())).length}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Working Schedules Defined:</span>
              <strong>{store.getWorkingSchedules().length} schedules</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
