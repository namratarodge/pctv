"use client";

import { Filter, Paginations } from "@/components/forms";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import Loading from "@/components/layout/Loading";
import { VideoColumn } from "@/constants/DataTableColumn";
import { VideoFilter } from "@/constants/Filter";
import { VideoType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { parseQueryString } from "@/utils/helper";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

export default function Videos() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [pages, setPages] = useState(1);
  const [limits, setLimits] = useState(10);

  const [filterQuery, setFilterQuery] = useState("");
  const [debouncedFilterQuery] = useDebounce(filterQuery, 1000); // 1 seconds delay

 

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  const fetch = useCallback(async () => {
    const filterParams = parseQueryString(debouncedFilterQuery);
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/videos`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            limit: limits,
            page: pages,
            ...filterParams,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map((item: VideoType) => ({
          ...item,
          updated_at: `${formatDate(item.updated_at)} `,
        }));
        setData(modifiedData);
        setPagination(response.data.data.pagination);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  }, [pages, limits, debouncedFilterQuery]);

  const handleDelete = async (id: string) => {
    console.log(id)
    if (!window.confirm("Are you sure you want to delete this video?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/video/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("video deleted successfully");
        fetch();
      } else {
        toast("Failed to delete creditable:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error deleting creditable:");
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

 


  return (
    <>
      <div className="sm:flex  mt-4  h-auto justify-between gap-4 ">
        <Filter filterType={VideoFilter} onQueryChange={setFilterQuery} />
        <div className="mt-4 sm:mt-0 sm:flex-none ">
          <Link
            href="videos/new"
            className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Video
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            {loading ? (
              <Loading />
            ) : (
              <>
                <AdvanceDataTable
                  columns={VideoColumn}
                  data={data}
                  renderActions={(person : VideoType) => (
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => console.log("edit", person)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(person._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                />

                <Paginations
                  pagination={pagination}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
