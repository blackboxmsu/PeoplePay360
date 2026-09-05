import React, { useState } from 'react';
import { IndianRupee, Users, FileCheck, Clock, CalendarDays, AlertTriangle, CheckCircle2, ChevronRight } from 'lucide-react';

export default function DashboardPage() {
  const [period, setPeriod] = useState('Sep 2026');
  const [department, setDepartment] = useState('All Departments');
  const [employeeType, setEmployeeType] = useState('All Types');
  const [company, setCompany] = useState('OxP Pvt Ltd');

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
            {/* SVG Trend line visualization */}
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
            {/* Status Split Bar */}
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Status split</span>
              <div style={{ display: 'flex', height: '16px', borderRadius: '4px', overflow: 'hidden', marginTop: '6px', border: '1px solid var(--border-subtle)' }}>
                <div style={{ width: '65%', backgroundColor: '#10B981' }} title="Paid" />
                <div style={{ width: '18%', backgroundColor: '#38BDF8' }} title="Done" />
                <div style={{ width: '10%', backgroundColor: '#F59E0B' }} title="Pending" />
                <div style={{ width: '7%', backgroundColor: '#EF4444' }} title="Warning" />
              </div>
            </div>

            {/* Current Alerts List */}
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

      {/* Bottom Row: Attendance Overview, Time Off Overview, Department Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Attendance Overview */}
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

        {/* Time Off Overview */}
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

        {/* Department Overview */}
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
