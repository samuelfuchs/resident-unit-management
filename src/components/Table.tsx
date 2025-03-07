"use client";

import React from "react";

type NestedKeyOf<ObjectType extends object> = {
  [Key in keyof ObjectType & (string | number)]: ObjectType[Key] extends object
    ? `${Key}.${NestedKeyOf<ObjectType[Key]>}`
    : `${Key}`;
}[keyof ObjectType & (string | number)];

export interface Column<T extends object> {
  header: string;
  accessor: NestedKeyOf<T> | keyof T;
  render?: (value: any, row: T) => React.ReactNode;
}

interface TableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
  actions?: (row: T) => React.ReactNode;
}

const Table = <T extends object>({ data, columns, actions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto mt-8 sm:-mx-0 overflow-hidden">
      <table className="min-w-full divide-y divide-gray-300 bg-white dark:bg-gray-800 hidden sm:table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.header}
                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300"
              >
                {col.header}
              </th>
            ))}
            {actions && (
              <th className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-300">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col) => (
                <td
                  key={col.header}
                  className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400"
                >
                  {col.render
                    ? col.render(row[col.accessor as keyof T], row)
                    : (row[col.accessor as keyof T] as React.ReactNode)}
                </td>
              ))}
              {actions && (
                <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
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
            className="border rounded-lg p-4 shadow-md bg-white dark:bg-gray-800"
          >
            {columns.map((col) => (
              <div
                key={col.header}
                className="flex justify-between text-sm py-2"
              >
                <span className="font-semibold text-gray-600">
                  {col.header}:
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {col.render
                    ? col.render(row[col.accessor as keyof T], row)
                    : (row[col.accessor as keyof T] as React.ReactNode)}
                </span>
              </div>
            ))}
            {actions && (
              <div className="pt-2 border-t mt-2 text-right border-gray-200 dark:border-gray-700">
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
