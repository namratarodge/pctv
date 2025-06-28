"use client";
import { Filter, ModelForm, Paginations } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { AdditionalTagFilter } from "@/constants/Filter";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import { SubscriptionsColumn } from "@/constants/DataTableColumn";
import { formatDate } from "@/utils/common";
import axios from "axios";
import { SubscriptionType, TagFormValue } from "@/constants/Type";
import Loading from "@/components/layout/Loading";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Button } from "@headlessui/react";

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingTagId, setEditingTagId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TagFormValue>();

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
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`,
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
          (item: SubscriptionType) => ({
            ...item,
            ends_at: `${formatDate(item.ends_at)} `,
            renews_at: `${formatDate(item.renews_at)} `,
            created_at: `${formatDate(item.created_at)} `,
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

  const handleFormSubmit = async (data: Record<string, string>) => {
    const token = localStorage.getItem("token");

    try {
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/tag/${editingTagId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/tag`;

      const method = isEditing ? "put" : "post";

      const response = await axios({
        url,
        method,
        data,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        toast.success(`Tag ${isEditing ? "updated" : "created"} successfully`);
        setIsModalOpen(false); // Close modal
        fetch(); // Refresh list
        reset();
        setIsEditing(false);
        setEditingTagId(null);
      } else {
        toast("Tags creation failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error creating plan:");
    }
  };

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  const addSubscriptions = () => {
    reset({
      name: "",
      display_name: "",
    });
    setIsEditing(false);
    setEditingTagId(null);
    setIsModalOpen(true);
  };

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Subscription</h1>
      <div className="sm:flex sm:items-center mt-4  h-auto ">
        <Filter filterType={AdditionalTagFilter} />
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
          <Button
            type="button"
            onClick={() => addSubscriptions()}
            className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Subscription
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <AdvanceDataTable
                columns={SubscriptionsColumn}
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
          )}
        </div>
      </div>
      <ModelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Tags" : "Create a New Tags"}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col">
          <label className="mb-1 text-gray-800"> Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-800"> Display Name</label>
          <input
            {...register("display_name", {
              required: "Display Name is required",
            })}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
          {errors.display_name && (
            <p className="text-red-500">{errors.display_name.message}</p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-800">Type</label>
          <select
            {...register("type", { required: "type is required" })}
            className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          >
            <option value="tv_type">TV Topic</option>
            <option value="genre">Categories</option>
            <option value="production_country">Production Country</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </ModelForm>
    </div>
  );
}
