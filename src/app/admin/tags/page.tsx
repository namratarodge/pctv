"use client";
import { Filter, ModelForm, Paginations } from "@/components/forms";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import Loading from "@/components/layout/Loading";
import { tagsColumn } from "@/constants/DataTableColumn";
import { TagsfilterType } from "@/constants/Filter";
import { formatDate } from "@/utils/common";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { TagFormValue, TagType } from "@/constants/Type";
import { parseQueryString } from "@/utils/helper";
import { useDebounce } from "use-debounce";

export default function Tags() {
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

  const [filterQuery, setFilterQuery] = useState("");
  const [debouncedFilterQuery] = useDebounce(filterQuery, 1000); // 1 seconds delay

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

  const handleEdit = (tag: TagFormValue) => {
    setIsEditing(true);
    setEditingTagId(tag._id);
    setIsModalOpen(true);

    // Populate form with existing data
    reset({
      name: tag.name,
      display_name: tag.display_name,
      type: tag.type,
    });
  };

  const addNewTags = () => {
    reset({
      name: "",
      display_name: "",
    });
    setIsEditing(false);
    setEditingTagId(null);
    setIsModalOpen(true);
  };

  const handleDelete = async (tag: TagFormValue) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/tag/${tag._id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Tag deleted successfully");
        fetch(); // Refresh the plans list
      } else {
        toast("Delete failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error deleting plan:");
    }
  };

  const fetch = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    const filterParams = parseQueryString(debouncedFilterQuery);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags`,
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
        const modifiedData = response.data.data.data.map((item: TagType) => ({
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
  }, [limits, pages, debouncedFilterQuery]);

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
      <h1 className="text-2xl font-semibold text-gray-600 ">Tags</h1>
      <div className="sm:flex  mt-4  h-auto justify-between gap-4 ">
        <Filter filterType={TagsfilterType} onQueryChange={setFilterQuery} />
        <div className="mt-4 sm:mt-0 sm:flex-none ">
          <button
            type="button"
            onClick={() => addNewTags()}
            className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add Tags
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <AdvanceDataTable
                columns={tagsColumn}
                data={data}
                renderActions={(person : TagType) => (
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleEdit(person)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(person)}
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
            <option value="keyword">TV Topic</option>
            <option value="genre">Categories</option>
            <option value="production_country">Production Country</option>
            <option value="custom">Custom</option>
          </select>
        </div>
      </ModelForm>
    </div>
  );
}
