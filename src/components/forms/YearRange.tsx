"use client";

import { useEffect, useMemo, useState } from "react";
import { Range } from "react-range";

const MIN = 2010;
const MAX = 2025;
const CLOSE_GAP = 1; // treat 1-year apart as "overlap risk"

type YearRangeProps = {
  values: [number, number];
  onChange?: (values: [number, number]) => void;
};

export default function YearRange({
  values: parentValues,
  onChange,
}: YearRangeProps) {
  const [values, setValues] = useState<number[]>(parentValues);

  useEffect(() => setValues(parentValues), [parentValues]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    if (newValues.length === 2) onChange?.([newValues[0], newValues[1]]);
  };

  const pct = (v: number) => ((v - MIN) / (MAX - MIN)) * 100;

  const { isClose, leftPct, widthPct, midPct } = useMemo(() => {
    const isClose = values[1] - values[0] <= CLOSE_GAP;
    const leftPct = pct(values[0]);
    const rightPct = pct(values[1]);
    return {
      isClose,
      leftPct,
      widthPct: rightPct - leftPct,
      midPct: (leftPct + rightPct) / 2,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[0], values[1]]);

  return (
    <div className="mt-2 py-8">
      <Range
        values={values}
        step={1}
        min={MIN}
        max={MAX}
        onChange={handleChange}
        renderTrack={({ props, children }) => (
          <div {...props} className="relative h-2 rounded-full bg-gray-200">
            {/* active selection */}
            <div
              className="absolute h-2 bg-red-500 rounded-full"
              style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
            />

            {/* merged label when years are close */}
            {isClose && (
              <div
                className="absolute -top-10 pointer-events-none"
                style={{ left: `${midPct}%`, transform: "translateX(-50%)" }}
              >
                <div className="relative inline-flex items-center gap-1 rounded-full bg-gray-900/95 px-2.5 py-1 text-xs font-semibold text-white shadow">
                  <span>
                    {values[0]}–{values[1]}
                  </span>
                  {/* caret */}
                  <span className="absolute left-1/2 top-full block h-0 w-0 -translate-x-1/2 border-x-8 border-x-transparent border-t-8 border-t-gray-900/95" />
                </div>
              </div>
            )}

            {children}
          </div>
        )}
        renderThumb={({ props, index }) => {
          const { key, ...rest } = props;

          // small horizontal nudge at the extremes so labels don't clip the edges
          const nudge =
            values[index] === MIN
              ? "translateX(10%)"
              : values[index] === MAX
              ? "translateX(-10%)"
              : "translateX(-50%)";

          return (
            <div
              key={key}
              {...rest}
              className="relative h-4 w-4 rounded-full border-2 border-white bg-red-500 shadow focus:outline-none"
            >
              {/* individual labels (hidden when close) */}
              {!isClose && (
                <div
                  className="pointer-events-none absolute -top-10 left-1/2"
                  style={{ transform: nudge }}
                >
                  <div
                    className={`relative inline-flex items-center rounded-full bg-gray-900/95 px-2 py-0.5 text-xs font-semibold text-white shadow ${
                      index ? "-ml-5" : "-ml-5"
                    } `}
                  >
                    {values[index]}
                    {/* caret */}
                    <span
                      className={`absolute left-1/2 top-full block h-0 w-0 -translate-x-1/2 border-x-6 border-x-transparent border-t-6 border-t-gray-900/95 `}
                    />
                  </div>
                </div>
              )}
            </div>
          );
        }}
      />
    </div>
  );
}
