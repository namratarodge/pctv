"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

const focusVisibleLinkClasses =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900";

function Card({ slide, percentNum, hover }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >

      
      <div
        className={[
          "relative w-full",
          "rounded-sm overflow-hidden",
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
          <div className="absolute left-0 right-0 bottom-0 h-0.5 bg-white/10">
            <div
              className="h-full bg-red-500"
              style={{ width: `${Math.min(100, percentNum)}%` }}
            />
          </div>
        )}

        {/* HOVER OVERLAY ONLY IF CLICKABLE */}

       
      </div>
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
        <h2 className="text-xl">{title}</h2>
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
        className="relative mt-3 "
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
                <Link
                  href={href ?? "#"}
                  className={`block ${focusVisibleLinkClasses}`}
                >
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
      <style jsx global>{`
        .custom-swiper-nav .swiper-button-next,
        .custom-swiper-nav .swiper-button-prev {
          background-color: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(8px);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .custom-swiper-nav .swiper-button-next:hover,
        .custom-swiper-nav .swiper-button-prev:hover {
          background-color: rgba(255, 255, 255, 0.25);
          transform: scale(1.1);
        }

        .custom-swiper-nav .swiper-button-next::after,
        .custom-swiper-nav .swiper-button-prev::after {
          font-size: 18px;
          font-weight: bold;
          color: white;
        }

        .custom-swiper-nav .swiper-button-disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
