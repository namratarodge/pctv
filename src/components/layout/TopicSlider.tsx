// components/VoicesSlider.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

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
  speakers?: boolean;
  progress?: boolean;
};

export default function TopicSlider({
  title,
}: VoicesSliderProps) {
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
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`rounded-xl p-3 gap-2 shadow-lg flex flex-col bg-gray-700 h-40 `}>
              <div className="bg-gray-500 p-4 rounded-xl items-center text-center">
                <FaceSmileIcon  className="h-20 w-20 text-white mx-auto" />
              </div>
              <h2 className="text-center">{slide.category}</h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Small line at top-right */}
      {/* <div className=" border-red-800 swiper-progressbar absolute top-2 right-4 w-28 h-1 bg-red-500 rounded overflow-hidden">
        <div className="swiper-pagination-progressbar-fill bg-red-500 h-full transition-all duration-300"></div>
      </div> */}
    </div>
  );
}
