"use client";
import { Slider, SliderNumber, TopicSlider } from "@/components/layout";
import { PlayCircleIcon } from "@heroicons/react/24/outline";
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
  { _id: "1", slug: "", image: "/topvoice/Group1.png", name: "Group1" },
  { _id: "2", slug: "", image: "/topvoice/Group2.png", name: "Group1" },
  { _id: "3", slug: "", image: "/topvoice/Group3.png", name: "Group1" },
  { _id: "4", slug: "", image: "/topvoice/Group4.png", name: "Group1" },
  { _id: "5", slug: "", image: "/topvoice/Group5.png", name: "Group1" },
  { _id: "6", slug: "", image: "/topvoice/Group6.png", name: "Group1" },
  { _id: "7", slug: "", image: "/topvoice/Group7.png", name: "Group1" },
  { _id: "8", slug: "", image: "/topvoice/Group8.png", name: "Group1" },
];
export default function Home() {
  const [title, setTitle] = useState([]);
  const [topTitle, setTopTitle] = useState([]);
  const [userVideo, setUserVideo] = useState([]);
  const [mainWatch, setMainwatch] = useState<SliderType | null>(null);
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
            image: process.env.NEXT_PUBLIC_WEBSITE + "/" + item.poster,
          })
        );
        setMainwatch(modifiedData[0]);
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
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto">
          <div className="mx-auto max-w-11/12  py-32 sm:py-48 lg:py-46 ">
            <div className="text-left">
              <h1 className="text-2xl  font-semibold tracking-tight text-balance text-white sm:text-5xl w-full sm:w-2/4 ">
                Delivering the UKs most complex projects and programmes
              </h1>
              <p className="mt-8 text-lg text-pretty text-white sm:text-md">
                Mathew Vickerstaff
              </p>
              <div className="mt-8 flex  justify-between  ">
                <div className="flex  gap-4">
                  <Link
                    href={`/titles/${mainWatch?.slug && mainWatch?._id}/${
                      mainWatch?.slug
                    }`}
                    target="_blank"
                    className=" flex rounded-full bg-red-500 pl-3 pr-1 gap-2 py-1 items-center text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer"
                  >
                    Watch Now
                    <PlayCircleIcon className="h-7 w-7 text-white" />
                  </Link>
                  <button className="w-25 rounded-full bg-gray-500 px-6 py-1 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer">
                    Share
                  </button>
                </div>
                {/* <button className="p-3 text-center items-center border-gray-300 rounded-full border  text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  <SpeakerXMarkIcon className="h-5 w-5 text-white" />
                </button> */}
              </div>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className=" mx-auto max-w-11/12">
        <SliderNumber title="PCTv Regions" />
        {userVideo.length > 0 && <Slider title="Continue Watching" slides={userVideo} /> }
        <Slider title="Latest Videos" slides={title} hover={true} />
        <Slider title="PCTv Top Voice" slides={slides} />
        <Slider title="PCTv Top 10 Sessions" slides={topTitle} hover={true} />
        <TopicSlider title="PCTv Topic" />
      </div>
    </>
  );
}
