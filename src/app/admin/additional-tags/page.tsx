"use client";
import { Filter, Paginations } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import { AdditionalTagFilter } from "@/constants/Filter";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Loading from "@/components/layout/Loading";
import { AdditionalTagColumn } from "@/constants/DataTableColumn";
import { formatDate } from "@/utils/common";
import { PersonType } from "@/constants/Type";
import { useDebounce } from "use-debounce";

export default function Subscription() {
  const [additionalTags, setAdditionalTags] = useState([]);
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

  const fetch = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/peoples`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            known_for: "sub-tv-topic",
            limit: limits,
            page: pages,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map(
          (item: PersonType) => ({
            ...item,
            updated_at: `${formatDate(item.updated_at)} `,
          })
        );
        setAdditionalTags(modifiedData);
        setPagination(response.data.data.pagination);
      } else {
        setAdditionalTags([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  }, [pages, limits, debouncedFilterQuery]);

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Additional Tag</h1>

      <div className="flex relative w-full gap-4 mt-4">
        <Filter
          filterType={AdditionalTagFilter}
          onQueryChange={setFilterQuery}
        />
        <div className="relative ">
          <Link
            href="people/create?known_for=sub-tv-topic"
            className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add Additional Tag
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
    </div>
  );
}
