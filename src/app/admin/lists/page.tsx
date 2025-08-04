"use client";
import { DataTable } from "@/components/forms";
import Loading from "@/components/layout/Loading";
import { listColumn } from "@/constants/DataTableColumn";
import { ListType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { parseQueryString } from "@/utils/helper";
import { PencilIcon, PlusCircleIcon } from "@heroicons/react/16/solid";
import axios from "axios";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export default function Lists() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterQuery, setFilterQuery] = useState("");
  const [debouncedFilterQuery] = useDebounce(filterQuery, 1000); // 1 seconds delay

  const fetch = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const filterParams = parseQueryString(debouncedFilterQuery);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/lists`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            public: 1,
            ...filterParams,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map((item: ListType) => ({
          ...item,
          updated_at: `${formatDate(item.updated_at)} `,
        }));

        setData(modifiedData);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  }, [debouncedFilterQuery]);

  useEffect(() => {
    fetch();
  }, []);
  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4  h-auto  justify-between">
            <h1 className="text-2xl font-semibold text-gray-600 ">Lists</h1>
            {/* <Filter filterType={filterType} onQueryChange={setFilterQuery} /> */}
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none flex gap-2">
              <Link
                href="/lists/new"
                className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusCircleIcon className="w-6 h-6" /> Add New Lists
              </Link>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <DataTable
                  columns={listColumn}
                  data={data}
                  renderActions={(person: ListType) => (
                    <div className="flex gap-3 justify-end">
                      <Link
                        href={`/lists/${person._id}`}
                        className="text-gray-600 hover:text-gray-800 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
