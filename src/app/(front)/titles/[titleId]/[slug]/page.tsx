"use client"; // ✅ client component, hooks allowed

import Loading from "@/components/layout/Loading";
import Image from "next/image";
import { PlusIcon, ShareIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { TitleType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { toast } from "react-toastify";

export default function TitleDetailPage() {
  const params = useParams();
  const titleId = params?.titleId as string;
  const [title, setTitle] = useState<TitleType[]>([]);
  const [titleDetails, setTitleDetails] = useState<TitleType | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchTitleList = async () => {
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
        setTitle(response.data.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchTitleDetails = useCallback(async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
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
    const payload = {
      title_id: id,
    };
    try {
      console.log(payload)
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
      }else{
        toast(response.data.error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
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
            <div className="w-full  md:w-2/3 lg:w-2/3">
              <Image
                src={`${process.env.NEXT_PUBLIC_WEBSITE}/${titleDetails?.poster}`}
                alt="poster"
                width={800} // You can adjust this
                height={500} // Adjust as needed for layout
                className="w-full rounded-lg object-cover"
              />

              <h1 className="text-xl text-white py-4">{titleDetails?.name}</h1>
              <div className="flex gap-2">
                <button
                  onClick={() => handleWhatchList(titleDetails._id)}
                  className="flex rounded-full bg-[#707070]  px-2 gap-1 py-1 items-center text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer"
                >
                  <PlusIcon className="h-4 w-4 text-white" />
                  Whatchlist
                </button>
                <button className="flex rounded-full bg-[#707070] px-2 gap-1 py-1 items-center text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20 cursor-pointer">
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
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                    <StarIcon className="h-5 w-5 text-yellow-500" />
                  </div>
                </div>
              </div>
              <div className="py-4">
                <p className="text-gray-400">{titleDetails.description}</p>
              </div>

              <div className="border-t border-b border-[#37454D] py-3 mr-5">
                <h2 className="text-white">About Speaker</h2>
                <div className="flex gap-3 py-2 items-center">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_WEBSITE}/${titleDetails?.poster}`}
                    alt="poster"
                    width={800} // You can adjust this
                    height={500} // Adjust as needed for layout
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
                <div className="flex  flex-wrap  py-2 gap-3">
                  {titleDetails.genres.map((item) => (
                    <span
                      key={item._id}
                      className="rounded-full bg-gray-700 text-gray-200 px-3 py-1 text-sm"
                    >
                      {item.display_name}
                    </span>
                  ))}
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
