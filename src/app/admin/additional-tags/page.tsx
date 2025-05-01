"use client";
import { Filter, Paginations, Model } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import { AdditionalTagFilter } from "@/constants/Filter";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import Link from "next/link";
import { useEffect, useState } from "react";
import Loading from "@/components/layout/Loading";
import { AdditionalTagColumn } from "@/constants/DataTableColumn";
import { formatDate } from "@/utils/common";

export default function Subscription() {
  const [additionalTags, setAdditionalTags] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdditionalTag = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getPeoples?known_for=sub-tv-topic`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        console.log(response.data.data);
        const modifiedData = response.data.data.map((item: any) => ({
          ...item,
          updated_at: `${formatDate(item.updated_at)} `,
        }));
        setLoading(false);
        setAdditionalTags(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  useEffect(() => {
    fetchAdditionalTag();
  }, []);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Additional Tag</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4  h-auto ">
            <Filter filterType={AdditionalTagFilter} />
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
              <Link
                href="additional-tags/create"
                className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusCircleIcon className="w-6 h-6" /> Add Additional Tag
              </Link>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <AdvanceDataTable
                  columns={AdditionalTagColumn}
                  data={additionalTags}
                  renderActions={(person) => (
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => console.log("Edit", person)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => console.log("Delete", person)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                />
                <Paginations />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
