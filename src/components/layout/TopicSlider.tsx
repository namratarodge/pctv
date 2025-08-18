"use client";

import Image from "next/image";
import { useEffect } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { usePublicData } from "../context/PublicDataContext";

import Link from "next/link";

type VoicesSliderProps = {
  title: string;
};

type Slide = {
  image: string;
  name: string;
  _id: string;
};

const slides = [
  { _id: "1", image: "/pctvtopic/Group 282.svg", name: "Digital-Construction" },
  {
    _id: "2",
    image: "/pctvtopic/Group 283.svg",
    name: "Integrated-Project-Controls",
  },
  {
    _id: "3",
    image: "/pctvtopic/Group 284.svg",
    name: "Cost-Engineering-and-Estimation",
  },
  {
    _id: "4",
    image: "/pctvtopic/Group 285.svg",
    name: "general-project-controls",
  },
  { _id: "5", image: "/pctvtopic/Group 286.svg", name: "Risk-Management" },
  {
    _id: "6",
    image: "/pctvtopic/Group 287.svg",
    name: "Planning-and-Scheduling",
  },
  {
    _id: "7",
    image: "/pctvtopic/Group 288.svg",
    name: "Information-Management",
  },
  { _id: "8", image: "/pctvtopic/Group 289.svg", name: "Contracts-and-Claims" },
];

export default function TopicSlider({ title }: VoicesSliderProps) {
  const { categories } = usePublicData();
  useEffect(() => {
    console.log("new");
    console.log(categories);
  }, [categories]);

  return (
    <div className="   text-white relative">
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
          1024: { slidesPerView: 8 },
        }}
        className="relative"
      >
        {slides.map((item: Slide) => {
          return (
            <SwiperSlide key={item._id}>
              <Link
                href={`browse?keyword=${item.name}`}
                className={`rounded-xl   shadow-lg flex flex-col  h-60 `}
              >
                <Image
                  width={100}
                  height={100}
                  alt="Masterclass Card"
                  src={item.image}
                  className="w-full h-auto rounded-sm transition-transform duration-300 ease-in-out group-hover:scale-110"
                />
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
