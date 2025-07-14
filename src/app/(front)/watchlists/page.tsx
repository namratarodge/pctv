"use client";

import Loading from "@/components/layout/Loading";
import { WhatchListType } from "@/constants/Type";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<WhatchListType[]>([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/watchlists`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            page: 1,
            limit: 30,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setData(modifiedData);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="pt-25  max-w-11/12  mx-auto h-screen">
      <h2 className="text-white text-4xl font-semibold">WhatchList</h2>
      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
          {data.length === 0 && (
            <h1 className="text-2xl ">There are no whachlists.</h1>
          )}
          {data.map((item: WhatchListType, index) => (
            <div key={index} className="flex items-center gap-4 py-2">
              <Image
                src={`${process.env.NEXT_PUBLIC_WEBSITE}/${item.title_id.poster}`}
                alt={item.title_id.name}
                width={300}
                height={200}
                className="w-2/5 rounded-lg object-cover"
              />
              <div>
                <h2 className="text-sm font-semibold text-gray-300 mb-2">
                  {item.title_id.name}
                </h2>
                <p className="text-gray-400 text-sm">{item.title_id.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
