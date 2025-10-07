"use client";

import Loading from "@/components/layout/Loading";
import { WhatchListType } from "@/constants/Type";
import { DocumentMagnifyingGlassIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  const handleDeleteWithConfirm = (id: string, fetch: () => void) => {
    toast(
      ({ closeToast }) => (
        <div className="space-y-3">
          <p className="text-gray-800 font-medium">
            Are you sure you want to delete this Watchlists?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={() => closeToast()}
              className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={async () => {
                closeToast();

                const token = localStorage.getItem("token");
                try {
                  const response = await axios.delete(
                    `${process.env.NEXT_PUBLIC_API_URL}/watchlist/${id}`,
                    {
                      headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (response.data.status) {
                    toast.success("Whatchlist deleted successfully");
                    fetch(); // Refresh list
                  } else {
                    toast.error(`Delete failed: ${response.data.message}`);
                  }
                } catch (error) {
                  console.error(error);
                  toast.error("Error deleting page.");
                }
              }}
              className="px-3 py-1 text-sm rounded bg-red-500 text-white hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
        draggable: false,
        closeButton: false,
      }
    );
  };

  return (
    <div className="pt-25 max-w-11/12 mx-auto">
      <h2 className="text-white text-4xl font-semibold">Watchlists</h2>

      {loading ? (
        <Loading />
      ) : data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-6">
          {data.map((item: WhatchListType, index) => (
            <Link
              href={`/titles/${item.title_id._id}/${item.title_id.slug}`}
              key={index}
              className="flex items-center gap-4 py-2"
            >
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

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDeleteWithConfirm(item._id, fetch);
                }}
                className="ml-auto mr-2 inline-flex items-center justify-center rounded-md border border-red-500/30 px-2.5 py-2 text-xs font-medium text-red-300 hover:text-white hover:bg-red-500/20 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Remove from watchlist"
                title="Remove from watchlist"
              >
                <TrashIcon className="h-5 w-5 " /> 
              </button>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 text-gray-400 h-100 w-full">
          <DocumentMagnifyingGlassIcon className="w-20 h-20 mb-2" />
          <p className="text-2xl font-medium">Nothing To Display</p>
          <p className="text-xl text-gray-500 mt-4">There is not Watchlists.</p>
        </div>
      )}
    </div>
  );
}
