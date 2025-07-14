'use client'

import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";

type RatingProps = {
  score?: number;
  onRate?: (value: number) => void;
};

export default function TenStarRating({ score = 0, onRate }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(score);


  useEffect(() => {
    setSelected(score);
  }, [score]);

  const handleClick = (value: number) => {
    setSelected(value);
    onRate?.(value); 
  };

  return (
    <div className="flex space-x-1">
      {[...Array(10)].map((_, index) => {
        const value = index + 1;
        const isFilled = hovered ? value <= hovered : value <= selected;

        const Icon = isFilled ? StarSolid : StarOutline;

        return (
          <Icon
            key={value}
            className="h-6 w-6 cursor-pointer transition-colors text-yellow-400 hover:scale-110"
            onMouseEnter={() => setHovered(value)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(value)}
          />
        );
      })}
    </div>
  );
}
