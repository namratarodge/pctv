"use client";
import { Filter, Paginations } from "@/components/forms";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { PeopleFilter } from "@/constants/Filter";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/common";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import { PeopleColumn } from "@/constants/DataTableColumn";
import Loading from "@/components/layout/Loading";
import { toast } from "react-toastify";
import { PersonType } from "@/constants/Type";

export default function People() {
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
        setData(modifiedData);
        setPagination(response.data.data.pagination);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  }, [limits, pages]);

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/people/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("People deleted successfully");
        fetch(); // Refresh the plans list
      } else {
        toast("Delete failed:", response.data.message);
      }
    } catch (error) {
      toast("Error deleting People:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">People</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4  h-auto ">
            <Filter filterType={PeopleFilter} />
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
              <Link
                href="people/create"
                className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusCircleIcon className="w-6 h-6" /> New People
              </Link>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <AdvanceDataTable
                  columns={PeopleColumn}
                  data={data}
                  renderActions={(person) => (
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => console.log("Edit", person)}
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
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
