// components/VoicesSlider.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const slides = [
  {
    title:
      "Desafios e Complexidades na Gestão de Obras de Grande Impacto Social",
    speakers: ["Marcelo Fialho", "Wallace Ferreira", "Rachel Starling"],
    category: "Zona de Megaprojetos",
    bgColor: "bg-gradient-to-br from-purple-800 to-purple-600",
  },
  {
    title: "Gestão Integrada de Portfólio e Estratégias em obras públicas",
    speakers: ["Bruno Teodoro", "Luiz Paulo Assis"],
    category: "Zona de controle de caso",
    bgColor: "bg-blue-900",
  },
  {
    title: "Replicação de Kaizen em Projetos de Capital",
    speakers: ["Ticiane Francis Miklosi Rodrigues Oliveira"],
    category: "Zona de Inovação",
    bgColor: "bg-indigo-900",
  },
  {
    title: "Programme Controls – making PC the heartbeat",
    speakers: ["Christopher Reynolds"],
    category: "Megaprojects Zone",
    bgColor: "bg-orange-400",
  },
  {
    title: "Current and Future State Educational Pathways",
    speakers: ["Patrick Tucker"],
    category: "Masterclass Zone",
    bgColor: "bg-purple-600",
  },
  {
    title: "Insights from government: Importance of controls",
    speakers: ["Emma Willson"],
    category: "Keynote",
    bgColor: "bg-gray-100 text-black",
  },
];

type VoicesSliderProps = {
  title: string;
};

export default function VoicesSlider({ title }: VoicesSliderProps) {
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
          1024: { slidesPerView: 5 },
        }}
        className="relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`relative rounded-sm gap-2 shadow-lg flex`}>
              <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-[120px] text-white/10 font-extrabold select-none pointer-events-none">
                1
              </div>
              <img
                src="https://picsum.photos/300/200/"
                className="w-full h-auto rounded-sm"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
