"use client";
import { Filter, Paginations } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState, useCallback } from "react";
import { TitleFilter } from "@/constants/Filter";
import axios from "axios";
import { formatDate } from "@/utils/common";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import { TitleColumn } from "@/constants/DataTableColumn";
import Loading from "@/components/layout/Loading";
import Link from "next/link";
import { toast } from "react-toastify";
import { TitleDetailsType, TitleType } from "@/constants/Type";
import { useDebounce } from "use-debounce";
import { parseQueryString } from "@/utils/helper"

export default function Title() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [filterQuery, setFilterQuery] = useState("");
  const [debouncedFilterQuery] = useDebounce(filterQuery, 1000); // 1 seconds delay

  const [pages, setPages] = useState(1);
  const [limits, setLimits] = useState(10);

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  const fetch = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const filterParams = parseQueryString(debouncedFilterQuery);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
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
        const modifiedData = response.data.data.data.map(
          (item: TitleDetailsType) => ({
            ...item,
            updated_at: `${formatDate(item.updated_at)} `,
          })
        );
        setData(modifiedData);
        setPagination(response.data.data.pagination);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [limits, pages, debouncedFilterQuery]); // dependencies used inside fetch

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/title/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Titles deleted successfully");
        fetch(); // Refresh the plans list
      } else {
        toast("Delete failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error deleting plan:");
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Titles</h1>

      <div className="sm:flex  mt-4  h-auto justify-between gap-4 ">
        <Filter filterType={TitleFilter} onQueryChange={setFilterQuery} />
        <div className="mt-4 sm:mt-0 sm:flex-none ">
          <Link
            href="titles/new/edit"
            className="flex items-center cursor-pointer gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> New Title
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
                  columns={TitleColumn}
                  data={data}
                  renderActions={(person: TitleType) => (
                    <div className="flex gap-3 justify-end">
                      <Link
                        href={`titles/${person._id}/edit `}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </Link>
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
    </div>
  );
}
