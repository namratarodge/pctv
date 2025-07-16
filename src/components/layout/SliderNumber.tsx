// components/VoicesSlider.js
"use client";

import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const slides = [
  { image: "regions/PCE-AUS.png", url: "https://projectcontrolexpo.com/aus" },
  {
    image: "regions/PCE-BRAZIL.png",
    url: "https://projectcontrolexpo.com/brazil",
  },
  { image: "regions/PCE-UAE.png", url: "https://projectcontrolexpo.com/dubai" },
  { image: "regions/PCE-UK.png", url: "https://projectcontrolexpo.com/uk" },
  { image: "regions/PCE-USA.png", url: "https://projectcontrolexpo.com/usa" },
  {
    image: "regions/PCE-VIRTUAL.png",
    url: "https://projectcontrolexpo.com/virtual",
  },
];
type VoicesSliderProps = {
  title: string;
};

export default function SliderNumber({ title }: VoicesSliderProps) {
  return (
    <div className=" py-2   text-white relative">
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
        {slides.map((slide, index) => (
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
