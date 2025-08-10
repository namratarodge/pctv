"use client";

import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

type Slide = {
  image: string;
  name: string;
  _id: string;
  slug: string;
};

type VoicesSliderProps = {
  title: string;
  slides: Slide[];
  hover?: boolean;
};

export default function VoicesSlider({
  title,
  slides,
  hover = false,
}: VoicesSliderProps) {
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
            <Link
              href={slide.slug && `/titles/${slide._id}/${slide.slug}`}
              className="relative h-50 flex items-center justify-center overflow-hidden group cursor-pointer transform transition-all duration-300 ease-in-out hover:scale-105 hover:z-10"
            >
              <Image
                width={100}
                height={100}
                alt="Masterclass Card"
                src={slide.image}
                className="w-full h-auto rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-110"
              />

              {/* Enhanced overlay with smooth animations */}
              {hover && (
                <div className="absolute inset-0 bg-black/70 backdrop-blur-sm px-4 py-6 h-70 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out transform translate-y-2 group-hover:translate-y-0 flex flex-col ">
                  <Image
                    width={100}
                    height={100}
                    alt="Masterclass Card"
                    src={slide.image}
                    className="w-full h-auto rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                  <div className="text-white text-xs font-medium text-center  mt-2  transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-in-out delay-100">
                    {slide.name}
                  </div>
                </div>
              )}

              {/* Subtle glow effect on hover */}
              {/* <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 rounded-sm"></div>
              </div> */}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
