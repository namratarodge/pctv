'use client';

import { useState } from 'react';

interface SectorMultiSelectProps {
  data: string[];
  title: string;
  onChange: (newData: string[]) => void;
}

export default function SectorMultiSelect({ data, title, onChange }: SectorMultiSelectProps) {
  const [inputValue, setInputValue] = useState('');

  const addSector = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (!data.includes(trimmed)) {
      const newData = [...data, trimmed];
      onChange(newData);
    }
    setInputValue('');
  };

  const removeSector = (sector: string) => {
    const newData = data.filter((item) => item !== sector);
    onChange(newData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSector(inputValue);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-2 bg-white shadow rounded-xl">
      <h2 className="text-md font-semibold mb-3">{title}</h2>

      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
        className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {data.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {data.map((sector) => (
            <span
              key={sector}
              className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {sector}
              <button
                onClick={() => removeSector(sector)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                &times;
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}