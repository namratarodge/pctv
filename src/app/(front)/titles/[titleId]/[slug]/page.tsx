"use client"; // ✅ client component, hooks allowed

import { StarRating, ViemoEmbed } from "@/components/forms";
import Loading from "@/components/layout/Loading";
import { TitleType, VideoType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import {
  PlayCircleIcon,
  PlusIcon,
  ShareIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function TitleDetailPage() {
  const params = useParams();
  const titleId = params?.titleId as string;
  const [title, setTitle] = useState<TitleType[]>([]);
  const [titleDetails, setTitleDetails] = useState<TitleType | null>(null);
  const [loading, setLoading] = useState(true);

  const [titleReview, setTitleReview] = useState(0);

  const [play, setPlay] = useState<VideoType | null>(null);

  const fetchTitleList = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            limit: 20,
          },
        }
      );
      if (response.data.status) {
        setTitle(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTitleDetails = useCallback(async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            _id: titleId,
          },
        }
      );
      if (response.data.status) {
        console.log(response.data.data);
        setTitleDetails(response.data.data);
        setTitleReview(response.data.data?.review[0]?.score);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [titleId]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await Promise.all([fetchTitleList(), fetchTitleDetails()]);
      setLoading(false);
    };

    fetchData();
  }, [titleId, fetchTitleDetails]);

  const handleWhatchList = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
    const payload = {
      title_id: id,
    };
    try {
      console.log(payload);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/watchlist`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        toast("Titles addedd whatchlist. Successfully");
      } else {
        toast(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handlePlay = (data: VideoType) => {
    console.log(data);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setPlay(data);
  };
  const handleProgress = async (seconds: number) => {
    const token = localStorage.getItem("token");
    console.log(seconds);

    if (!token || seconds === 0) return;
    const payload = {
      video_id: play?._id,
      time_watched: seconds,
    };

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/video-plays`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast("Error during login:" + error);
    }
  };

  return (
    <div className="pt-18 flex flex-col md:flex-row max-w-11/12 mx-auto">
      {loading ? (
        <div className="mx-auto">
          <Loading title="" />
        </div>
      ) : (
        <>
          {titleDetails && (
            <div className="w-full  md:w-2/3 lg:w-2/3 ">
              <div className="relative w-full rounded-lg overflow-hidden group">
                {!play && (
                  <>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_WEBSITE}/${titleDetails?.poster}`}
                      alt="poster"
                      width={800} // You can adjust this
                      height={500} // Adjust as needed for layout
                      className="w-full rounded-lg object-cover opacity-10 transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent  rounded-md" />

                    <div className="absolute inset-0 flex items-center justify-center">
                      <div
                        className="bg-white/70 hover:bg-white p-4 rounded-full shadow-lg transition-all duration-300 cursor-pointer"
                        onClick={() => setPlay(titleDetails?.videos[0])}
                      >
                        <PlayCircleIcon className="w-12 h-12 text-red-600" />
                      </div>
                    </div>
                    
                  </>
                )}
                {play && (
                  <ViemoEmbed
                    htmlString={play.url}
                    startTime={play?.video_play?.time_watched}
                    onVideoProgress={handleProgress}
                  />
                )}
              </div>
              <h1 className="text-xl text-white py-4">{titleDetails?.name}</h1>

              <div className="flex gap-2">
                <button
                  onClick={() => handleWhatchList(titleDetails._id)}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition duration-200 shadow-md ring-1 ring-white/20"
                >
                  <PlusIcon className="h-4 w-4 text-white" />
                  Watchlist
                </button>

                <button className="flex cursor-pointer items-center gap-2 rounded-full bg-white/10 backdrop-blur-md px-3 py-1.5 text-sm font-medium text-white hover:bg-white/20 transition duration-200 shadow-md ring-1 ring-white/20">
                  <ShareIcon className="h-4 w-4 text-white" />
                  Share
                </button>
              </div>
              <div className="flex justify-between py-2 border-t mt-4 border-b border-[#37454D]  mr-5">
                <p className="text-gray-400 text-sm">
                  {formatDate(titleDetails?.created_at, true)} -{" "}
                  {titleDetails?.views} views
                </p>
                <div className="flex gap-2">
                  <span className="text-gray-400">Rate us</span>
                  <div className="flex gap-1 items-center">
                    <StarRating
                      score={titleReview}
                      titleId={titleDetails._id}
                    />
                  </div>
                </div>
              </div>
              <div className="py-4">
                <p className="text-gray-400">{titleDetails.description}</p>
              </div>

              <div className="border-t border-b border-[#37454D] py-3 mr-5">
                <h2 className="text-white">About Speaker</h2>

                {titleDetails.credit.map((item, index) => (
                  <div className="flex gap-3 py-2 items-center" key={index}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_WEBSITE}/${item.person_id?.poster}`}
                      alt="poster"
                      width={800} // You can adjust this
                      height={500} // Adjust as needed for layout
                      className="w-15 h-15 rounded-full"
                    />

                    <div className="items-center justify-center">
                      <p className="text-white text-sm mb-2">
                        {item.person_id.name}
                      </p>
                      <p className="text-gray-400 text-xs capitalize">
                        {item.department}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="py-4">
                <h2 className="text-white">Related Tags</h2>
                <div className="flex flex-wrap py-2 gap-3">
                  {titleDetails.genres.length === 0 ||
                  titleDetails.keywords.length === 0 ? (
                    <span className="text-gray-400 text-sm">
                      No related tags available
                    </span>
                  ) : (
                    <>
                      {titleDetails.genres.map((item) => (
                        <span
                          key={item._id}
                          className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm"
                        >
                          {item.display_name}
                        </span>
                      ))}
                      {titleDetails.keywords.map((item) => (
                        <span
                          key={item._id}
                          className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm"
                        >
                          {item.display_name}
                        </span>
                      ))}
                    </>
                  )}
                </div>
              </div>

              <div className="py-4 border-t border-[#37454D] mr-5">
                <h2 className="text-white">Additional Tags</h2>
                <div className="flex flex-wrap py-2 gap-3">
                  {titleDetails.cast.length === 0 ? (
                    <span className="text-gray-400 text-sm">
                      No additional tags available
                    </span>
                  ) : (
                    titleDetails.cast.map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm"
                      >
                        {item.character}
                      </span>
                    ))
                  )}
                </div>
              </div>
              {titleDetails.videos.length > 0 && (
                <div className="py-6 border-t border-[#37454D] mr-5">
                  <h2 className="text-white text-xl font-semibold mb-4">
                    Video and Presentation
                  </h2>
                  <div className="flex flex-wrap gap-6">
                    {titleDetails.videos.map((item, index) => (
                      <div
                        key={index}
                        className="relative w-full sm:w-[48%] lg:w-[30%]"
                      >
                        <div className="rounded-lg overflow-hidden shadow-lg group">
                          <div className="relative">
                            <div
                              className="aspect-video opacity-50 group-hover:opacity-100 transition duration-300"
                              dangerouslySetInnerHTML={{ __html: item.url }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                className="bg-white/80 hover:bg-white rounded-full p-3 transition duration-300 cursor-pointer"
                                onClick={() => handlePlay(item)}
                              >
                                <PlayCircleIcon className="w-7 h-7 text-red-600" />
                              </button>
                            </div>
                          </div>
                          <div className="bg-[#1E293B] p-3">
                            <h3 className="text-white text-base font-medium">
                              {item.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="w-full md:w-1/3 ">
            <h2 className="text-white md:px-4 pb-4 ">
              Recommended Videos for you{" "}
            </h2>
            <div className="flex flex-col gap-1 h-screen overflow-y-auto scrollable">
              {title.map((data) => (
                <Link
                  href={`/titles/${data._id}/${data.slug}`}
                  key={data._id}
                  className="flex items-center gap-4 md:px-4 py-1 "
                >
                  <Image
                    src={`${process.env.NEXT_PUBLIC_WEBSITE}/${data?.poster}`}
                    alt={data.poster}
                    width={800} // You can adjust this
                    height={500} // Adjust as needed for layout
                    className="w-2/5  rounded-lg"
                  />
                  <div>
                    <h2 className="text-sm font-semibold text-gray-300 mb-2">
                      {data.name.slice(0, 65)}
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
