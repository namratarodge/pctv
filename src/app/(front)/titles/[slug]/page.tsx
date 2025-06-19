"use client";

import { Footer, Slider, SliderNumber, TopicSlider } from "@/components/layout";
import Loading from "@/components/layout/Loading";
import {
  PlusIcon,
  ShareIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { StringValidation } from "zod";
import Link from "next/link";

const people = [
  {
    title: "Global Transforms of Projects Control within Worlds",
    name: "Andy Browns",
    position: "Project Controls Director",
  },
  {
    title: "Optimizing Risk in Large Infrastructure Programs",
    name: "Samantha Lee",
    position: "Senior Risk Analyst",
  },
  {
    title: "AI in Cost Engineering: Future or Fad?",
    name: "Michael Chen",
    position: "Lead Cost Engineer",
  },
  {
    title: "The New Metrics of Success in Capital Projects",
    name: "Laura Gutierrez",
    position: "Performance Management Advisor",
  },
  {
    title: "Digitizing Project Forecasting in Real Time",
    name: "Robert Knight",
    position: "PMO Lead",
  },
  {
    title: "Post-Pandemic Challenges in Transit Development",
    name: "Fatima Al-Sayeed",
    position: "Transportation Strategy Consultant",
  },
  {
    title: "Sustainable Controls for Green Construction",
    name: "Daniel Johnson",
    position: "Sustainability & Cost Manager",
  },
  {
    title: "Data-Driven Decisions in Project Controls",
    name: "Emily Nakamura",
    position: "Project Controls Analyst",
  },
  {
    title: "Transforming Owner Organizations for Agility",
    name: "Thomas Müller",
    position: "Capital Projects Consultant",
  },
  {
    title: "Bridging Technology and Human Insight",
    name: "Priya Mehta",
    position: "Innovation Lead, Infrastructure",
  },
];

interface PageProps {
  params: {
    slug: string;
  };
}

export default function TitleDetailPage({ params }: PageProps) {
  const { slug } = params;
  const [title, setTitle] = useState([]);
  const [titleDetails, setTitleDetails] = useState([]);
  const [loading, setLoading] = useState(true);

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
            limit: 20,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setLoading(false);
        setTitle(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const fetchTitleDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            slug: decodeURIComponent(slug),
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data[0];
        console.log('fetch details')
        console.log(modifiedData)
        setLoading(false);
        setTitleDetails(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  useEffect(() => {
    console.log(slug, "slug");
    fetchTitleDetails();
    fetchTitlte();
  }, []);

  return (
    <div className="pt-18  flex max-w-11/12 mx-auto">
      {loading ? (
        <div className="mx-auto">
          <Loading title="" />
        </div>
      ) : (
        <>
          <div className="w-2/3 ">
            <img
             src={"https://projectcontrolstv.com/" + titleDetails.poster}
              className="w-full  rounded-lg"
            />
            <h1 className="text-xl text-white py-4">
             {titleDetails.name}
            </h1>
            <div className="flex gap-2">
              <button className="flex rounded-full bg-[#707070]  px-2 gap-1 py-1 items-center text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer">
                <PlusIcon className="h-4 w-4 text-white" />
                Whatchlist
              </button>
              <button className="flex rounded-full bg-[#707070] px-2 gap-1 py-1 items-center text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer">
                <ShareIcon className="h-4 w-4 text-white" />
                Share
              </button>
            </div>
            <div className="flex justify-between py-2 border-t mt-4 border-b border-[#37454D]  mr-5">
              <p className="text-gray-400 text-sm">{titleDetails.created_at}</p>
              <div className="flex gap-2">
                <span className="text-gray-400">Rate us</span>
                <div className="flex gap-1 items-center">
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                  <StarIcon className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="py-4">
              <p className="text-gray-400">
               {titleDetails.description}
              </p>
            </div>

            <div className="border-t border-b border-[#37454D] py-3 mr-5">
              <h2 className="text-white">About Speaker</h2>
              <div className="flex gap-3 py-2 items-center">
                <img
                  src="https://picsum.photos/300/200/"
                  className="w-15 h-15 rounded-full"
                />
                <div className="items-center justify-center">
                  <p className="text-white text-sm mb-2">Andy Browns</p>
                  <p className="text-gray-400 text-xs ">
                    Project Controls Director
                  </p>
                </div>
              </div>
            </div>

            <div className="py-4">
              <h2 className="text-white">Related Tags</h2>
              <div className="flex py-2 gap-3">
                <span className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm">
                  BIM
                </span>
                <span className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm">
                  General Project Controls
                </span>
                <span className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm">
                  Innovation Zone
                </span>
              </div>
            </div>

            <div className="py-4 border-t border-[#37454D]  mr-5">
              <h2 className="text-white">Additional Tags</h2>
              <div className="flex py-2 gap-3">
                <span className="rounded-full  bg-gray-700 text-gray-200 px-3 py-1 text-sm">
                  BIM
                </span>
                <span className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm">
                  General Project Controls
                </span>
                <span className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm">
                  Innovation Zone
                </span>
              </div>
            </div>
          </div>
          <div className="w-1/3 ">
            <h2 className="text-white px-4">Recommended Videos for you </h2>
            <div className="flex flex-col gap-1 px-2">
              {title.map((data, index) => (
                <Link  href={`/titles/${data.slug}`} key={index} className="flex items-center gap-4 px-2 py-1 ">
                  <img
                    src={"https://projectcontrolstv.com/" + data.poster}
                    className="w-2/5  rounded-lg"
                  />
                  <div>
                    <h2 className="text-sm font-semibold text-gray-300 mb-2">
                      {data.name.slice(0, 34)}
                    </h2>
                    <p className="text-gray-400 text-sm">{data.language}</p>
                    <p className="text-gray-400 text-sm ">Director of India</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
