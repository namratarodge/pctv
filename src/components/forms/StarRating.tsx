"use client";

import { StarIcon as StarOutline } from "@heroicons/react/24/outline";
import { StarIcon as StarSolid } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";

type RatingProps = {
  score?: number;
  titleId: string;
};

export default function StarRating({ score = 0, titleId }: RatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(score);

  useEffect(() => {
    setSelected(score);
  }, [score]);

  const handleClick = async (value: number) => {
    setSelected(value);
    const token = localStorage.getItem("token");
    const payload = {
      reviewable_id: titleId,
      score: value,
    };
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/titleReview/${titleId}`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      window.location.href = "/login";
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, index) => {
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
