import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle2, X } from 'lucide-react';

export default function QuickAttendanceWidget({
  isOpen,
  onClose,
  userName = 'Aarav Mehta',
  isCheckedIn,
  onToggleCheckIn
}) {
  const [elapsedTime, setElapsedTime] = useState('6h 56m');
  const [checkInTime, setCheckInTime] = useState('09:30 AM');

  useEffect(() => {
    // calculate or format simple demo timer
    if (isCheckedIn) {
      setCheckInTime('09:30 AM');
      setElapsedTime('6h 56m');
    }
  }, [isCheckedIn]);

  if (!isOpen) return null;

  return (
    <div className="attendance-popup">
      <div className="attendance-popup-header">
        <span className="attendance-popup-title">Quick Attendance</span>
        <button
          type="button"
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
        >
          <X size={18} />
        </button>
      </div>

      <div>
        <p style={{ fontSize: '0.8rem', color: '#64748B' }}>Welcome back,</p>
        <h3 className="popup-user-name">{userName}!</h3>
      </div>

      <div className="attendance-timer-card">
        <div className="timer-row">
          <span>{isCheckedIn ? `${checkInTime} — Now` : 'Not Checked In'}</span>
          <strong>{isCheckedIn ? elapsedTime : '0h 00m'}</strong>
        </div>
        <div className="timer-row" style={{ borderTop: '1px dashed #A7F3D0', paddingTop: '6px' }}>
          <span>Today Total</span>
          <strong>{isCheckedIn ? elapsedTime : '0h 00m'}</strong>
        </div>
      </div>

      <button
        type="button"
        className={`btn-check-action ${isCheckedIn ? 'check-out' : 'check-in'}`}
        onClick={onToggleCheckIn}
      >
        <Clock size={16} />
        <span>{isCheckedIn ? 'Check Out' : 'Check In'}</span>
      </button>

      <p style={{ fontSize: '0.72rem', color: '#94A3B8', textAlign: 'center' }}>
        {isCheckedIn ? '● Active presence session tracked' : '○ Click Check In to start your work hours'}
      </p>
    </div>
  );
}
