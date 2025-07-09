"use client";

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

import { FilterItem, FilterValues } from "@/constants/Type";

export default function Filter({
  filterType,
  onQueryChange,
}: {
  filterType: FilterItem[];
  onQueryChange: (query: string) => void;
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<FilterItem[]>([]);
  const [filterValues, setFilterValues] = useState<FilterValues>({});

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const handleInputSearch = (value: string) => {
    const name = filterType[0].search as string;
    setFilterValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value, // directly set the new value
      },
    }));
  };
  const handleInputChange = (name: string, inputValue: string) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value1: inputValue, // Append inputValue to existing value
      },
    }));
  };

  const handleSelectChange = (filter: FilterItem, value: string) => {
    const currentDate = new Date().toISOString().split("T")[0];
    setFilterValues((prev) => ({
      ...prev,
      [filter.key as string]: {
        ...prev[filter.key as string],
        value,
        ...(filter.field?.type === "date" ? { value1: currentDate } : {}),
      },
    }));
  };

  // const queryString = Object.entries(filterValues)
  //   .map(([key, val]) => {
  //     if (val.value1 !== undefined) {
  //       // value + value1 (e.g., created_at=<2025-06-17)
  //       return `${key}=${val.value}${val.value1}`;
  //     } else {
  //       // only value (e.g., knownFor=art)
  //       return `${key}=${String(val.value)}`;
  //     }
  //   })
  //   .join("&");

  const queryString = Object.entries(filterValues)
    .map(([key, val]) => {
      if (val.value1 !== undefined) {
        return `${key}=${val.value}${val.value1}`;
      } else {
        return `${key}=${String(val.value)}`;
      }
    })
    .join("&");

  const handleFilterSelect = (filterName: string) => {
    const existing = selectedFilter.find(
      (f): f is FilterItem => f.name === filterName
    );
    if (existing) {
      const key = existing.key as string;
      setSelectedFilter(selectedFilter.filter((f) => f.name !== filterName));
      setFilterValues((prev) => {
        const newValues = { ...prev };
        delete newValues[key];
        return newValues;
      });
    } else {
      const filterObj = filterType.find((f) => f.name === filterName);
      if (!filterObj) return;
      const value = filterObj.option?.[0]?.value ?? "";
      handleSelectChange(filterObj, value);
      setSelectedFilter([...selectedFilter, filterObj]);
    }
  };

  // Clear all selected filters
  const clearFilter = () => {
    setShowFilter(false);
    setSelectedFilter([]);
    setFilterValues({});
  };

  useEffect(() => {
    onQueryChange(queryString);
  }, [queryString, onQueryChange]);

  return (
    <div className="sm:flex-auto  sm:w-1/5">
      <div className="relative flex justify-between border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300">
        <div className="border-l-1 border-gray-300 px-4 inset-y-0 left-0  flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          onChange={(e) => handleInputSearch(e.target.value)}
          placeholder="Type of search..."
          className="block w-5/6 pr-4 py-3 focus:outline-none sm:text-md"
        />
        {selectedFilter.length > 0 && (
          <button onClick={clearFilter}>
            <XMarkIcon
              className="h-5 w-5 text-gray-500 cursor-pointer"
              aria-hidden="true"
            />
          </button>
        )}
        <button
          className={` ${
            showFilter ? "text-red-400" : "text-gray-700"
          }  flex items-center justify-center  px-3 w-30  gap-2 item cursor-pointer`}
          onClick={toggleFilter}
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6  " />
          Filter
        </button>
        {showFilter && (
          <div className="absolute flex right-0 flex-col w-50 top-13  shadow-md rounded-md bg-white z-20">
            {filterType.map((item, index) => (
              <div
                key={index}
                className={`${
                  selectedFilter.some((f) => f.name === item.name)
                    ? "text-red-400"
                    : "bg-white"
                } px-4 py-2 w-full cursor-pointer hover:bg-gray-200 `}
                onClick={() => handleFilterSelect(item.name)}
              >
                {item.name}
              </div>
            ))}
            {selectedFilter.length > 0 && (
              <div
                onClick={() => clearFilter()}
                className="px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
              >
                Clear All
              </div>
            )}
          </div>
        )}
      </div>
      {/* <small>{queryString}</small> */}
      <div>
        {selectedFilter.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {selectedFilter.map((filter) => (
              <div
                key={filter.name}
                className="relative border rounded-md border-gray-100 gap-3 flex"
              >
                {/* Filter tag */}
                <span className="bg-red-100 text-red-600 px-3 py-2 text-sm font-medium cursor-pointer">
                  {filter.name}
                </span>

                {/* Filter dropdown options if any */}
                {filter?.option && (
                  <select
                    className=" w-20"
                    onChange={(e) => handleSelectChange(filter, e.target.value)}
                  >
                    {filter.option.map((option) => (
                      <option
                        value={option.value}
                        key={option.name}
                        className="px-4  w-full cursor-pointer hover:bg-gray-200"
                      >
                        {option.name}
                      </option>
                    ))}
                  </select>
                )}
                {filter?.field && (
                  <input
                    type={filter.field.type}
                    onChange={(e) =>
                      handleInputChange(filter.key as string, e.target.value)
                    }
                    placeholder={filter.field.placeholder}
                    className="px-4 py-2 w-40 text-md cursor-pointer hover:bg-gray-200"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        {/* <pre>{JSON.stringify(filterValues, null, 2)}</pre> */}
      </div>
    </div>
  );
}
