"use client";

import { ListType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import {
  LockClosedIcon,
  LockOpenIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Loading from "../layout/Loading";
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
      } else {
        setData([]);
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
            Are you sure you want to delete this list?
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
                    `${process.env.NEXT_PUBLIC_API_URL}/list/${id}`,
                    {
                      headers: {
                        Authorization: token,
                        "Content-Type": "application/json",
                      },
                    }
                  );

                  if (response.data.status) {
                    toast.success("List deleted successfully");
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
    <div className="px-6 py-12 sm:rounded-lg sm:px-12 mx-auto w-full space-y-6">
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
          {data.length === 0 ? (
            <div className="text-center text-gray-500 py-6">
              No lists found.
            </div>
          ) : (
            data.map((data: ListType, index) => (
              <div
                className="mx-auto bg-gray-300 shadow-lg rounded-lg p-4 flex items-center justify-between hover:shadow-xl transition border border-gray-200"
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
                    {formatDate(data.updated_at, true)}
                  </div>
                </div>
                <div className="flex space-x-3 items-center">
                  <Link
                    href={`lists/${data._id}`}
                    className="text-gray-400 hover:text-blue-500 transition cursor-pointer"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDeleteWithConfirm(data._id, fetch)}
                    className="text-red-400 hover:text-red-600 transition cursor-pointer"
                    title="Delete"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </>
      )}
    </div>
  );
}
