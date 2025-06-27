"use client";

import React from "react";

type Column<T> = {
  key: keyof T;
  label: string;
  render?: (row: T) => React.ReactNode;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
};

export default function AdvanceDataTable<T extends Record<string, string>>({
  columns,
  data,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded shadow-md border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((col, index) => (
              <th
                key={String(col.key)}
                scope="col"
                className={`px-4 py-4 text-sm font-semibold text-gray-700  ${
                  index === 0 ? "text-left" : "text-left"
                }`}
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th
                scope="col"
                className="px-4 py-4 text-sm font-semibold text-gray-700 text-right"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="hover:bg-gray-50 transition-colors duration-200"
            >
              {columns.map((col, colIndex) => (
                <td
                  key={String(col.key)}
                  className={`px-4 py-4 text-sm text-gray-600 whitespace-nowrap ${
                    colIndex === 0 ? "text-left" : "text-left"
                  }`}
                >
                  {col.render
                    ? col.render(row)
                    : (row[col.key] as string | number)}
                </td>
              ))}
              {renderActions && (
                <td className="px-4 py-4 text-sm text-right text-gray-500">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
