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
  time_watched?: string;
  percent?: string | number;
};

type VoicesSliderProps = {
  title: string;
  slides: Slide[];
  hover?: boolean;
};

function Card({ slide, percentNum, hover }: any) {
  return (
    <div
      className={[
        "relative w-full",
        "rounded-xl overflow-hidden",
        "shadow-[0_6px_24px_-8px_rgba(0,0,0,0.45)]",
        "ring-1 ring-white/10",
        "transition-transform duration-300 ease-out",
        hover ? "group-hover:scale-[1.02]" : "",
        "aspect-[16/9]",
        "bg-neutral-800",
      ].join(" ")}
    >
      {/* IMAGE */}
      <Image
        src={slide.image || "/default-image.jpg"}
        alt={slide.name}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-110"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = "/default-image.jpg";
        }}
      />

      {/* TITLE GRADIENT */}
      {/* <div className="absolute inset-x-0 bottom-0">
        <div className="h-full bg-gradient-to-t to-transparent" />
        <div className="px-2 pb-2">
          <div className="text-[13px] font-semibold leading-tight line-clamp-2">
            {slide.name}
          </div>
        </div>
      </div> */}

      {/* PROGRESS BAR */}
      {percentNum > 0 && (
        <div className="absolute left-0 right-0 bottom-0 h-1.5 bg-white/10">
          <div
            className="h-full bg-red-500"
            style={{ width: `${Math.min(100, percentNum)}%` }}
          />
        </div>
      )}

      {/* HOVER OVERLAY ONLY IF CLICKABLE */}
      {hover && (
        <div
          className={[
            "absolute inset-0 bg-black/0 group-hover:bg-black/35",
            "transition-all duration-300 flex items-center justify-center",
          ].join(" ")}
        >
          {/* Play button */}
          <div
            className={[
              "opacity-0 group-hover:opacity-100",
              "transition-opacity duration-300 relative",
            ].join(" ")}
          >
            <span className="absolute inset-0 rounded-full animate-ping bg-white/30" />
            <div className="relative z-10 w-12 h-12 bg-white text-black rounded-full grid place-items-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                className="w-6 h-6 translate-x-[1px]"
              >
                <path d="M8 5.14v13.72L19 12 8 5.14z" />
              </svg>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VoicesSlider({
  title,
  slides,
  hover = true, // default to nicer hover
}: VoicesSliderProps) {
  return (
    <div className="text-white relative">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">{title}</h2>
        {/* Swiper progressbar target */}
        <div className="swiper-progressbar h-1 w-32 bg-white/10 rounded overflow-hidden" />
      </div>

      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={12}
        slidesPerView={2.2}
        navigation
        pagination={{ el: ".swiper-progressbar", type: "progressbar" }}
        grabCursor
        breakpoints={{
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
          1280: { slidesPerView: 6 },
        }}
        className="relative mt-3"
      >
        {slides.map((slide) => {
          const isClickable = Boolean(slide.slug);
          const href = isClickable
            ? `/titles/${slide._id}/${slide.slug}`
            : undefined;

          const percentNum =
            typeof slide.percent === "string"
              ? parseFloat(slide.percent)
              : slide.percent ?? 0;

          return (
            <SwiperSlide key={slide._id}>
              {/* CLICKABLE ONLY IF SLUG EXISTS */}
              <div
                className={`
          group block relative
          ${
            isClickable
              ? "cursor-pointer"
              : "cursor-not-allowed pointer-events-none"
          }
        `}
              >
                {/* Wrap only if clickable */}
                {isClickable ? (
                  <Link href={href ?? '#'} className="block">
                    {/* CARD */}
                    <Card slide={slide} percentNum={percentNum} hover={true} />
                  </Link>
                ) : (
                  <Card slide={slide} percentNum={percentNum} hover={false} />
                )}
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
