"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";
import { ListType, PlanFormValues } from "@/constants/Type";
import {
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { formatDate } from "@/utils/common";
export default function ListMain() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/listsByUser`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
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
      toast(`${error.message}`);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="px-6 py-12 sm:rounded-lg sm:px-12 mx-auto w-full ">
      <form action="#" method="POST" className="space-y-6">
        <div className="flex justify-between">
          <h2 className="text-3xl">Your List</h2>

          <Link
            href="/lists/new"
            className="bg-red-500 rounded-md px-4 py-2 text-white cursor-pointer hover:bg-red-400"
          >
            New List
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <>
            {data.map((data: ListType, index) => (
              <div
                className=" mx-auto bg-gray-300 shadow-lg rounded-lg p-4 flex items-center justify-between hover:shadow-xl transition border border-gray-200"
                key={index}
              >
                <div className="flex flex-col">
                  <h2 className="text-xl font-bold text-gray-800">
                    {data.name}
                  </h2>
                  <div className="flex items-center mt-3 space-x-2">
                    <span className="gap-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {data.public ? (
                        <>
                          <LockOpenIcon className="w-5 h-5" />
                          <span>Public</span>
                        </>
                      ) : (
                        <>
                          <LockClosedIcon className="w-5 h-5" />
                          <span>Private</span>
                        </>
                      )}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mt-4">
                    {formatDate(data.created_at)} |{" "}
                    {formatDate(data.updated_at, true)}
                  </div>
                </div>
                <Link
                  href={`lists/${data._id}`}
                  className="text-gray-400 hover:text-blue-500 transition cursor-pointer"
                >
                  <PencilIcon className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </>
        )}
      </form>
    </div>
  );
}
