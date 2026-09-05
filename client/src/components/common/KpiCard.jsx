import React from 'react';

export default function KpiCard({
  label,
  value,
  icon: Icon,
  trend,
  trendPositive = true,
  subtext
}) {
  return (
    <div className="kpi-card">
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        {Icon && (
          <div className="kpi-icon-box">
            <Icon size={18} />
          </div>
        )}
      </div>

      <div className="kpi-value">{value}</div>

      {(trend || subtext) && (
        <div className="kpi-footer">
          {trend && (
            <span className={`kpi-pill ${trendPositive ? 'kpi-pill-up' : ''}`}>
              {trend}
            </span>
          )}
          {subtext && <span>{subtext}</span>}
        </div>
      )}
    </div>
  );
}
