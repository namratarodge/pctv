// components/VoicesSlider.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { usePublicData } from "../context/PublicDataContext";
import { useEffect } from "react";

import {
  FaceSmileIcon,
} from '@heroicons/react/24/outline';
import { TagType } from "@/constants/Type";



type VoicesSliderProps = {
  title: string;
  speakers?: boolean;
  progress?: boolean;
};

export default function TopicSlider({ title }: VoicesSliderProps) {
  const { categories } = usePublicData();
  useEffect(() => {
    console.log('new')
    console.log(categories);
  }, [categories]);

  return (
    <div className=" py-8  text-white relative">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={2.2}
        navigation
        pagination={{
          el: ".swiper-progressbar",
          type: "progressbar",
        }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 7 },
        }}
        className="relative"
      >
        {categories.map((item : TagType, index : number) => {
          return (
          <SwiperSlide key={index}>
            <div
              className={`rounded-xl p-3 gap-2 shadow-lg flex flex-col bg-gray-900 h-40 `}
            >
              <div className="bg-gray-800 p-4 rounded-xl items-center text-center">
                <FaceSmileIcon className="h-20 w-20 text-white mx-auto" />
              </div>
              <h2 className="text-center text-sm">{item.display_name}</h2>
            </div>
          </SwiperSlide> );
        })}
      </Swiper>

      {/* Small line at top-right */}
      {/* <div className=" border-red-800 swiper-progressbar absolute top-2 right-4 w-28 h-1 bg-red-500 rounded overflow-hidden">
        <div className="swiper-pagination-progressbar-fill bg-red-500 h-full transition-all duration-300"></div>
      </div> */}
    </div>
  );
}
