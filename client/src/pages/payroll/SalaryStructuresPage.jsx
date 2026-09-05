import React, { useState, useEffect } from 'react';
import { Search, Plus, ArrowLeft, Edit2, Lock, Shield, Save, X, Trash2 } from 'lucide-react';
import store from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';

export default function SalaryStructuresPage() {
  const { canEditPayrollStructures, isStructuresReadOnly } = useAuth();
  const [structures, setStructures] = useState(store.getSalaryStructures());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStructure, setSelectedStructure] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formActive, setFormActive] = useState(true);
  const [formRules, setFormRules] = useState([]);

  // Add rule modal state inside structure
  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleCode, setNewRuleCode] = useState('');
  const [newRuleCat, setNewRuleCat] = useState('Allowance');
  const [newRuleSeq, setNewRuleSeq] = useState(25);
  const [newRuleComp, setNewRuleComp] = useState('Fixed Amount');
  const [newRuleFormula, setNewRuleFormula] = useState('5000');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setStructures([...store.getSalaryStructures()]);
    });
    return unsub;
  }, []);

  const handleOpenStructure = (s) => {
    setSelectedStructure(s);
    setIsEditing(false);
    setFormName(s.name);
    setFormActive(s.active !== false);
    setFormRules([...(s.rules || [])].sort((a, b) => a.sequence - b.sequence));
  };

  const handleNewStructure = () => {
    const newStruct = {
      id: `str-${Date.now()}`,
      name: '',
      rulesCount: 0,
      employeesCount: 0,
      active: true,
      rules: [
        { sequence: 1, name: 'Basic Salary', code: 'BASIC', category: 'Basic', computation: 'Percentage of Wage', percentage: 50, fixedAmount: 0, formula: 'WAGE * 0.50' },
        { sequence: 10, name: 'Gross Salary', code: 'GROSS', category: 'Gross', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'BASIC' },
        { sequence: 20, name: 'Net Salary', code: 'NET', category: 'Net', computation: 'Formula', percentage: 0, fixedAmount: 0, formula: 'GROSS' }
      ]
    };
    setSelectedStructure(newStruct);
    setIsEditing(true);
    setFormName('');
    setFormActive(true);
    setFormRules(newStruct.rules);
  };

  const handleSaveStructure = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const toSave = {
      id: selectedStructure.id || `str-${Date.now()}`,
      name: formName,
      active: formActive,
      rulesCount: formRules.length,
      employeesCount: selectedStructure.employeesCount || 0,
      rules: [...formRules].sort((a, b) => a.sequence - b.sequence)
    };

    store.saveSalaryStructure(toSave);
    setSelectedStructure(toSave);
    setIsEditing(false);
  };

  const handleAddRule = (e) => {
    e.preventDefault();
    if (!newRuleName.trim() || !newRuleCode.trim()) return;

    const ruleObj = {
      sequence: Number(newRuleSeq) || 50,
      name: newRuleName,
      code: newRuleCode.toUpperCase(),
      category: newRuleCat,
      computation: newRuleComp,
      formula: newRuleFormula,
      fixedAmount: newRuleComp === 'Fixed Amount' ? Number(newRuleFormula) || 0 : 0,
      percentage: newRuleComp.startsWith('Percentage') ? Number(newRuleFormula) || 0 : 0
    };

    const updated = [...formRules, ruleObj].sort((a, b) => a.sequence - b.sequence);
    setFormRules(updated);
    setIsAddRuleOpen(false);
    setNewRuleName('');
    setNewRuleCode('');
  };

  const handleDeleteRule = (code) => {
    setFormRules(formRules.filter((r) => r.code !== code));
  };

  const filtered = structures.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FORM VIEW (Requirement A5: Form view manages included salary rules and their execution sequence)
  if (selectedStructure) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedStructure(null)}
            >
              <ArrowLeft size={16} />
              <span>Structures</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {formName || 'New Salary Structure'}
            </span>
          </div>

          {canEditPayrollStructures ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              {isEditing ? (
                <button type="button" className="btn-action-primary" onClick={handleSaveStructure}>
                  <Save size={15} />
                  <span>SAVE STRUCTURE</span>
                </button>
              ) : (
                <button type="button" className="btn-action-primary" onClick={() => setIsEditing(true)}>
                  <Edit2 size={15} />
                  <span>EDIT</span>
                </button>
              )}
            </div>
          ) : (
            <span className="status-pill draft" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              <Lock size={12} />
              <span>Read-Only Mode (HR Payroll User)</span>
            </span>
          )}
        </div>

        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  Salary Structure / {formName || 'New Structure'}
                </h2>
                <span className={`status-pill ${formActive ? 'active' : 'draft'}`}>
                  ● {formActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Containers for organized collections of salary rules dictating ordered payslip computation
              </p>
            </div>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Structure Name *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Regular Salary"
                  required
                />
              ) : (
                <input className="field-input" value={formName} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Active Status</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formActive ? 'True' : 'False'}
                  onChange={(e) => setFormActive(e.target.value === 'True')}
                >
                  <option value="True">Active</option>
                  <option value="False">Inactive</option>
                </select>
              ) : (
                <input className="field-input" value={formActive ? 'Active' : 'Inactive'} readOnly />
              )}
            </div>
          </div>

          {/* Sub-table: Salary Rules in Sequence */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Included Salary Rules & Execution Sequence ({formRules.length})
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  Processed strictly in ascending sequence so downstream rules (Gross, Net, Deductions) build on earlier calculated codes.
                </p>
              </div>

              {isEditing && (
                <button
                  type="button"
                  className="btn-action-primary"
                  style={{ fontSize: '0.8rem', padding: '6px 12px' }}
                  onClick={() => setIsAddRuleOpen(true)}
                >
                  <Plus size={14} />
                  <span>ADD RULE</span>
                </button>
              )}
            </div>

            <div className="table-panel">
              <table className="odoo-table" style={{ fontSize: '0.825rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '90px' }}>Sequence</th>
                    <th>Rule Name</th>
                    <th>Code</th>
                    <th>Category</th>
                    <th>Computation Method</th>
                    <th>Formula / Expression</th>
                    {isEditing && <th style={{ width: '60px' }}>Action</th>}
                  </tr>
                </thead>
                <tbody>
                  {formRules.map((rule) => (
                    <tr key={rule.code}>
                      <td style={{ fontWeight: 800, color: '#059669' }}>{rule.sequence}</td>
                      <td style={{ fontWeight: 600 }}>{rule.name}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)', fontWeight: 700 }}>
                        {rule.code}
                      </td>
                      <td>
                        <span
                          className="status-pill"
                          style={{
                            fontSize: '0.72rem',
                            backgroundColor:
                              rule.category === 'Basic' ? '#EFF6FF' :
                              rule.category === 'Allowance' ? '#ECFDF5' :
                              rule.category === 'Deduction' ? '#FEF2F2' : '#F1F5F9',
                            color:
                              rule.category === 'Basic' ? '#1D4ED8' :
                              rule.category === 'Allowance' ? '#047857' :
                              rule.category === 'Deduction' ? '#B91C1C' : '#0F172A'
                          }}
                        >
                          {rule.category}
                        </span>
                      </td>
                      <td>{rule.computation}</td>
                      <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#059669', fontWeight: 600 }}>
                        {rule.formula || rule.fixedAmount || '—'}
                      </td>
                      {isEditing && (
                        <td>
                          <button
                            type="button"
                            className="btn-icon"
                            style={{ color: '#DC2626' }}
                            onClick={() => handleDeleteRule(rule.code)}
                            title="Remove rule from structure"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ADD RULE MODAL */}
        {isAddRuleOpen && (
          <div className="modal-backdrop" onClick={() => setIsAddRuleOpen(false)}>
            <div className="modal-content" style={{ maxWidth: '540px', width: '90%' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>Add Salary Rule to Structure</h3>
                <button type="button" className="btn-icon" onClick={() => setIsAddRuleOpen(false)}>
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleAddRule}>
                <div className="modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', padding: '20px' }}>
                  <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="field-label">Rule Name *</label>
                    <input
                      className="field-input"
                      value={newRuleName}
                      onChange={(e) => setNewRuleName(e.target.value)}
                      placeholder="e.g. Medical Allowance"
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Code (Unique Symbol) *</label>
                    <input
                      className="field-input"
                      value={newRuleCode}
                      onChange={(e) => setNewRuleCode(e.target.value.toUpperCase())}
                      placeholder="e.g. MED"
                      required
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Sequence (Execution Order) *</label>
                    <input
                      type="number"
                      className="field-input"
                      value={newRuleSeq}
                      onChange={(e) => setNewRuleSeq(e.target.value)}
                      required
                    />
                  </div>

                  <div className="field-group">
                    <label className="field-label">Category *</label>
                    <select
                      className="field-input"
                      value={newRuleCat}
                      onChange={(e) => setNewRuleCat(e.target.value)}
                    >
                      <option value="Basic">Basic</option>
                      <option value="Allowance">Allowance</option>
                      <option value="Gross">Gross</option>
                      <option value="Deduction">Deduction</option>
                      <option value="Net">Net</option>
                    </select>
                  </div>

                  <div className="field-group">
                    <label className="field-label">Computation Type *</label>
                    <select
                      className="field-input"
                      value={newRuleComp}
                      onChange={(e) => setNewRuleComp(e.target.value)}
                    >
                      <option value="Fixed Amount">Fixed Amount</option>
                      <option value="Percentage of Wage">Percentage of Wage</option>
                      <option value="Percentage of Basic">Percentage of Basic</option>
                      <option value="Formula">Formula</option>
                    </select>
                  </div>

                  <div className="field-group" style={{ gridColumn: '1 / -1' }}>
                    <label className="field-label">Expression / Formula / Amount *</label>
                    <input
                      className="field-input"
                      value={newRuleFormula}
                      onChange={(e) => setNewRuleFormula(e.target.value)}
                      placeholder="e.g. 5000 or BASIC * 0.10 or GROSS - PF"
                      required
                      style={{ fontFamily: 'JetBrains Mono, monospace' }}
                    />
                  </div>
                </div>

                <div className="modal-footer" style={{ padding: '14px 20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                  <button
                    type="button"
                    className="btn-action-primary"
                    style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
                    onClick={() => setIsAddRuleOpen(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-action-primary">
                    <Save size={15} />
                    <span>Include Rule</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // LIST VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Salary Structures
          </h1>
          {isStructuresReadOnly && (
            <span className="status-pill draft" style={{ fontSize: '0.75rem' }}>
              <Lock size={12} />
              <span>Read-Only Mode</span>
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Structures act as containers for organized collections of salary rules dictating how employee payslips calculate
        </p>
      </div>

      {isStructuresReadOnly && (
        <div style={{
          backgroundColor: '#FFFBEB',
          border: '1px solid #FDE68A',
          color: '#92400E',
          borderRadius: 'var(--radius-md)',
          padding: '10px 14px',
          fontSize: '0.825rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Lock size={15} style={{ flexShrink: 0 }} />
          <span>
            <strong>Role Scope Notice:</strong> As an <strong>HR Payroll User</strong>, you have Read-Only access to Salary Structures and Salary Rules. Full CRUD configurations require an <strong>HR Payroll Manager</strong> or <strong>Admin</strong>.
          </span>
        </div>
      )}

      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canEditPayrollStructures ? (
            <button type="button" className="btn-action-primary" onClick={handleNewStructure}>
              <Plus size={16} />
              <span>NEW STRUCTURE</span>
            </button>
          ) : (
            <button
              type="button"
              className="btn-action-primary"
              disabled
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
              title="Read-only access for HR Payroll User"
            >
              <Lock size={14} />
              <span>NEW (Locked)</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search structures..."
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
              <th>Structure Name</th>
              <th>Rules Count</th>
              <th>Assigned Employees</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenStructure(s)}
                title="Click to view/manage included rules"
              >
                <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{s.name}</td>
                <td style={{ fontWeight: 600 }}>{s.rules?.length || s.rulesCount} rules</td>
                <td>{s.employeesCount || 0} employees</td>
                <td>
                  <span className={`status-pill ${s.active !== false ? 'active' : 'draft'}`}>
                    ● {s.active !== false ? 'Active' : 'Inactive'}
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
