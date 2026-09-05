import React from 'react';
import { Search, Inbox } from 'lucide-react';

export default function DataTable({
  columns = [],
  data = [],
  searchPlaceholder = 'Search records...',
  searchValue = '',
  onSearchChange,
  emptyTitle = 'No records found',
  emptySubtitle = 'Get started by creating a new record.',
  actionSlot
}) {
  return (
    <div className="data-table-container">
      <div className="data-table-toolbar">
        <div className="search-box">
          <Search size={16} />
          <input
            type="text"
            className="search-input"
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
          />
        </div>

        {actionSlot && <div>{actionSlot}</div>}
      </div>

      <div className="data-table-wrapper">
        <table className="data-table">
          <thead>
            <tr>
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={col.width ? { width: col.width } : undefined}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rIdx) => (
                <tr key={row._id || row.id || rIdx}>
                  {columns.map((col, cIdx) => (
                    <td key={cIdx}>
                      {col.render ? col.render(row) : row[col.accessor]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length || 1}>
                  <div className="data-table-empty">
                    <Inbox className="empty-icon" />
                    <div className="empty-title">{emptyTitle}</div>
                    <div className="empty-sub">{emptySubtitle}</div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
