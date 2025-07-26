'use client'

import { useEffect, useState } from "react";
import { Range } from "react-range";

const MIN = 2010;
const MAX = 2025;

type YearRangeProps = {
  values: [number, number];
  onChange?: (values: [number, number]) => void;
};

export default function YearRange({ values: parentValues, onChange }: YearRangeProps) {
  const [values, setValues] = useState<number[]>(parentValues);

  // Sync local state with parent values
  useEffect(() => {
    setValues(parentValues);
  }, [parentValues]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    if (newValues.length === 2) {
      onChange?.([newValues[0], newValues[1]]);
    }
  };

  return (
    <div className="mt-2 py-8">
      <Range
        values={values}
        step={1}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="h-2 rounded-full bg-gray-300 relative">
            <div
              className="absolute h-2 bg-red-500 rounded-full"
              style={{
                left: `${((values[0] - MIN) / (MAX - MIN)) * 100}%`,
                width: `${((values[1] - values[0]) / (MAX - MIN)) * 100}%`,
              }}
            />
            {children}
          </div>
        )}
        renderThumb={({ props, index }) => {
          const { key, ...rest } = props;
          return (
            <div
              key={key}
              {...rest}
              className="relative w-3 h-3 bg-red-400 rounded-full shadow-lg border-2 border-white focus:outline-none"
            >
              <div className={`absolute -top-8 text-sm text-white font-medium   ${index === 1 ? '-ml-4' : '-ml-2' }`}>
                {values[index]} 
              </div>
            </div>
          );
        }}
      />
    </div>
  );
}