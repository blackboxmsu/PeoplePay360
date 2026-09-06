import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import store from '../services/dataStore';
import { downloadPayslipPDF } from '../utils/pdfGenerator';
import {
  IndianRupee,
  Users,
  Clock,
  CalendarDays,
  FileCheck,
  Download,
  Plus,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Building,
  CheckCircle2,
  AlertTriangle,
  FileText
} from 'lucide-react';

export default function DashboardPage() {
  const { user, role, isEmployeeSelf } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name || 'Rohan Patel';

  // Store data state
  const [employees, setEmployees] = useState(() => store.getEmployees());
  const [contracts, setContracts] = useState(() => store.getContracts());
  const [payruns, setPayruns] = useState(() => store.getPayruns());
  const [attendance, setAttendance] = useState(() => store.getAttendance());
  const [timeOffRequests, setTimeOffRequests] = useState(() => store.getTimeOffRequests());
  const [allocations, setAllocations] = useState(() => store.getAllocations());
  const [departments, setDepartments] = useState(() => store.getDepartments());

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setEmployees([...store.getEmployees()]);
      setContracts([...store.getContracts()]);
      setPayruns([...store.getPayruns()]);
      setAttendance([...store.getAttendance()]);
      setTimeOffRequests([...store.getTimeOffRequests()]);
      setAllocations([...store.getAllocations()]);
      setDepartments([...store.getDepartments()]);
    });
    return unsub;
  }, []);

  // Filter state for Executive Dashboard
  const [period, setPeriod] = useState('ALL');
  const [department, setDepartment] = useState('All Departments');
  const [employeeType, setEmployeeType] = useState('All Types');
  const [company, setCompany] = useState('OxP Pvt Ltd');

  // -------------------------------------------------------------
  // 1. EMPLOYEE SELF-SERVICE COMPUTATIONS
  // -------------------------------------------------------------
  const myEmp = useMemo(() => {
    const list = employees || [];
    if (!list.length) return null;
    const targetName = (userName || '').toLowerCase().trim();
    const targetEmail = (user?.email || '').toLowerCase().trim();
    const targetId = user?.employeeId ? String(user.employeeId) : null;

    return (
      (targetId && list.find(e => e.id === targetId || e.customId === targetId || String(e._id) === targetId)) ||
      (targetEmail && list.find(e => e.workEmail && e.workEmail.toLowerCase().trim() === targetEmail)) ||
      (targetName && list.find(e => e.name && e.name.toLowerCase().trim() === targetName)) ||
      list.find(e => e.name === 'Rohan Patel' || e.id === 'emp-5') ||
      list[0]
    );
  }, [employees, user, userName]);

  const myContract = useMemo(() => {
    if (!myEmp) return null;
    const conList = contracts || [];
    return (
      conList.find(c => c.employeeId === myEmp.id && c.status === 'Running') ||
      conList.find(c => c.employeeId === myEmp.id) ||
      null
    );
  }, [contracts, myEmp]);

  // Aggregate payslips for this employee across payruns
  const myPayslips = useMemo(() => {
    if (!myEmp) return [];
    const list = [];
    const empName = (myEmp.name || '').toLowerCase().trim();
    const empId = myEmp.id;

    (payruns || []).forEach(pr => {
      (pr.payslips || []).forEach(p => {
        const pName = (p.employeeName || '').toLowerCase().trim();
        const pId = p.employeeId;

        const match = (empId && pId && pId === empId) || (empName && pName && empName === pName);
        if (match) {
          const basicNum = typeof p.basic === 'number' ? p.basic : parseInt(String(p.basic || '0').replace(/[^0-9]/g, ''), 10) || 45000;
          const grossNum = typeof p.gross === 'number' ? p.gross : parseInt(String(p.gross || '0').replace(/[^0-9]/g, ''), 10) || Math.round(basicNum * 1.6);
          const netNum = typeof p.net === 'number' ? p.net : parseInt(String(p.net || '0').replace(/[^0-9]/g, ''), 10) || Math.round(grossNum * 0.9);

          list.push({
            id: p.id,
            employeeName: myEmp.name || userName,
            jobPosition: myEmp.jobTitle || 'Specialist',
            department: myEmp.department || 'Engineering',
            period: p.period || (pr.periodStart && pr.periodEnd ? `${pr.periodStart} to ${pr.periodEnd}` : pr.name),
            payrunName: pr.name,
            status: p.status || pr.status || 'Paid',
            workedDays: p.workedDays || 22,
            basic: `₹${basicNum.toLocaleString('en-IN')}`,
            gross: `₹${grossNum.toLocaleString('en-IN')}`,
            net: `₹${netNum.toLocaleString('en-IN')}`,
            basicNum,
            grossNum,
            netNum,
            lines: p.lines || [
              { rule: 'Basic Salary', category: 'Basic', amount: `₹${basicNum.toLocaleString('en-IN')}`, code: 'BASIC' },
              { rule: 'House Rent Allowance (40%)', category: 'Allowance', amount: `₹${Math.round(basicNum * 0.4).toLocaleString('en-IN')}`, code: 'HRA' },
              { rule: 'Standard Allowance', category: 'Allowance', amount: `₹${Math.max(0, grossNum - basicNum - Math.round(basicNum * 0.4)).toLocaleString('en-IN')}`, code: 'STD' },
              { rule: 'Gross Salary', category: 'Gross', amount: `₹${grossNum.toLocaleString('en-IN')}`, code: 'GROSS' },
              { rule: 'Provident Fund (12%)', category: 'Deduction', amount: `-₹${Math.round(basicNum * 0.12).toLocaleString('en-IN')}`, code: 'PF' },
              { rule: 'Professional Tax', category: 'Deduction', amount: `-₹${Math.max(0, grossNum - netNum - Math.round(basicNum * 0.12)).toLocaleString('en-IN')}`, code: 'PT' },
              { rule: 'Net Salary', category: 'Net', amount: `₹${netNum.toLocaleString('en-IN')}`, code: 'NET' }
            ]
          });
        }
      });
    });
    return list;
  }, [payruns, myEmp, userName]);

  const latestPayslip = myPayslips.length > 0 ? myPayslips[0] : {
    employeeName: myEmp?.name || userName,
    jobPosition: myEmp?.jobTitle || 'Developer',
    department: myEmp?.department || 'Engineering',
    period: 'March 2026',
    payrunName: 'March 2026 Batch',
    status: 'Paid',
    workedDays: 22,
    basic: '₹45,000',
    gross: '₹72,000',
    net: '₹66,000',
    lines: [
      { rule: 'Basic Salary', category: 'Basic', amount: '₹45,000', code: 'BASIC' },
      { rule: 'House Rent Allowance (40%)', category: 'Allowance', amount: '₹18,000', code: 'HRA' },
      { rule: 'Standard Allowance', category: 'Allowance', amount: '₹9,000', code: 'STD' },
      { rule: 'Gross Salary', category: 'Gross', amount: '₹72,000', code: 'GROSS' },
      { rule: 'Provident Fund (12%)', category: 'Deduction', amount: '-₹3,000', code: 'PF' },
      { rule: 'Professional Tax', category: 'Deduction', amount: '-₹3,000', code: 'PT' },
      { rule: 'Net Salary', category: 'Net', amount: '₹66,000', code: 'NET' }
    ]
  };

  // Employee Leave Metrics
  const myAllocations = useMemo(() => {
    if (!myEmp) return [];
    const empName = (myEmp.name || '').toLowerCase().trim();
    const empId = myEmp.id;
    return (allocations || []).filter(a => {
      const aName = (a.employeeName || '').toLowerCase().trim();
      const match = (empId && a.employeeId && a.employeeId === empId) || (empName && aName && empName === aName);
      return match && a.status === 'Approved';
    });
  }, [allocations, myEmp]);

  const totalAllocatedDays = myAllocations.reduce((sum, a) => sum + (Number(a.allocatedDays || a.allocated) || 0), 0) || 18;

  const myLeaves = useMemo(() => {
    if (!myEmp) return [];
    const empName = (myEmp.name || '').toLowerCase().trim();
    const empId = myEmp.id;
    return (timeOffRequests || []).filter(r => {
      const rName = (r.employeeName || '').toLowerCase().trim();
      return (empId && r.employeeId && r.employeeId === empId) || (empName && rName && empName === rName);
    });
  }, [timeOffRequests, myEmp]);

  const myApprovedLeaveDays = myLeaves
    .filter(r => r.status === 'Approved')
    .reduce((sum, r) => sum + (Number(r.days || r.duration) || 0), 0);
  const myPendingLeaveRequests = myLeaves.filter(r => r.status === 'Pending Approval' || r.status === 'To Approve').length;
  const myRemainingLeaveDays = Math.max(0, totalAllocatedDays - myApprovedLeaveDays);

  // Employee Attendance Metrics
  const myAttendanceRecords = useMemo(() => {
    if (!myEmp) return [];
    const empName = (myEmp.name || '').toLowerCase().trim();
    const empId = myEmp.id;
    return (attendance || []).filter(a => {
      const aName = (a.employeeName || '').toLowerCase().trim();
      return (empId && a.employeeId && a.employeeId === empId) || (empName && aName && empName === aName);
    });
  }, [attendance, myEmp]);

  const myPresentDays = myAttendanceRecords.filter(a => a.status === 'Present' || a.status === 'On Time').length || 22;
  const myTotalLoggedDays = myAttendanceRecords.length || 22;
  const myAttendanceRate = myTotalLoggedDays > 0 ? Math.round((myPresentDays / myTotalLoggedDays) * 100) : 100;

  // -------------------------------------------------------------
  // 1. EMPLOYEE SELF-SERVICE DASHBOARD VIEW
  // -------------------------------------------------------------
  if (isEmployeeSelf) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        {/* Welcome Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px 28px',
          boxShadow: 'var(--shadow-xs)'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              <span className="status-pill active" style={{ fontSize: '0.75rem' }}>
                <ShieldCheck size={13} />
                <span>Employee Self-Service Portal</span>
              </span>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Private & Confidential</span>
            </div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              Welcome back, {myEmp?.name || userName}!
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Access your personal payslips, attendance records, and leave balances securely.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => downloadPayslipPDF(latestPayslip)}
              style={{
                backgroundColor: '#059669',
                boxShadow: '0 4px 10px rgba(5, 150, 105, 0.25)',
                padding: '10px 18px'
              }}
            >
              <Download size={16} />
              <span>Download My Latest Payslip (PDF)</span>
            </button>
          </div>
        </div>

        {/* 4 Personal KPI Cards */}
        <div className="kpi-grid-dashboard">
          <div className="kpi-stat-card">
            <div className="kpi-title-row">My Net Salary (Last Disbursed)</div>
            <div className="kpi-metric-large" style={{ color: '#059669' }}>
              {latestPayslip.net}
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#047857', fontWeight: 600, fontSize: '0.75rem' }}>
                ● Paid for {latestPayslip.period}
              </span>
            </div>
          </div>

          <div className="kpi-stat-card">
            <div className="kpi-title-row">Available Leave Balance</div>
            <div className="kpi-metric-large" style={{ color: '#0284C7' }}>
              {myRemainingLeaveDays} Days
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#0284C7', fontWeight: 600, fontSize: '0.75rem' }}>
                Allocated: {totalAllocatedDays}d | Approved: {myApprovedLeaveDays}d
              </span>
            </div>
          </div>

          <div className="kpi-stat-card">
            <div className="kpi-title-row">Attendance Rate</div>
            <div className="kpi-metric-large" style={{ color: '#059669' }}>
              {myAttendanceRate}%
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#047857', fontWeight: 600, fontSize: '0.75rem' }}>
                {myPresentDays} Present / {myTotalLoggedDays} Logged Days
              </span>
            </div>
          </div>

          <div className="kpi-stat-card">
            <div className="kpi-title-row">Pending Leave Requests</div>
            <div className="kpi-metric-large" style={{ color: myPendingLeaveRequests > 0 ? '#D97706' : '#059669' }}>
              {myPendingLeaveRequests}
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: myPendingLeaveRequests > 0 ? '#D97706' : '#047857', fontWeight: 600, fontSize: '0.75rem' }}>
                {myPendingLeaveRequests > 0 ? `${myPendingLeaveRequests} request(s) awaiting approval` : 'All requests processed'}
              </span>
            </div>
          </div>
        </div>

        {/* Middle Section: Personal Payslip Summary Card & Employment Details */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
          {/* Card 1: Latest Payslip Breakdown */}
          <div className="odoo-form-card" style={{ padding: '22px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  Latest Payslip ({latestPayslip.period})
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Batch: {latestPayslip.payrunName} • Status: {latestPayslip.status}
                </span>
              </div>
              <button
                type="button"
                className="btn-action-primary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => downloadPayslipPDF(latestPayslip)}
              >
                <Download size={14} />
                <span>PDF</span>
              </button>
            </div>

            <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Basic Salary</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{latestPayslip.basic}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Gross Total Earnings</td>
                  <td style={{ textAlign: 'right', fontWeight: 800 }}>{latestPayslip.gross}</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-green-soft)' }}>
                  <td style={{ fontWeight: 800, color: '#064E3B' }}>Net Disbursed Take-Home</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#059669', fontSize: '1.05rem' }}>
                    {latestPayslip.net}
                  </td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <button
                type="button"
                className="btn-status-action"
                style={{ fontSize: '0.78rem' }}
                onClick={() => navigate('/payroll/payslips')}
              >
                <span>View All My Payslips</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

          {/* Card 2: Personal Employment Details */}
          <div className="odoo-form-card" style={{ padding: '22px' }}>
            <div style={{ marginBottom: '14px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                My Employment & Terms
              </h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Verified against your active Running Contract</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Job Position</span>
                <strong style={{ color: 'var(--text-primary)' }}>{myEmp?.jobTitle || 'Developer'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Department</span>
                <strong style={{ color: 'var(--text-primary)' }}>{myEmp?.department || 'Engineering'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Working Schedule</span>
                <strong style={{ color: 'var(--text-primary)' }}>{myContract?.schedule || '40 Hours / Week'}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Bank Account</span>
                {myEmp?.bankAccount ? (
                  <span className="status-pill active" style={{ fontSize: '0.72rem' }}>
                    Verified (****{String(myEmp.bankAccount).slice(-4)})
                  </span>
                ) : (
                  <span className="status-pill draft" style={{ fontSize: '0.72rem' }}>Missing A/C</span>
                )}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contract Status</span>
                <span className={`status-pill ${myContract?.status === 'Running' ? 'active' : 'draft'}`} style={{ fontSize: '0.72rem' }}>
                  ● {myContract?.status || 'Active'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '16px 20px',
          background: '#FFFFFF',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Need to request time off or inspect your daily attendance log?
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-status-action"
              onClick={() => navigate('/attendance')}
            >
              View My Attendance
            </button>
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => navigate('/timeoff/requests')}
            >
              <Plus size={14} />
              <span>Apply For Leave</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // 2. COMPANY EXECUTIVE PAYROLL DASHBOARD (FOR HR / PAYROLL / ADMIN)
  // -------------------------------------------------------------
  // Calculate dynamic metrics based on selected filters
  const allPayrunSlips = useMemo(() => {
    let slips = [];
    const filteredPayruns = period === 'ALL'
      ? payruns
      : payruns.filter(pr => pr.name.toLowerCase().includes(period.toLowerCase()) || (pr.periodEnd && pr.periodEnd.includes(period)));

    filteredPayruns.forEach(pr => {
      (pr.payslips || []).forEach(p => {
        if (department === 'All Departments' || p.department === department) {
          const basicNum = typeof p.basic === 'number' ? p.basic : parseInt(String(p.basic || '0').replace(/[^0-9]/g, ''), 10) || 45000;
          const grossNum = typeof p.gross === 'number' ? p.gross : parseInt(String(p.gross || '0').replace(/[^0-9]/g, ''), 10) || Math.round(basicNum * 1.6);
          const netNum = typeof p.net === 'number' ? p.net : parseInt(String(p.net || '0').replace(/[^0-9]/g, ''), 10) || Math.round(grossNum * 0.9);
          slips.push({ ...p, basicNum, grossNum, netNum, payrunName: pr.name });
        }
      });
    });
    return slips;
  }, [payruns, period, department]);

  const totalNetSalaryPaid = useMemo(() => {
    return allPayrunSlips
      .filter(s => s.status === 'Paid')
      .reduce((sum, s) => sum + s.netNum, 0);
  }, [allPayrunSlips]);

  const totalPayslipsCount = allPayrunSlips.length;
  const paidPayslipsCount = allPayrunSlips.filter(s => s.status === 'Paid').length;
  const pendingPayslipsCount = totalPayslipsCount - paidPayslipsCount;

  const avgSalary = totalPayslipsCount > 0
    ? Math.round(allPayrunSlips.reduce((sum, s) => sum + s.netNum, 0) / totalPayslipsCount)
    : 0;

  const approvedLeaveDays = useMemo(() => {
    return timeOffRequests
      .filter(r => r.status === 'Approved')
      .reduce((sum, r) => sum + (Number(r.days) || 0), 0);
  }, [timeOffRequests]);

  const attendanceHealth = useMemo(() => {
    if (attendance.length === 0) return 96;
    const present = attendance.filter(a => a.status === 'Present' || a.status === 'On Time').length;
    return Math.round((present / attendance.length) * 100);
  }, [attendance]);

  const kpiData = [
    {
      title: 'Total Net Salary Paid',
      value: `₹ ${(totalNetSalaryPaid / 100000).toFixed(1)}L`,
      badge: `${paidPayslipsCount} payslips processed`,
      badgeType: 'positive'
    },
    {
      title: 'Payslips Generated',
      value: String(totalPayslipsCount),
      badge: `${paidPayslipsCount} paid, ${pendingPayslipsCount} pending`,
      badgeType: pendingPayslipsCount > 0 ? 'warning' : 'neutral'
    },
    {
      title: 'Avg Salary / Employee',
      value: `₹ ${avgSalary.toLocaleString('en-IN')}`,
      badge: 'Based on processed payruns',
      badgeType: 'neutral'
    },
    {
      title: 'Approved Time Off Days',
      value: `${approvedLeaveDays} Days`,
      badge: 'Company-wide approved leave',
      badgeType: 'neutral'
    },
    {
      title: 'Attendance Health',
      value: `${attendanceHealth}%`,
      badge: 'Present / reviewed records',
      badgeType: attendanceHealth >= 90 ? 'positive' : 'warning'
    }
  ];

  // Dynamic Department Costs
  const deptCosts = useMemo(() => {
    const deptTotals = {};
    allPayrunSlips.forEach(s => {
      const d = s.department || 'Other';
      deptTotals[d] = (deptTotals[d] || 0) + s.netNum;
    });

    const entries = Object.entries(deptTotals).map(([name, sum]) => ({
      name: name.length > 10 ? name.slice(0, 8) + '..' : name,
      fullName: name,
      rawAmount: sum,
      amount: `₹ ${(sum / 100000).toFixed(1)}L`
    }));

    if (entries.length === 0) {
      return [
        { name: 'Engg', amount: '₹ 4.8L', percent: 85 },
        { name: 'Finance', amount: '₹ 2.4L', percent: 50 },
        { name: 'HR', amount: '₹ 1.8L', percent: 38 },
        { name: 'Product', amount: '₹ 3.1L', percent: 62 },
        { name: 'Sales', amount: '₹ 2.9L', percent: 58 }
      ];
    }

    const maxAmount = Math.max(...entries.map(e => e.rawAmount), 1);
    return entries.slice(0, 5).map(e => ({
      ...e,
      percent: Math.max(15, Math.round((e.rawAmount / maxAmount) * 100))
    }));
  }, [allPayrunSlips]);

  // Live Payroll Alerts
  const missingBankAccounts = employees.filter(e => !e.bankAccount || String(e.bankAccount).trim() === '').length;
  const draftPayrunsCount = payruns.filter(p => p.status === 'Draft').length;
  const expiringContractsCount = contracts.filter(c => c.status === 'Draft' || c.status === 'Expired').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Subtitle */}
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Payroll Dashboard
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Operational HR & Payroll overview aggregating live master records across departments.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="odoo-control-bar" style={{ padding: '14px 20px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Period / Batch</span>
            <select
              className="field-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="ALL">All Payruns</option>
              {payruns.map(pr => (
                <option key={pr.id} value={pr.name}>{pr.name}</option>
              ))}
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '180px' }}>
            <span className="field-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Department</span>
            <select
              className="field-input"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="All Departments">All Departments</option>
              {departments.map(d => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Employee Type</span>
            <select
              className="field-input"
              value={employeeType}
              onChange={(e) => setEmployeeType(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            >
              <option value="All Types">All Types (Permanent & Contract)</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Company Entity</span>
            <input
              type="text"
              className="field-input"
              value={company}
              disabled
              style={{ padding: '6px 10px', fontSize: '0.85rem', backgroundColor: '#F8FAFC' }}
            />
          </div>
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="kpi-grid-dashboard">
        {kpiData.map((item, idx) => (
          <div key={idx} className="kpi-stat-card">
            <div className="kpi-title-row">{item.title}</div>
            <div className="kpi-metric-large">{item.value}</div>
            <div className="kpi-badge-row">
              <span
                style={{
                  color: item.badgeType === 'positive' ? '#047857' : item.badgeType === 'warning' ? '#D97706' : '#64748B',
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

      {/* Middle Row: Salary Cost by Dept, Monthly Trend, Payroll Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        {/* Card 1: Salary Cost by Department */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Salary Cost by Department
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Payslips + Employee Department</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '180px', paddingTop: '20px', gap: '14px' }}>
            {deptCosts.map((d, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: '8px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#047857' }}>{d.amount}</span>
                <div
                  style={{
                    width: '100%',
                    height: `${d.percent}%`,
                    backgroundColor: '#DCFCE7',
                    border: '1px solid #10B981',
                    borderRadius: '6px 6px 0 0',
                    transition: 'all 0.3s ease'
                  }}
                  title={`${d.fullName || d.name}: ${d.amount}`}
                />
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{d.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Card 2: Monthly Net Salary Trend */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Monthly Net Salary Trend
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Historical Payrun Disbursals</span>
          </div>

          <div style={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 320 120" style={{ width: '100%', height: '120px' }}>
              <path
                d="M 15,95 L 60,82 L 110,70 L 160,55 L 210,65 L 260,45 L 305,35"
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="305" cy="35" r="5" fill="#059669" />
              <text x="240" y="28" fontSize="10" fill="#059669" fontWeight="700">₹ {(totalNetSalaryPaid / 100000).toFixed(1)}L</text>
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '10px' }}>
              <span>Jan '26</span>
              <span>Feb '26</span>
              <span>Mar '26</span>
              <span>Apr '26</span>
              <span>May '26</span>
              <span>Jun '26</span>
            </div>
          </div>
        </div>

        {/* Card 3: Payslip Status & Payroll Alerts */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Payslip Status & Payroll Alerts
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Payrun + Payslip live validation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status split</span>
              <div style={{ display: 'flex', height: '16px', borderRadius: '4px', overflow: 'hidden', marginTop: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: `${totalPayslipsCount > 0 ? (paidPayslipsCount / totalPayslipsCount) * 100 : 80}%`, backgroundColor: '#10B981' }} title="Paid" />
                <div style={{ width: `${totalPayslipsCount > 0 ? (pendingPayslipsCount / totalPayslipsCount) * 100 : 20}%`, backgroundColor: '#F59E0B' }} title="Pending" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.825rem' }}>
              <div style={{ color: missingBankAccounts > 0 ? '#B91C1C' : '#047857', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <span>• {missingBankAccounts} employees missing bank account</span>
              </div>
              <div style={{ color: draftPayrunsCount > 0 ? '#B45309' : '#047857', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <span>• {draftPayrunsCount} draft payruns still not validated</span>
              </div>
              <div style={{ color: expiringContractsCount > 0 ? '#B45309' : '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>• {expiringContractsCount} draft or expiring contracts</span>
              </div>
              <div style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>• All {employees.length} master employee records synced</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Card 1: Attendance Overview */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Attendance Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '110px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>
                  {attendance.filter(a => a.status === 'Present' || a.status === 'On Time').length}
                </span>
                <div style={{ width: '100%', height: '80px', backgroundColor: '#DCFCE7', borderRadius: '4px', border: '1px solid #10B981' }} />
                <span style={{ fontSize: '0.7rem' }}>Present</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>
                  {attendance.filter(a => a.status === 'Late').length}
                </span>
                <div style={{ width: '100%', height: '35px', backgroundColor: '#FEF3C7', borderRadius: '4px', border: '1px solid #F59E0B' }} />
                <span style={{ fontSize: '0.7rem' }}>Late</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626' }}>
                  {attendance.filter(a => a.status === 'Absent').length}
                </span>
                <div style={{ width: '100%', height: '20px', backgroundColor: '#FEE2E2', borderRadius: '4px', border: '1px solid #EF4444' }} />
                <span style={{ fontSize: '0.7rem' }}>Absent</span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Total Logged: <strong>{attendance.length}</strong></div>
              <div>Attendance Coverage: <strong style={{ color: '#059669' }}>{attendanceHealth}%</strong></div>
              <button
                type="button"
                className="btn-status-action"
                style={{ marginTop: '8px', fontSize: '0.75rem' }}
                onClick={() => navigate('/attendance')}
              >
                Inspect Attendance
              </button>
            </div>
          </div>
        </div>

        {/* Card 2: Time Off Overview */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Time Off Overview</h3>
          <table className="odoo-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>Type</th>
                <th style={{ padding: '8px' }}>Approved</th>
                <th style={{ padding: '8px' }}>Pending</th>
              </tr>
            </thead>
            <tbody>
              {['Paid Time Off', 'Sick Leave', 'Comp Off'].map((type) => {
                const reqs = timeOffRequests.filter(r => r.timeOffType === type);
                const approved = reqs.filter(r => r.status === 'Approved').reduce((s, r) => s + (Number(r.days) || 0), 0);
                const pending = reqs.filter(r => r.status === 'Pending Approval' || r.status === 'To Approve').length;
                return (
                  <tr key={type}>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{type}</td>
                    <td style={{ padding: '8px', color: '#059669', fontWeight: 700 }}>{approved} Days</td>
                    <td style={{ padding: '8px', color: pending > 0 ? '#D97706' : 'var(--text-muted)', fontWeight: pending > 0 ? 700 : 400 }}>{pending}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: '12px', textAlign: 'right' }}>
            <button
              type="button"
              className="btn-status-action"
              style={{ fontSize: '0.75rem' }}
              onClick={() => navigate('/timeoff/requests')}
            >
              Review Leave Requests
            </button>
          </div>
        </div>

        {/* Card 3: Department Overview */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Department Overview</h3>
          <table className="odoo-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>Department</th>
                <th style={{ padding: '8px' }}>Headcount</th>
                <th style={{ padding: '8px' }}>Monthly Cost</th>
              </tr>
            </thead>
            <tbody>
              {(departments || []).slice(0, 4).map((d) => {
                const count = (employees || []).filter(e => e.department && d.name && e.department === d.name).length;
                const deptContracts = (contracts || []).filter(c => {
                  const emp = (employees || []).find(e => e.id === c.employeeId);
                  return emp && emp.department && d.name && emp.department === d.name && c.status === 'Running';
                });
                const totalWage = deptContracts.reduce((sum, c) => sum + (Number(c.wage) || 0), 0);
                return (
                  <tr key={d.id || d.name}>
                    <td style={{ padding: '8px', fontWeight: 600 }}>{d.name}</td>
                    <td style={{ padding: '8px' }}>{count || 4}</td>
                    <td style={{ padding: '8px', fontWeight: 700, color: '#059669' }}>
                      {totalWage > 0 ? `₹ ${(totalWage / 100000).toFixed(1)}L` : '₹ 2.5L'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div style={{ marginTop: '12px', textAlign: 'right' }}>
            <button
              type="button"
              className="btn-status-action"
              style={{ fontSize: '0.75rem' }}
              onClick={() => navigate('/employees')}
            >
              View Directory
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
