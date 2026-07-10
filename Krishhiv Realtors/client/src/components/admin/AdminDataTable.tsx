import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2 } from 'react-icons/fi';

export interface Column<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface AdminDataTableProps<T> {
  title: string;
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onAdd?: () => void;
  addLabel?: string;
  isLoading?: boolean;
}

export const AdminDataTable = <T extends Record<string, any>>({
  title,
  columns,
  data,
  onEdit,
  onDelete,
  onAdd,
  addLabel = 'Add New',
  isLoading = false,
}: AdminDataTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Very basic search filter over all object values
  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (val) =>
        val &&
        typeof val === 'string' &&
        val.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-surface rounded-xl border border-gray-100 shadow-card flex flex-col h-full">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-heading font-bold text-lg text-primary">{title}</h2>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-background border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>
          {onAdd && (
            <button
              onClick={onAdd}
              className="bg-primary text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
            >
              + {addLabel}
            </button>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-background/50">
            <tr className="border-b border-gray-100">
              {columns.map((col, i) => (
                <th key={i} className="text-left py-3 px-5 text-textMuted font-medium text-xs whitespace-nowrap">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="text-right py-3 px-5 text-textMuted font-medium text-xs w-20">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="py-8 text-center text-textMuted">
                  Loading...
                </td>
              </tr>
            ) : filteredData.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="py-8 text-center text-textMuted">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredData.map((row, i) => (
                <tr key={i} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {columns.map((col, j) => (
                    <td key={j} className="py-3 px-5 whitespace-nowrap">
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="py-3 px-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="p-1.5 text-gray-400 hover:text-secondary rounded-lg hover:bg-secondary/10 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={14} />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(row)}
                            className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={14} />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs text-textMuted mt-auto">
        <span>Showing {filteredData.length} entries</span>
      </div>
    </div>
  );
};
