import React, { useState, useEffect } from 'react';
import { Search, Plus, ArrowLeft, Edit2, Lock, Save, Play, Calculator } from 'lucide-react';
import store from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';
import { evaluateSalaryRules } from '../../utils/salaryCalculator';

export default function SalaryRulesPage() {
  const { canEditPayrollStructures, isStructuresReadOnly } = useAuth();
  const [structures, setStructures] = useState(store.getSalaryStructures());
  const [rules, setRules] = useState(store.getAllSalaryRules());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRule, setSelectedRule] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Live tester state
  const [testWage, setTestWage] = useState(85000);
  const [testResult, setTestResult] = useState(null);

  // Form edit state
  const [formName, setFormName] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formCategory, setFormCategory] = useState('Allowance');
  const [formStructure, setFormStructure] = useState('Regular Salary');
  const [formSequence, setFormSequence] = useState(10);
  const [formComp, setFormComp] = useState('Fixed Amount');
  const [formFormula, setFormFormula] = useState('10000');

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setStructures([...store.getSalaryStructures()]);
      setRules([...store.getAllSalaryRules()]);
    });
    return unsub;
  }, []);

  const handleOpenRule = (r) => {
    setSelectedRule(r);
    setIsEditing(false);
    setFormName(r.name);
    setFormCode(r.code);
    setFormCategory(r.category);
    setFormStructure(r.structure);
    setFormSequence(r.sequence);
    setFormComp(r.computation);
    setFormFormula(r.formula || String(r.fixedAmount || r.percentage || ''));

    // Run test evaluation for this rule's structure
    runLiveTest(r.structure, testWage);
  };

  const runLiveTest = (structName, wageVal) => {
    const targetStruct = structures.find((s) => s.name === structName) || structures[0];
    if (targetStruct && targetStruct.rules) {
      const res = evaluateSalaryRules(wageVal, targetStruct.rules, 22, 22);
      setTestResult(res);
    }
  };

  const handleNewRule = () => {
    const defaultStruct = structures[0]?.name || 'Regular Salary';
    const newR = {
      id: `rule-${Date.now()}`,
      name: '',
      code: '',
      category: 'Allowance',
      structure: defaultStruct,
      sequence: 50,
      computation: 'Fixed Amount',
      formula: '5000',
      fixedAmount: 5000,
      percentage: 0
    };
    setSelectedRule(newR);
    setIsEditing(true);
    setFormName('');
    setFormCode('');
    setFormCategory('Allowance');
    setFormStructure(defaultStruct);
    setFormSequence(50);
    setFormComp('Fixed Amount');
    setFormFormula('5000');
    runLiveTest(defaultStruct, testWage);
  };

  const handleSaveRule = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formCode.trim()) return;

    // Save into the target structure
    const targetStruct = structures.find((s) => s.name === formStructure);
    if (targetStruct) {
      const existingRules = targetStruct.rules || [];
      const updatedRule = {
        name: formName,
        code: formCode.toUpperCase(),
        category: formCategory,
        sequence: Number(formSequence) || 1,
        computation: formComp,
        formula: formFormula,
        fixedAmount: formComp === 'Fixed Amount' ? Number(formFormula) || 0 : 0,
        percentage: formComp.startsWith('Percentage') ? Number(formFormula) || 0 : 0
      };

      const existingIdx = existingRules.findIndex((r) => r.code === formCode.toUpperCase());
      let newRulesList = [];
      if (existingIdx >= 0) {
        existingRules[existingIdx] = updatedRule;
        newRulesList = [...existingRules];
      } else {
        newRulesList = [...existingRules, updatedRule];
      }

      store.saveSalaryStructure({
        ...targetStruct,
        rules: newRulesList.sort((a, b) => a.sequence - b.sequence)
      });

      setSelectedRule({ ...updatedRule, structure: targetStruct.name });
      setIsEditing(false);
      runLiveTest(formStructure, testWage);
    }
  };

  const filtered = rules.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.structure.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FORM VIEW (Requirement A6: Name, Code, Category, Sequence, and live formula testing)
  if (selectedRule) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedRule(null)}
            >
              <ArrowLeft size={16} />
              <span>Salary Rules</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              {formName || 'New Rule'}
            </span>
          </div>

          {canEditPayrollStructures ? (
            <div style={{ display: 'flex', gap: '8px' }}>
              {isEditing ? (
                <button type="button" className="btn-action-primary" onClick={handleSaveRule}>
                  <Save size={15} />
                  <span>SAVE RULE</span>
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
                  Salary Rule / {formName || 'New Rule'}
                </h2>
                <span className="status-pill active">Sequence: {formSequence}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Defines individual computation method (Fixed, Percentage, Formula) and execution precedence
              </p>
            </div>

            <span
              className="status-pill"
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                backgroundColor:
                  formCategory === 'Basic' ? '#EFF6FF' :
                  formCategory === 'Allowance' ? '#ECFDF5' :
                  formCategory === 'Deduction' ? '#FEF2F2' : '#F1F5F9',
                color:
                  formCategory === 'Basic' ? '#1D4ED8' :
                  formCategory === 'Allowance' ? '#047857' :
                  formCategory === 'Deduction' ? '#B91C1C' : '#0F172A'
              }}
            >
              Category: {formCategory}
            </span>
          </div>

          <div className="form-grid-2col">
            <div className="field-group">
              <label className="field-label">Rule Name *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Basic Salary"
                  required
                />
              ) : (
                <input className="field-input" value={formName} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Salary Structure *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formStructure}
                  onChange={(e) => {
                    setFormStructure(e.target.value);
                    runLiveTest(e.target.value, testWage);
                  }}
                >
                  {structures.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </select>
              ) : (
                <input className="field-input" value={formStructure} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Code (Unique Symbol) *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formCode}
                  onChange={(e) => setFormCode(e.target.value.toUpperCase())}
                  placeholder="e.g. BASIC"
                  style={{ fontFamily: 'JetBrains Mono, monospace' }}
                  required
                />
              ) : (
                <input className="field-input" value={formCode} readOnly style={{ fontFamily: 'JetBrains Mono, monospace' }} />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Category *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                >
                  <option value="Basic">Basic</option>
                  <option value="Allowance">Allowance</option>
                  <option value="Gross">Gross</option>
                  <option value="Deduction">Deduction</option>
                  <option value="Net">Net</option>
                </select>
              ) : (
                <input className="field-input" value={formCategory} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Sequence (Precedence) *</label>
              {isEditing ? (
                <input
                  type="number"
                  className="field-input"
                  value={formSequence}
                  onChange={(e) => setFormSequence(e.target.value)}
                  required
                />
              ) : (
                <input className="field-input" value={formSequence} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Computation Type *</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formComp}
                  onChange={(e) => setFormComp(e.target.value)}
                >
                  <option value="Fixed Amount">Fixed Amount</option>
                  <option value="Percentage of Wage">Percentage of Wage</option>
                  <option value="Percentage of Basic">Percentage of Basic</option>
                  <option value="Formula">Formula</option>
                </select>
              ) : (
                <input className="field-input" value={formComp} readOnly />
              )}
            </div>

            <div className="field-group" style={{ gridColumn: '1 / -1' }}>
              <label className="field-label">Computation Expression / Formula / Fixed Value *</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formFormula}
                  onChange={(e) => setFormFormula(e.target.value)}
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#059669', fontWeight: 700 }}
                  required
                />
              ) : (
                <input
                  className="field-input"
                  value={formFormula}
                  readOnly
                  style={{ fontFamily: 'JetBrains Mono, monospace', color: '#059669', fontWeight: 700 }}
                />
              )}
            </div>
          </div>

          {/* LIVE COMPUTATION PREVIEW TOOL (Requirement A6: Demonstrates ordered rule dependencies) */}
          <div style={{ marginTop: '24px', backgroundColor: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-lg)', padding: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Calculator size={18} style={{ color: '#059669' }} />
                <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Live Rule Computation Tester ({formStructure})
                </h4>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Sample Contract Wage:</span>
                <input
                  type="number"
                  className="field-input"
                  style={{ width: '130px', padding: '4px 8px', fontSize: '0.85rem' }}
                  value={testWage}
                  onChange={(e) => {
                    const w = parseFloat(e.target.value) || 0;
                    setTestWage(w);
                    runLiveTest(formStructure, w);
                  }}
                />
              </div>
            </div>

            {testResult && (
              <div>
                <div className="table-panel">
                  <table className="odoo-table" style={{ fontSize: '0.8rem' }}>
                    <thead>
                      <tr>
                        <th style={{ width: '80px' }}>Seq</th>
                        <th>Code</th>
                        <th>Rule Name</th>
                        <th>Category</th>
                        <th>Method</th>
                        <th style={{ textAlign: 'right' }}>Evaluated Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testResult.lines.map((l) => (
                        <tr
                          key={l.code}
                          style={{
                            backgroundColor: l.code === formCode ? '#ECFDF5' : 'transparent',
                            fontWeight: l.category === 'Net' || l.category === 'Gross' ? 800 : 500
                          }}
                        >
                          <td style={{ color: '#059669', fontWeight: 700 }}>{l.sequence}</td>
                          <td style={{ fontFamily: 'JetBrains Mono, monospace' }}>{l.code}</td>
                          <td>{l.ruleName}</td>
                          <td>{l.category}</td>
                          <td>{l.computation}</td>
                          <td style={{ textAlign: 'right', fontWeight: 800, color: l.category === 'Deduction' ? '#DC2626' : '#059669' }}>
                            {l.formattedAmount}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '20px', marginTop: '12px', fontSize: '0.85rem' }}>
                  <div>Gross: <strong>{testResult.summary.formattedGross}</strong></div>
                  <div>Deductions: <strong style={{ color: '#DC2626' }}>{testResult.summary.formattedDeductions}</strong></div>
                  <div>Final Net Salary: <strong style={{ color: '#059669', fontSize: '1rem' }}>{testResult.summary.formattedNet}</strong></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Salary Rules
          </h1>
          {isStructuresReadOnly && (
            <span className="status-pill draft" style={{ fontSize: '0.75rem' }}>
              <Lock size={12} />
              <span>Read-Only Mode</span>
            </span>
          )}
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Manage computation rules across Basic, Allowances, Gross, Deductions, and Net salary with sequence dependencies
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
            <button type="button" className="btn-action-primary" onClick={handleNewRule}>
              <Plus size={16} />
              <span>NEW RULE</span>
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
              placeholder="Search rules by name, code, category, structure..."
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
              <th style={{ width: '90px' }}>Sequence</th>
              <th>Rule Name</th>
              <th>Code</th>
              <th>Category</th>
              <th>Structure</th>
              <th>Computation Method</th>
              <th>Formula / Value</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r, idx) => (
              <tr
                key={`${r.code}-${idx}`}
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenRule(r)}
                title="Click to view/test rule"
              >
                <td style={{ fontWeight: 800, color: '#059669' }}>{r.sequence}</td>
                <td style={{ fontWeight: 600 }}>{r.name}</td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-primary)', fontWeight: 700 }}>
                  {r.code}
                </td>
                <td>
                  <span
                    className="status-pill"
                    style={{
                      fontSize: '0.72rem',
                      backgroundColor:
                        r.category === 'Basic' ? '#EFF6FF' :
                        r.category === 'Allowance' ? '#ECFDF5' :
                        r.category === 'Deduction' ? '#FEF2F2' : '#F1F5F9',
                      color:
                        r.category === 'Basic' ? '#1D4ED8' :
                        r.category === 'Allowance' ? '#047857' :
                        r.category === 'Deduction' ? '#B91C1C' : '#0F172A'
                    }}
                  >
                    {r.category}
                  </span>
                </td>
                <td>{r.structure}</td>
                <td>{r.computation}</td>
                <td style={{ fontFamily: 'JetBrains Mono, monospace', color: '#059669', fontWeight: 600 }}>
                  {r.formula || r.fixedAmount || '—'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
