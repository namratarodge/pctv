"use client";
import ShareButtonWithFallback from "@/components/account/ShareButtonWithFallback";
import { Slider, SliderNumber, TopicSlider } from "@/components/layout";
import { PlayCircleIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

type SliderType = {
  title: string;
  name: string;
  poster: string;
  _id: string;
  slug: string;
};

type VideoWatch = {
  name: string;
  poster: string;
  time_watched: string;
  percent: string;
  _id: string;
  slug: string;
};

const slides = [
  { _id: "1", slug: "", image: "/topvoice/Ashley_Turner.png", name: "Group1" },
  { _id: "2", slug: "", image: "/topvoice/Atif_Ansar.png", name: "Group1" },
  { _id: "3", slug: "", image: "/topvoice/Dr_Alexia_Nalewaik.png", name: "Group1" },
  { _id: "4", slug: "", image: "/topvoice/Eddie_Obeng.png", name: "Group1" },
  { _id: "5", slug: "", image: "/topvoice/Greg_Lawton.png", name: "Group1" },
  { _id: "6", slug: "", image: "/topvoice/Lisa_Silander.png", name: "Group1" },
];


export default function Home() {
  const [title, setTitle] = useState([]);
  const [topTitle, setTopTitle] = useState([]);
  const [userVideo, setUserVideo] = useState([]);
  const [mainWatch, setMainwatch] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTitlte = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 10,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map(
          (item: SliderType) => ({
            name: item.name,
            _id: item._id,
            slug: item.slug,
            image:
              item.poster &&
              process.env.NEXT_PUBLIC_WEBSITE + "/" + item.poster,
          })
        );
        setMainwatch(
          "./titles/6856a3433e2804ea5de686dc/delivering-the-uks-most-complex-projects-and-programmes"
        );
        setLoading(false);
        setTitle(modifiedData);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchLatest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles/most-views`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 10,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.map((item: SliderType) => ({
          name: item.name,
          _id: item._id,
          slug: item.slug,
          image: process.env.NEXT_PUBLIC_WEBSITE + "/" + item.poster,
        }));
        setLoading(false);
        setTopTitle(modifiedData);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const fetchVideoPlayer = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/video-play/user`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            limit: 10,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.map((item: VideoWatch) => ({
          name: item.name,
          _id: item._id,
          time_watched: item.time_watched,
          percent: item.percent,
          slug: item.slug,

          image: process.env.NEXT_PUBLIC_WEBSITE + "/" + item.poster,
        }));
        console.log(modifiedData);
        setUserVideo(modifiedData);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchTitlte();
    fetchLatest();
    fetchVideoPlayer();
  }, []);

  return (
    <>
      <div className="relative isolate overflow-hidden pt-14 h-[55vh] sm:h-[80vh] ">
        <Image
          alt=""
          src="/Home-page.png"
          fill
          className="absolute inset-0 -z-10 object-cover"
          priority // optional, if it's above-the-fold
        />

        <div className="mx-auto">
          <div className="mx-auto max-w-11/12  py-32 sm:py-48 md:py-36 lg:py-40 ">
            <div className="text-left">
              <h1
                className="
    text-xl  font-semibold tracking-tight leading-tight text-white text-balance w-full
    sm:text-2xl sm:leading-snug sm:w-4/5
    md:text-3xl md:leading-snug md:w-3/4
    lg:text-4xl lg:leading-tight lg:w-2/3
    xl:text-5xl xl:leading-tight xl:w-1/2
  "
              >
                Delivering the UK’s most complex projects and programmes
              </h1>
              <p className="mt-8 text-lg text-pretty text-white sm:text-md">
                Mathew Vickerstaff
              </p>
              <div className="mt-8 flex  justify-between  ">
                <div className="flex  gap-4">
                  <Link
                    href={`titles/6856a3433e2804ea5de686dc/delivering-the-uks-most-complex-projects-and-programmes`}
                    target="_blank"
                    className=" flex rounded-full bg-red-500 px-6 pr-3 gap-2 py-1 items-center text-md  text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer"
                  >
                    Watch Now
                    <PlayCircleIcon className="h-8 w-8 text-white" />
                  </Link>

                  <ShareButtonWithFallback />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" mx-auto max-w-11/12 flex flex-col gap-8">
        <SliderNumber title="PCTv Regions" />
        {userVideo.length > 0 && (
          <Slider title="Continue Watching" slides={userVideo} />
        )}
        <Slider title="Latest Videos" slides={title} hover={true} />
        <Slider title="PCTv Top Voices" slides={slides} />
        <Slider title="PCTv Top 10 Sessions" slides={topTitle} hover={true} />
        <TopicSlider title="PCTv Topic" />
      </div>
    </>
  );
}
