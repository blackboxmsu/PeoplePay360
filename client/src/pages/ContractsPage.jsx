import React, { useState } from 'react';
import { Search, Plus, ArrowLeft, Edit2, FileText, CheckCircle } from 'lucide-react';

const INITIAL_CONTRACTS = [
  {
    id: 'con-1',
    contractNumber: 'CON/2026/0042',
    employeeName: 'Aarav Mehta',
    startDate: '01-Jan-2026',
    endDate: '—',
    wage: '₹85,000',
    status: 'Running',
    department: 'Finance',
    jobPosition: 'Payroll Specialist',
    workingSchedule: '40 Hours / Week',
    structureType: 'Regular Salary',
    notes: 'This running contract is the source for payroll calculation in the active period.'
  },
  {
    id: 'con-2',
    contractNumber: 'CON/2025/0019',
    employeeName: 'Aarav Mehta',
    startDate: '01-Jul-2025',
    endDate: '31-Dec-2025',
    wage: '₹78,000',
    status: 'Expired',
    department: 'Finance',
    jobPosition: 'Junior Payroll Analyst',
    workingSchedule: '40 Hours / Week',
    structureType: 'Regular Salary',
    notes: 'Historical contract superseded on renewal.'
  },
  {
    id: 'con-3',
    contractNumber: 'CON/2026/0018',
    employeeName: 'Sara Khan',
    startDate: '01-Jan-2026',
    endDate: '—',
    wage: '₹95,000',
    status: 'Running',
    department: 'HR',
    jobPosition: 'HR Officer',
    workingSchedule: '40 Hours / Week',
    structureType: 'Regular Salary',
    notes: 'Active executive contract.'
  }
];

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContract, setSelectedContract] = useState(null);

  const filteredContracts = INITIAL_CONTRACTS.filter(c =>
    c.contractNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.employeeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Form View (Screenshot 2)
  if (selectedContract) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedContract(null)}
            >
              <ArrowLeft size={16} />
              <span>Contracts</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{selectedContract.contractNumber}</span>
          </div>

          <button type="button" className="btn-action-primary">
            <Edit2 size={15} />
            <span>EDIT</span>
          </button>
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Contract / {selectedContract.contractNumber}</h2>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Form view of one contract record</p>
            </div>
            <span className={`status-pill ${selectedContract.status === 'Running' ? 'running' : 'expired'}`}>
              ● {selectedContract.status}
            </span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Employee</label>
              <input className="field-input" value={selectedContract.employeeName} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Department</label>
              <input className="field-input" value={selectedContract.department} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Start Date</label>
              <input className="field-input" value={selectedContract.startDate} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Job Position</label>
              <input className="field-input" value={selectedContract.jobPosition} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">End Date</label>
              <input className="field-input" value={selectedContract.endDate} readOnly />
            </div>

            <div className="field-group">
              <label className="field-label">Wage / Month</label>
              <input className="field-input" value={selectedContract.wage} readOnly style={{ fontWeight: 700, color: '#059669' }} />
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              <div>
                <span className={`status-pill ${selectedContract.status === 'Running' ? 'running' : 'expired'}`}>
                  ● {selectedContract.status}
                </span>
              </div>
            </div>

            <div className="field-group">
              <label className="field-label">Working Schedule</label>
              <input className="field-input" value={selectedContract.workingSchedule} readOnly />
            </div>
          </div>

          <div style={{ backgroundColor: 'var(--bg-green-soft)', border: '1px solid var(--border-green)', borderRadius: 'var(--radius-lg)', padding: '16px', marginTop: '12px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, color: '#064E3B', marginBottom: '6px' }}>Salary Structure / Notes</h4>
            <p style={{ fontSize: '0.8rem', color: '#047857' }}>
              Structure Type: <strong>{selectedContract.structureType}</strong>. {selectedContract.notes}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>
          Contracts
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          List view of employee contracts with active Running contract highlighted
        </p>
      </div>

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          <button type="button" className="btn-action-primary">
            <Plus size={16} />
            <span>NEW</span>
          </button>

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search contracts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Contract</th>
              <th>Employee</th>
              <th>Start</th>
              <th>End</th>
              <th>Wage / Month</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((c) => (
              <tr
                key={c.id}
                style={{ cursor: 'pointer' }}
                onClick={() => setSelectedContract(c)}
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{c.contractNumber}</td>
                <td>{c.employeeName}</td>
                <td>{c.startDate}</td>
                <td>{c.endDate}</td>
                <td style={{ fontWeight: 700, color: '#059669' }}>{c.wage}</td>
                <td>
                  <span className={`status-pill ${c.status === 'Running' ? 'running' : 'expired'}`}>
                    ● {c.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
