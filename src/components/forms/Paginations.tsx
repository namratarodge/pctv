// src/components/Pagination.tsx

"use client"; // if using App Router

import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useCallback } from "react";


interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface PaginationProps {
  pagination: PaginationData;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}
export default function Paginations({
  pagination,
  onPageChange,
  onLimitChange,
}: PaginationProps) {
  const {  page, limit, totalPages } = pagination;

  const handlePrev = useCallback(() => {
    if (page > 1) onPageChange(page - 1);
  }, [page, onPageChange]);

  const handleNext = useCallback(() => {
    console.log(page);
    if (page < totalPages) onPageChange(page + 1);
  }, [page, totalPages, onPageChange]);

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap py-4  rounded-lg bg-white ">
      {/* Items per page */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Items per page:</span>
        <select
          value={limit}
          onChange={(e) => {
            onLimitChange(Number(e.target.value));
            onPageChange(1); // reset to first page on limit change
          }}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {[10, 20, 50, 100].map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={handlePrev}
          disabled={page === 1}
          className="cursor-pointer flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeftIcon className="h-4 w-4" />
          Prev
        </button>

        <span className="text-sm text-gray-700">
          Page <span className="font-medium">{page}</span> of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={page === totalPages}
          className="cursor-pointer flex items-center gap-1 px-3 py-1.5 border border-gray-300 rounded-md text-sm text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
          <ChevronRightIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
