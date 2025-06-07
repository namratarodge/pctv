"use client";
import { Filter, Paginations, ModelForm } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { fields } from "@/constants/Form";
import { TitleFilter } from "@/constants/Filter";
import axios from "axios";
import { formatDate } from "@/utils/common";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import { TitleColumn } from "@/constants/DataTableColumn";
import Loading from "@/components/layout/Loading";
import { useForm } from "react-hook-form";

type FormValues = {
  title: string;
  description: string;
};

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data);
  };

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getTitles`,
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
        const modifiedData = response.data.data.data.map((item: any) => ({
          ...item,
          updated_at: `${formatDate(item.updated_at)} `,
        }));
        setData(modifiedData);
        setPagination(response.data.data.pagination);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  useEffect(() => {
    fetch();
  }, [pages, limits]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Titles</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4  h-auto ">
            <Filter filterType={TitleFilter} />
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center cursor-pointer gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusCircleIcon className="w-6 h-6" /> New Title
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <AdvanceDataTable
                  columns={TitleColumn}
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
                        onClick={() => console.log("Delete", person)}
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
      <ModelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Plan"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Description</label>
          <textarea
            {...register("description")}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
        </div>
      </ModelForm>
    </div>
  );
}
