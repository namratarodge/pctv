"use client";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DataTable, ModelForm } from "@/components/forms";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/common";
import axios from "axios";
import Loading from "@/components/layout/Loading";
import { CategoriesColumn } from "@/constants/DataTableColumn";
import { useForm } from "react-hook-form";
import currencies from "@/constants/currencies.json"; // adjust path as needed
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import AutoCompletePersonList from "@/components/forms/AutoCompletePersonList";
import { on } from "events";

type FormValues = {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  interval_count: number;
};

export default function Genre({
  titleId,
  data,
  onSubmit,
}: {
  titleId: string;
  data: any;
  onSubmit: () => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelect = (users) => {
    setSelectedUsers(users);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tags?type=genre`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 1000,
          },
        }
      );
      if (response.data.status) {
        const transformed = response.data.data.data.map(
          ({ _id, display_name }) => ({ id: _id, name: display_name })
        );
        console.log("Fetched categories:", transformed);
        setLoading(false);
        setCategories(transformed);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const handleFormSubmit = async (data: Record<string, string>) => {
    const payload = {
      taggable_id: titleId,
      taggable_type: "genre",
      tag_id: selectedUsers.map((user) => user.id),
    };

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/taggable`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Taggable created successfully:", response.data);
        setIsModalOpen(false);
        onSubmit();
      } else {
        toast("Taggable creation failed:", response.data.message);
      }
    } catch (error) {
      toast("Error creating plan:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this keyword?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/taggable/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Keyword deleted successfully");
        onSubmit(); // Refresh the data
      } else {
        toast("Failed to delete keyword:", response.data.message);
      }
    } catch (error) {
      toast("Error deleting keyword:", error);
    }
  }


  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Categories</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Categories
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={CategoriesColumn}
              data={data || []}
              renderActions={(person) => (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => handleDelete(person._id)}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            />
          )}
          <ModelForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Select Categories"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col h-30">
              <AutoCompletePersonList
                users={categories}
                onSelect={handleSelect}
              />
            </div>
          </ModelForm>
        </div>
      </div>
    </div>
  );
}
