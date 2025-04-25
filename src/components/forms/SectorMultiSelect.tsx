'use client';

import { useState } from 'react';

export default function SectorMultiSelect({title}: { title: string }) {
  const [sectors, setSectors] = useState<string[]>([
    'Technology',
    'Healthcare',
    'Finance',
    'Retail',
    'Energy',
    'Manufacturing',
    'Education',
  ]);

  const [selectedSectors, setSelectedSectors] = useState<string[]>(sectors);
  const [inputValue, setInputValue] = useState('');

  const addSector = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return;

    // Add to sectors list if it's new
    // if (!sectors.includes(trimmed)) {
    //   setSectors((prev) => [...prev, trimmed]);
    // }

    // Add to selected
    if (!selectedSectors.includes(trimmed)) {
      setSelectedSectors((prev) => [...prev, trimmed]);
    }

    setInputValue('');
  };

  const removeTag = (sector: string) => {
    setSelectedSectors((prev) => prev.filter((s) => s !== sector));
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

      {/* Input box */}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type and press Enter..."
        className="w-full mb-3 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Suggestion buttons */}
      {/* <div className="flex flex-wrap gap-2 mb-4">
        {sectors.map((sector) => (
          <button
            key={sector}
            onClick={() => addSector(sector)}
            className={`px-3 py-1 rounded-full text-sm border transition ${
              selectedSectors.includes(sector)
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
            }`}
          >
            {sector}
          </button>
        ))}
      </div> */}

      {/* Selected tags */}
      {selectedSectors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedSectors.map((sector) => (
            <span
              key={sector}
              className="flex items-center bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
            >
              {sector}
              <button
                onClick={() => removeTag(sector)}
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