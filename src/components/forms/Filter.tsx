"use client";

import {
  AdjustmentsHorizontalIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

export default function Filter({ filterType }: { filterType: any[] }) {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [filterValues, setFilterValues] = useState({});

  const toggleFilter = () => setShowFilter((prev) => !prev);

  const handleInputChange = (name, inputValue) => {
    setFilterValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value1: inputValue, // Append inputValue to existing value
      },
    }));
  };

  const handleSelectChange = (name, value) => {
    console.log("filterSelect");
    setFilterValues((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value, // directly set the new value
      },
    }));
  };

  const queryString = Object.entries(filterValues)
    .map(([key, val]) => {
      if (val.value1 !== undefined) {
        // value + value1 (e.g., created_at=<2025-06-17)
        return `${key}${val.value}${val.value1}`;
      } else {
        // only value (e.g., knownFor=art)
        return `${key}=${String(val.value).toLowerCase()}`;
      }
    })
    .join("&");

  const handleFilterSelect = (filterName: string) => {
    const existing = selectedFilter.find((f) => f.name === filterName);
    console.log(existing);
    if (existing) {
      setSelectedFilter(selectedFilter.filter((f) => f.name !== filterName));
      setFilterValues((prev) => {
        const newValues = { ...prev };
        delete newValues[existing.key];
        return newValues;
      });
    } else {
      const filterObj = filterType.find((f) => f.name === filterName);
      handleSelectChange(filterObj.key, filterObj.option[0].value);
      if (filterObj) {
        setSelectedFilter([...selectedFilter, filterObj]);
      }
    }
  };

  // Clear all selected filters
  const clearFilter = () => {
    setShowFilter(false);
    setSelectedFilter([]);
    setFilterValues({});
  };

  return (
    <div className="sm:flex-auto">
      <div className="relative w-full flex border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-300">
        <div className="border-l-1 border-gray-300 px-4 inset-y-0 left-0  flex items-center pointer-events-none">
          <MagnifyingGlassIcon
            className="h-5 w-5 text-gray-500"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
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
          } flex items-center justify-center  px-3 w-30  gap-2 item cursor-pointer`}
          onClick={toggleFilter}
        >
          <AdjustmentsHorizontalIcon className="h-6 w-6  " />
          Filter
        </button>
        {showFilter && (
          <div className="absolute flex right-0 flex-col w-50 top-13  shadow-md rounded-md bg-white z-20">
            {filterType.map((item,index) => (
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
            <div
              onClick={() => clearFilter()}
              className="px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
            >
              Clear All
            </div>
          </div>
        )}
      </div>
      <div className="">
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
                {filter.option && (
                  <select
                    className=" w-20"
                    onChange={(e) =>
                      handleSelectChange(filter.key, e.target.value)
                    }
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
                      handleInputChange(filter.key, e.target.value)
                    }
                    placeholder={filter.field.placeholder}
                    className="px-4 py-2 w-full cursor-pointer hover:bg-gray-200"
                  />
                )}
              </div>
            ))}
          </div>
        )}
        <pre>{JSON.stringify({ queryString }, null, 2)}</pre>
      </div>
    </div>
  );
}
