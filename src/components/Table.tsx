"use client";

import React from "react";

export interface Column<T> {
  header: string;
  accessor: keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
}

const Table = <T,>({ data, columns, actions }: TableProps<T>) => {
  return (
    <div className="-mx-4 mt-8 sm:-mx-0">
      <table className="min-w-full divide-y divide-gray-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                Ação
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td
                  key={col.header}
                  className="px-3 py-4 text-sm text-gray-500"
                >
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : (row[col.accessor] as React.ReactNode)}
                </td>
              ))}
              {actions && (
                <td className="px-3 py-4 text-sm text-gray-500">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
