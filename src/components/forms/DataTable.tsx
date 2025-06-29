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

export default function DataTable<T extends { [key: string]: string }>({
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
              <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                Actions
              </th>
            )}
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td
                colSpan={columns.length + (renderActions ? 1 : 0)}
                className="py-4 text-center text-gray-500"
              >
                No data available
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((row, index) => (
              <tr
                key={index}
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
                  <td className="px-4 py-3 text-sm text-right text-gray-500">
                    {renderActions(row)}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
