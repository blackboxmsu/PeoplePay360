import React from 'react';

export default function PageHeader({
  title,
  subtitle,
  breadcrumbs = [],
  actionLabel,
  onAction,
  actionIcon: ActionIcon,
  actionColor = 'primary', // 'primary' | 'teal'
  secondaryAction
}) {
  return (
    <div className="page-header">
      <div className="page-header-text">
        {breadcrumbs.length > 0 && (
          <div className="page-breadcrumbs">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <span>{crumb}</span>
                {idx < breadcrumbs.length - 1 && <span>/</span>}
              </React.Fragment>
            ))}
          </div>
        )}
        <h1 className="page-title">{title}</h1>
        {subtitle && <p className="page-subtitle">{subtitle}</p>}
      </div>

      <div className="page-header-actions">
        {secondaryAction}
        {actionLabel && (
          <button
            type="button"
            className={`btn-primary ${actionColor === 'teal' ? 'btn-teal' : ''}`}
            onClick={onAction}
          >
            {ActionIcon && <ActionIcon size={16} />}
            <span>{actionLabel}</span>
          </button>
        )}
      </div>
    </div>
  );
}
