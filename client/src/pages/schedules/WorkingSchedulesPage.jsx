import React, { useState, useEffect } from 'react';
import { Search, Plus, ArrowLeft, Clock, Calendar, Check, Save, Trash2, Shield, Info, Edit2 } from 'lucide-react';
import store from '../../services/dataStore';
import { useAuth } from '../../context/AuthContext';

const DEFAULT_DAYS = [
  { day: 'Monday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
  { day: 'Tuesday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
  { day: 'Wednesday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
  { day: 'Thursday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
  { day: 'Friday', active: true, startTime: '09:00', endTime: '18:00', breakHours: 1.0 },
  { day: 'Saturday', active: false, startTime: '09:00', endTime: '14:00', breakHours: 0.0 },
  { day: 'Sunday', active: false, startTime: '00:00', endTime: '00:00', breakHours: 0.0 }
];

export default function WorkingSchedulesPage() {
  const { canManageHR } = useAuth();
  const [schedules, setSchedules] = useState(store.getWorkingSchedules());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Form edit state
  const [formName, setFormName] = useState('');
  const [formType, setFormType] = useState('Standard 5-Day');
  const [formCompany, setFormCompany] = useState('OxP Pvt Ltd');
  const [formStatus, setFormStatus] = useState('Active');
  const [formNotes, setFormNotes] = useState('');
  const [formDays, setFormDays] = useState(DEFAULT_DAYS);

  useEffect(() => {
    const unsub = store.subscribe(() => {
      setSchedules([...store.getWorkingSchedules()]);
    });
    return unsub;
  }, []);

  // Open Form view for a selected schedule
  const handleOpenSchedule = (sched) => {
    setSelectedSchedule(sched);
    setIsEditing(false);
    setFormName(sched.name);
    setFormType(sched.calendarType || 'Standard 5-Day');
    setFormCompany(sched.company || 'OxP Pvt Ltd');
    setFormStatus(sched.status || 'Active');
    setFormNotes(sched.notes || '');
    setFormDays(sched.days || DEFAULT_DAYS);
  };

  // Open Form view to create a NEW schedule
  const handleNewSchedule = () => {
    const newTemplate = {
      id: null,
      name: 'New Working Schedule',
      calendarType: 'Standard 5-Day',
      company: 'OxP Pvt Ltd',
      status: 'Active',
      notes: 'Weekly working pattern defining daily hours and breaks.',
      days: JSON.parse(JSON.stringify(DEFAULT_DAYS))
    };
    setSelectedSchedule(newTemplate);
    setIsEditing(true);
    setFormName(newTemplate.name);
    setFormType(newTemplate.calendarType);
    setFormCompany(newTemplate.company);
    setFormStatus(newTemplate.status);
    setFormNotes(newTemplate.notes);
    setFormDays(newTemplate.days);
  };

  // Auto-calculate daily net hours
  const calculateDailyHours = (day) => {
    if (!day.active || !day.startTime || !day.endTime) return 0;
    const [sh, sm] = day.startTime.split(':').map(Number);
    const [eh, em] = day.endTime.split(':').map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;
    let diff = (endMins - startMins) / 60;
    if (diff < 0) diff += 24;
    return Math.max(0, diff - (Number(day.breakHours) || 0));
  };

  // Requirement A3: Calculate total weekly hours automatically from the defined schedule
  const currentWeeklyHours = formDays.reduce((sum, d) => sum + calculateDailyHours(d), 0);
  const currentWorkDaysCount = formDays.filter((d) => d.active).length;

  const handleDayChange = (index, field, value) => {
    const updated = [...formDays];
    updated[index] = { ...updated[index], [field]: value };
    setFormDays(updated);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formName.trim()) return;

    const toSave = {
      id: selectedSchedule.id || `ws-${Date.now()}`,
      name: formName,
      calendarType: formType,
      company: formCompany,
      status: formStatus,
      notes: formNotes,
      days: formDays
    };

    const saved = store.saveWorkingSchedule(toSave);
    setSelectedSchedule(saved);
    setIsEditing(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this working schedule?')) {
      store.deleteWorkingSchedule(id);
      setSelectedSchedule(null);
    }
  };

  const filtered = schedules.filter(
    (s) =>
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.calendarType && s.calendarType.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // FORM VIEW
  if (selectedSchedule) {
    const employeesUsing = store.getEmployees().filter(
      (e) => e.workingScheduleId === selectedSchedule.id || e.workingSchedule === selectedSchedule.name
    );
    const contractsUsing = store.getContracts().filter(
      (c) => c.workingScheduleId === selectedSchedule.id || c.workingSchedule === selectedSchedule.name
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Top Action / Breadcrumb Bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="btn-action-primary"
              style={{ backgroundColor: '#FFFFFF', color: 'var(--text-secondary)', border: '1px solid var(--border-subtle)' }}
              onClick={() => setSelectedSchedule(null)}
            >
              <ArrowLeft size={16} />
              <span>Working Schedules</span>
            </button>
            <span style={{ color: 'var(--text-muted)' }}>/</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{formName || 'New Schedule'}</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {canManageHR && (
              <>
                {isEditing ? (
                  <button type="button" className="btn-action-primary" onClick={handleSave}>
                    <Save size={15} />
                    <span>SAVE</span>
                  </button>
                ) : (
                  <button type="button" className="btn-action-primary" onClick={() => setIsEditing(true)}>
                    <Edit2 size={15} />
                    <span>EDIT</span>
                  </button>
                )}

                {selectedSchedule.id && !isEditing && (
                  <button
                    type="button"
                    className="btn-action-primary"
                    style={{ backgroundColor: '#FEE2E2', color: '#DC2626', border: '1px solid #FCA5A5' }}
                    onClick={() => handleDelete(selectedSchedule.id)}
                    title="Delete schedule"
                  >
                    <Trash2 size={15} />
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Schedule Form Card */}
        <div className="odoo-form-card">
          <div className="odoo-form-header">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '1.3rem', fontWeight: 800, margin: 0 }}>
                  {formName}
                </h2>
                <span className={`status-pill ${formStatus === 'Active' ? 'active' : 'draft'}`}>
                  ● {formStatus}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Standardizes attendance expectations and payroll working hours computation
              </p>
            </div>

            {/* Live Derived Weekly Hours Badge */}
            <div
              style={{
                backgroundColor: 'var(--bg-green-soft)',
                border: '1px solid var(--border-green)',
                borderRadius: 'var(--radius-lg)',
                padding: '10px 18px',
                textAlign: 'right'
              }}
            >
              <div style={{ fontSize: '0.72rem', color: '#047857', fontWeight: 700, textTransform: 'uppercase' }}>
                Total Weekly Hours (Auto-Derived)
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#064E3B' }}>
                {currentWeeklyHours.toFixed(1)} <span style={{ fontSize: '0.9rem' }}>Hours/Week</span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#059669' }}>
                {currentWorkDaysCount} Working Days / Week
              </div>
            </div>
          </div>

          {/* Form Top Attributes */}
          <div className="form-grid-2col" style={{ marginTop: '16px' }}>
            <div className="field-group">
              <label className="field-label">Schedule Name</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Standard 40 Hours"
                  required
                />
              ) : (
                <input className="field-input" value={formName} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Calendar Type</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formType}
                  onChange={(e) => setFormType(e.target.value)}
                >
                  <option value="Standard 5-Day">Standard 5-Day</option>
                  <option value="Flexible">Flexible</option>
                  <option value="Part-Time">Part-Time</option>
                  <option value="Shift Rotation">Shift Rotation</option>
                </select>
              ) : (
                <input className="field-input" value={formType} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Company</label>
              {isEditing ? (
                <input
                  className="field-input"
                  value={formCompany}
                  onChange={(e) => setFormCompany(e.target.value)}
                />
              ) : (
                <input className="field-input" value={formCompany} readOnly />
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Status</label>
              {isEditing ? (
                <select
                  className="field-input"
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Archived">Archived</option>
                </select>
              ) : (
                <input className="field-input" value={formStatus} readOnly />
              )}
            </div>
          </div>

          {/* Weekly Pattern Table (Requirement A3: Day, Start Time, End Time, Break) */}
          <div style={{ marginTop: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                  Weekly Working Pattern
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
                  Define daily working window and break duration. Daily and weekly hours calculate automatically.
                </p>
              </div>
            </div>

            <div className="table-panel">
              <table className="odoo-table" style={{ fontSize: '0.85rem' }}>
                <thead>
                  <tr>
                    <th style={{ width: '130px' }}>Day</th>
                    <th style={{ width: '110px' }}>Work Day?</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Break (Hours)</th>
                    <th style={{ textAlign: 'right' }}>Calculated Net Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {formDays.map((d, index) => {
                    const dailyNet = calculateDailyHours(d);
                    return (
                      <tr
                        key={d.day}
                        style={{
                          backgroundColor: d.active ? 'transparent' : '#F8FAFC',
                          opacity: d.active ? 1 : 0.65
                        }}
                      >
                        <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          {d.day}
                        </td>
                        <td>
                          {isEditing ? (
                            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                              <input
                                type="checkbox"
                                checked={d.active}
                                onChange={(e) => handleDayChange(index, 'active', e.target.checked)}
                              />
                              <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>
                                {d.active ? 'Yes' : 'Off'}
                              </span>
                            </label>
                          ) : (
                            <span className={`status-pill ${d.active ? 'active' : 'draft'}`} style={{ fontSize: '0.72rem' }}>
                              {d.active ? 'Working Day' : 'Day Off'}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              type="time"
                              className="field-input"
                              style={{ padding: '4px 8px', width: '110px' }}
                              value={d.startTime}
                              disabled={!d.active}
                              onChange={(e) => handleDayChange(index, 'startTime', e.target.value)}
                            />
                          ) : (
                            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {d.active ? d.startTime : '—'}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              type="time"
                              className="field-input"
                              style={{ padding: '4px 8px', width: '110px' }}
                              value={d.endTime}
                              disabled={!d.active}
                              onChange={(e) => handleDayChange(index, 'endTime', e.target.value)}
                            />
                          ) : (
                            <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                              {d.active ? d.endTime : '—'}
                            </span>
                          )}
                        </td>
                        <td>
                          {isEditing ? (
                            <input
                              type="number"
                              step="0.25"
                              min="0"
                              max="4"
                              className="field-input"
                              style={{ padding: '4px 8px', width: '80px' }}
                              value={d.breakHours}
                              disabled={!d.active}
                              onChange={(e) => handleDayChange(index, 'breakHours', parseFloat(e.target.value) || 0)}
                            />
                          ) : (
                            <span>{d.active ? `${d.breakHours} hr` : '—'}</span>
                          )}
                        </td>
                        <td style={{ textAlign: 'right', fontWeight: 700, color: d.active ? '#059669' : 'var(--text-muted)' }}>
                          {d.active ? `${dailyNet.toFixed(1)} hrs` : '0.0 hrs'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr style={{ backgroundColor: '#F1F5F9', fontWeight: 800 }}>
                    <td colSpan={5} style={{ textAlign: 'right' }}>
                      Total Weekly Derived Hours:
                    </td>
                    <td style={{ textAlign: 'right', color: '#064E3B', fontSize: '0.95rem' }}>
                      {currentWeeklyHours.toFixed(1)} hrs / week
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>

          {/* Connected Assignments Area (Requirement A3: Assign to employees or contracts) */}
          <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Assigned Employees ({employeesUsing.length})
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Used as expected attendance benchmark for shift compliance and punch comparisons.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {employeesUsing.length > 0 ? (
                  employeesUsing.map((e) => (
                    <span key={e.id} className="status-pill active" style={{ fontSize: '0.72rem' }}>
                      {e.name} ({e.department})
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No employees assigned</span>
                )}
              </div>
            </div>

            <div style={{ backgroundColor: '#F8FAFC', border: '1px solid var(--border-subtle)', borderRadius: 'var(--radius-md)', padding: '14px' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '6px' }}>
                Assigned Contracts ({contractsUsing.length})
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Standardizes working hours expectation in active contract terms for payroll processing.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {contractsUsing.length > 0 ? (
                  contractsUsing.map((c) => (
                    <span key={c.id} className="status-pill running" style={{ fontSize: '0.72rem' }}>
                      {c.contractNumber} — {c.employeeName}
                    </span>
                  ))
                ) : (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No contracts assigned</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // LIST VIEW (Requirement A3: List view should show key metrics like name, type, and weekly hours)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Working Schedules
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Define weekly working patterns, daily start/end times, and automatically derived total weekly hours
        </p>
      </div>

      {/* Control Bar */}
      <div className="odoo-control-bar">
        <div className="control-bar-left">
          {canManageHR && (
            <button type="button" className="btn-action-primary" onClick={handleNewSchedule}>
              <Plus size={16} />
              <span>NEW</span>
            </button>
          )}

          <div className="search-input-box">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search working schedules..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* List Table */}
      <div className="table-panel">
        <table className="odoo-table">
          <thead>
            <tr>
              <th>Schedule Name</th>
              <th>Calendar Type</th>
              <th>Days / Week</th>
              <th>Weekly Hours</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const weeklyHours = store.calculateWeeklyHours(s.days);
              const activeDays = (s.days || []).filter((d) => d.active).length;
              return (
                <tr
                  key={s.id}
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleOpenSchedule(s)}
                  title="Click to view/edit working schedule"
                >
                  <td style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Clock size={16} style={{ color: '#059669' }} />
                      <span>{s.name}</span>
                    </div>
                  </td>
                  <td>{s.calendarType || 'Standard 5-Day'}</td>
                  <td>{activeDays} Days</td>
                  <td style={{ fontWeight: 700, color: '#059669' }}>
                    {weeklyHours.toFixed(1)} hrs / week
                  </td>
                  <td>{s.company || 'OxP Pvt Ltd'}</td>
                  <td>
                    <span className={`status-pill ${s.status === 'Active' ? 'active' : 'draft'}`}>
                      ● {s.status || 'Active'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
