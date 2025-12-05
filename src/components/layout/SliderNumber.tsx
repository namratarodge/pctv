"use client";

import { slidesCountry } from "@/constants/Menu";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type VoicesSliderProps = {
  title: string;
};

export default function SliderNumber({ title }: VoicesSliderProps) {
  return (
    <div className="   text-white relative">
      <h2 className="text-xl font-bold">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2.2}
        pagination={{
          el: ".swiper-progressbar",
          type: "progressbar",
        }}
        breakpoints={{
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 6 },
        }}
        className="relative"
      >
        {slidesCountry.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-40 flex items-center justify-center  overflow-hidden ">
              <Link href={slide.url} target="_blank">
                <img
                  src={slide.image}
                  width={100}
                  height={100}
                  alt="Masterclass Card"
                  className="w-full rounded-md shadow-2xl "
                />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
