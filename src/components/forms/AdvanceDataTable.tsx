"use client";

import React from "react";

type Column<T> = {
  key: keyof T;
  label: string;
};

type DataTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  renderActions?: (row: T) => React.ReactNode;
};

export default function AdvanceDataTable<T extends { [key: string]: any }>({
  columns,
  data,
  renderActions,
}: DataTableProps<T>) {
  return (
    <div className="inline-block min-w-full py-2 align-middle">
      <table className="min-w-full divide-y divide-gray-200 bg-white">
        <thead >
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className="sticky top-0 z-10 py-4 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
              >
                {col.label}
              </th>
            ))}
            {renderActions && (
              <th scope="col" className=" py-3.5 pr-4 pl-3 text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((col) => (
                <td key={String(col.key)}  className="py-4 pr-3  text-sm font-medium whitespace-nowrap text-gray-700">
                  {row[col.key]}
                </td>
              ))}
              {renderActions && (
                <td className=" py-3 text-sm text-right text-gray-500">
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