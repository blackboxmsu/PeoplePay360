import React from 'react';

export default function StatusBadge({ status, label }) {
  if (!status) return null;
  const normalized = status.toLowerCase().replace(/[\s-]/g, '_');
  const displayLabel = label || status;

  return (
    <span className={`status-badge ${normalized}`}>
      <span style={{
        width: 6,
        height: 6,
        borderRadius: '50%',
        backgroundColor: 'currentColor'
      }} />
      {displayLabel}
    </span>
  );
}
