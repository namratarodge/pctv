"use client";

import Image from "next/image";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Slide = {
  image: string;
  name: string;
};

type VoicesSliderProps = {
  title: string;
  slides: Slide[];
};

export default function VoicesSlider({ title, slides }: VoicesSliderProps) {
  return (
    <div className=" text-white relative ">
      <h2 className="text-xl font-bold">{title}</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={2.2}
        navigation
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-40 flex items-center justify-center  overflow-hidden ">
              <Image
                width={100}
                height={100}
                alt="Masterclass Card"
                src={slide.image}
                className="w-full h-auto rounded-sm"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
