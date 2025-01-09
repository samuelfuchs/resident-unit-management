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
    <div className="overflow-x-auto mt-8 sm:-mx-0">
      <table className="min-w-full divide-y divide-gray-300 hidden sm:table">
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

      <div className="sm:hidden space-y-4">
        {data.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="border rounded-lg p-4 shadow-md bg-white"
          >
            {columns.map((col) => (
              <div
                key={col.header}
                className="flex justify-between text-sm py-2"
              >
                <span className="font-semibold text-gray-600">
                  {col.header}:
                </span>
                <span className="text-gray-800">
                  {col.render
                    ? col.render(row[col.accessor], row)
                    : (row[col.accessor] as React.ReactNode)}
                </span>
              </div>
            ))}
            {actions && (
              <div className="pt-2 border-t mt-2 text-right">
                {actions(row)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Table;
