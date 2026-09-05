import React, { useState, useEffect } from 'react';
import { Clock, Play, Square, X } from 'lucide-react';

export default function QuickAttendanceWidget({
  isOpen,
  onClose,
  userName = 'Aarav Mehta',
  isCheckedIn,
  onToggleCheckIn,
  checkInTime = '09:05 AM',
  elapsedTime = '6h56'
}) {
  if (!isOpen) return null;

  return (
    <div className="attendance-popup">
      {/* Header: Attendance Widget with Status Dot & Close */}
      <div className="attendance-popup-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="attendance-popup-title" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Attendance Widget
          </span>
          <span
            style={{
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: isCheckedIn ? '#10B981' : '#EF4444',
              display: 'inline-block',
              boxShadow: isCheckedIn ? '0 0 6px rgba(16, 185, 129, 0.6)' : '0 0 6px rgba(239, 68, 68, 0.6)'
            }}
            title={isCheckedIn ? 'Checked In' : 'Checked Out'}
          />
        </div>

        <button
          type="button"
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8', padding: '2px' }}
          title="Close"
        >
          <X size={18} />
        </button>
      </div>

      {/* Greeting & Name */}
      <div>
        <p style={{ fontSize: '0.8rem', color: '#64748B', margin: '0 0 2px 0' }}>Welcome back</p>
        <h3 className="popup-user-name" style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>
          {userName}!
        </h3>
      </div>

      {/* Timer Card */}
      <div className="attendance-timer-card">
        <div className="timer-row">
          <span>{isCheckedIn ? `${checkInTime} — Now` : 'Not Checked In'}</span>
          <strong style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {isCheckedIn ? elapsedTime : '0h 00m'}
          </strong>
        </div>
        <div className="timer-row" style={{ borderTop: '1px dashed #A7F3D0', paddingTop: '6px' }}>
          <span>Today</span>
          <strong style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            {isCheckedIn ? elapsedTime : '0h 00m'}
          </strong>
        </div>
      </div>

      {/* Action Button: Check In / Check Out */}
      <button
        type="button"
        className={`btn-check-action ${isCheckedIn ? 'check-out' : 'check-in'}`}
        onClick={onToggleCheckIn}
        style={{
          padding: '12px',
          fontSize: '0.95rem',
          fontWeight: 700,
          borderRadius: 'var(--radius-md)',
          backgroundColor: isCheckedIn ? '#3B82F6' : '#059669',
          color: '#FFFFFF'
        }}
      >
        {isCheckedIn ? (
          <>
            <Square size={16} fill="currentColor" />
            <span>Check Out</span>
          </>
        ) : (
          <>
            <Play size={16} fill="currentColor" />
            <span>Check In</span>
          </>
        )}
      </button>

      {/* Footer Note (Exactly from image) */}
      <p style={{ fontSize: '0.73rem', color: '#64748B', textAlign: 'center', margin: 0, lineHeight: 1.4 }}>
        Employees can mark attendance from the quick widget and review records from the Attendance module.
      </p>
    </div>
  );
}
