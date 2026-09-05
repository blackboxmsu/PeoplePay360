import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
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
  CheckCircle2
} from 'lucide-react';

export default function DashboardPage() {
  const { user, role, isEmployeeSelf } = useAuth();
  const navigate = useNavigate();

  const userName = user?.name || 'Rohan Patel';

  // Company Executive Dashboard state
  const [period, setPeriod] = useState('Sep 2026');
  const [department, setDepartment] = useState('All Departments');
  const [employeeType, setEmployeeType] = useState('All Types');
  const [company, setCompany] = useState('OxP Pvt Ltd');

  // Sample employee personal payslip data
  const employeePayslip = {
    employeeName: userName,
    jobPosition: 'Developer / Technical Staff',
    department: 'Engineering',
    period: 'February 2026',
    payrunName: 'February 2026 Batch',
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

  // -------------------------------------------------------------
  // 1. EMPLOYEE SELF-SERVICE DASHBOARD (STRICT PERSONAL DATA ONLY)
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
              Welcome back, {userName}!
            </h1>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              Access your personal payslips, attendance records, and leave balances securely.
            </p>
          </div>

          {/* Quick PDF Download Button for Employee */}
          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="btn-action-primary"
              onClick={() => downloadPayslipPDF(employeePayslip)}
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
              {employeePayslip.net}
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#047857', fontWeight: 600, fontSize: '0.75rem' }}>
                ● Paid for {employeePayslip.period}
              </span>
            </div>
          </div>

          <div className="kpi-stat-card">
            <div className="kpi-title-row">Available Leave Balance</div>
            <div className="kpi-metric-large" style={{ color: '#0284C7' }}>
              14 Days
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#0284C7', fontWeight: 600, fontSize: '0.75rem' }}>
                Paid Time Off: 12d | Comp Off: 2d
              </span>
            </div>
          </div>

          <div className="kpi-stat-card">
            <div className="kpi-title-row">Attendance This Month</div>
            <div className="kpi-metric-large" style={{ color: '#059669' }}>
              22 / 22
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#047857', fontWeight: 600, fontSize: '0.75rem' }}>
                100% On-Time Record
              </span>
            </div>
          </div>

          <div className="kpi-stat-card">
            <div className="kpi-title-row">Pending Leave Requests</div>
            <div className="kpi-metric-large" style={{ color: '#D97706' }}>
              1
            </div>
            <div className="kpi-badge-row">
              <span style={{ color: '#D97706', fontWeight: 600, fontSize: '0.75rem' }}>
                1 Day Comp Off in review
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
                  Latest Payslip ({employeePayslip.period})
                </h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Disbursed by PeoplePay360 Operations</span>
              </div>
              <button
                type="button"
                className="btn-action-primary"
                style={{ padding: '6px 12px', fontSize: '0.8rem' }}
                onClick={() => downloadPayslipPDF(employeePayslip)}
              >
                <Download size={14} />
                <span>PDF</span>
              </button>
            </div>

            <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
              <tbody>
                <tr>
                  <td style={{ fontWeight: 600 }}>Basic Salary</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>{employeePayslip.basic}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>House Rent Allowance (HRA)</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹18,000</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600 }}>Standard Allowance</td>
                  <td style={{ textAlign: 'right', fontWeight: 700 }}>₹9,000</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-subtle)' }}>
                  <td style={{ fontWeight: 700 }}>Gross Total Earnings</td>
                  <td style={{ textAlign: 'right', fontWeight: 800 }}>{employeePayslip.gross}</td>
                </tr>
                <tr>
                  <td style={{ fontWeight: 600, color: '#DC2626' }}>Provident Fund & Professional Tax</td>
                  <td style={{ textAlign: 'right', fontWeight: 700, color: '#DC2626' }}>-₹6,000</td>
                </tr>
                <tr style={{ backgroundColor: 'var(--bg-green-soft)' }}>
                  <td style={{ fontWeight: 800, color: '#064E3B' }}>Net Disbursed Take-Home</td>
                  <td style={{ textAlign: 'right', fontWeight: 800, color: '#059669', fontSize: '1.05rem' }}>
                    {employeePayslip.net}
                  </td>
                </tr>
              </tbody>
            </table>
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
                <strong style={{ color: 'var(--text-primary)' }}>Developer</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Department</span>
                <strong style={{ color: 'var(--text-primary)' }}>Engineering</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Reporting Manager</span>
                <strong style={{ color: 'var(--text-primary)' }}>Sara Khan (HR) / Rahul Verma</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Working Schedule</span>
                <strong style={{ color: 'var(--text-primary)' }}>40 Hours / Week</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-muted)' }}>Bank Account</span>
                <span className="status-pill active" style={{ fontSize: '0.72rem' }}>Verified (****4321)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--text-muted)' }}>Contract Status</span>
                <span className="status-pill active" style={{ fontSize: '0.72rem' }}>● Running</span>
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
  const kpiData = [
    {
      title: 'Total Net Salary Paid',
      value: '₹ 18.4L',
      badge: '+8.5% vs previous month',
      badgeType: 'positive'
    },
    {
      title: 'Payslips Generated',
      value: '148',
      badge: '142 paid, 6 pending',
      badgeType: 'neutral'
    },
    {
      title: 'Avg Salary / Employee',
      value: '₹ 12,432',
      badge: 'Based on current payrun',
      badgeType: 'neutral'
    },
    {
      title: 'Approved Time Off Days',
      value: '34 Days',
      badge: 'Across selected period',
      badgeType: 'neutral'
    },
    {
      title: 'Attendance Health',
      value: '94%',
      badge: 'Present / reviewed records',
      badgeType: 'positive'
    }
  ];

  const deptCosts = [
    { name: 'HR', amount: '₹ 110k', percent: 45 },
    { name: 'Sales', amount: '₹ 150k', percent: 75 },
    { name: 'Support', amount: '₹ 90k', percent: 35 },
    { name: 'Finance', amount: '₹ 130k', percent: 60 },
    { name: 'IT', amount: '₹ 170k', percent: 90 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header & Subtitle */}
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Payroll Dashboard
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Combine Payroll with HR data from multiple models to present live operational insights.
        </p>
      </div>

      {/* Filter Bar (From Screenshot 7 & 9) */}
      <div className="odoo-control-bar" style={{ padding: '14px 20px', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Period</span>
            <input
              type="text"
              className="field-input"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
              style={{ padding: '6px 10px', fontSize: '0.85rem' }}
            />
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
              <option value="Finance">Finance</option>
              <option value="HR">HR</option>
              <option value="Engineering">Engineering</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
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
              <option value="All Types">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Contract">Contract</option>
              <option value="Intern">Intern</option>
            </select>
          </div>

          <div className="field-group" style={{ minWidth: '160px' }}>
            <span className="field-label" style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>Company</span>
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

      {/* 5 KPI Stat Cards (From Screenshot 9) */}
      <div className="kpi-grid-dashboard">
        {kpiData.map((item, idx) => (
          <div key={idx} className="kpi-stat-card">
            <div className="kpi-title-row">{item.title}</div>
            <div className="kpi-metric-large">{item.value}</div>
            <div className="kpi-badge-row">
              <span
                style={{
                  color: item.badgeType === 'positive' ? '#047857' : '#64748B',
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
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: historical Payslips / Payruns</span>
          </div>

          <div style={{ height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <svg viewBox="0 0 320 120" style={{ width: '100%', height: '120px' }}>
              <path
                d="M 10,80 Q 60,70 110,65 T 210,95 T 310,50"
                fill="none"
                stroke="#059669"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="210" cy="95" r="4" fill="#059669" />
              <text x="195" y="85" fontSize="10" fill="#059669" fontWeight="700">15.0L</text>
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', paddingTop: '10px' }}>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
              <span>Aug</span>
              <span>Sep</span>
            </div>
          </div>
        </div>

        {/* Card 3: Payslip Status & Payroll Alerts */}
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <div style={{ marginBottom: '14px' }}>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
              Payslip Status & Payroll Alerts
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Source: Payrun + Payslip validation</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status split</span>
              <div style={{ display: 'flex', height: '16px', borderRadius: '4px', overflow: 'hidden', marginTop: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '65%', backgroundColor: '#10B981' }} title="Paid" />
                <div style={{ width: '18%', backgroundColor: '#38BDF8' }} title="Done" />
                <div style={{ width: '10%', backgroundColor: '#F59E0B' }} title="Pending" />
                <div style={{ width: '7%', backgroundColor: '#EF4444' }} title="Warning" />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.825rem' }}>
              <div style={{ color: '#B91C1C', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <span>• 2 employees missing bank account</span>
              </div>
              <div style={{ color: '#B45309', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 500 }}>
                <span>• 1 duplicate payslip warning</span>
              </div>
              <div style={{ color: '#475569', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>• 4 drafts still not validated</span>
              </div>
              <div style={{ color: '#047857', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>• 3 contracts expiring this month</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Attendance Overview</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '110px' }}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669' }}>94</span>
                <div style={{ width: '100%', height: '80px', backgroundColor: '#DCFCE7', borderRadius: '4px', border: '1px solid #10B981' }} />
                <span style={{ fontSize: '0.7rem' }}>Present</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#D97706' }}>18</span>
                <div style={{ width: '100%', height: '35px', backgroundColor: '#FEF3C7', borderRadius: '4px', border: '1px solid #F59E0B' }} />
                <span style={{ fontSize: '0.7rem' }}>Late</span>
              </div>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#DC2626' }}>9</span>
                <div style={{ width: '100%', height: '20px', backgroundColor: '#FEE2E2', borderRadius: '4px', border: '1px solid #EF4444' }} />
                <span style={{ fontSize: '0.7rem' }}>Absent</span>
              </div>
            </div>

            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <div>Missing check-outs: <strong>5</strong></div>
              <div>Manual edits: <strong>7</strong></div>
              <div>Attendance coverage: <strong style={{ color: '#059669' }}>94%</strong></div>
            </div>
          </div>
        </div>

        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Time Off Overview</h3>
          <table className="odoo-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>Type</th>
                <th style={{ padding: '8px' }}>Approved</th>
                <th style={{ padding: '8px' }}>Pending</th>
                <th style={{ padding: '8px' }}>Remaining</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>Paid Time Off</td>
                <td style={{ padding: '8px' }}>24</td>
                <td style={{ padding: '8px' }}>3</td>
                <td style={{ padding: '8px', color: '#059669', fontWeight: 700 }}>118 Days</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>Sick Leave</td>
                <td style={{ padding: '8px' }}>6</td>
                <td style={{ padding: '8px' }}>1</td>
                <td style={{ padding: '8px' }}>N/A</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>Comp Off</td>
                <td style={{ padding: '8px' }}>4</td>
                <td style={{ padding: '8px' }}>2</td>
                <td style={{ padding: '8px', color: '#059669', fontWeight: 700 }}>11 Days</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="odoo-form-card" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '12px' }}>Department Overview</h3>
          <table className="odoo-table" style={{ fontSize: '0.8rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '8px' }}>Department</th>
                <th style={{ padding: '8px' }}>Headcount</th>
                <th style={{ padding: '8px' }}>Monthly Salary</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>IT & Engineering</td>
                <td style={{ padding: '8px' }}>18</td>
                <td style={{ padding: '8px', fontWeight: 700 }}>₹ 4.2L</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>Sales</td>
                <td style={{ padding: '8px' }}>22</td>
                <td style={{ padding: '8px', fontWeight: 700 }}>₹ 5.7L</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>HR</td>
                <td style={{ padding: '8px' }}>8</td>
                <td style={{ padding: '8px', fontWeight: 700 }}>₹ 1.9L</td>
              </tr>
              <tr>
                <td style={{ padding: '8px', fontWeight: 600 }}>Finance & Support</td>
                <td style={{ padding: '8px' }}>14</td>
                <td style={{ padding: '8px', fontWeight: 700 }}>₹ 3.1L</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
