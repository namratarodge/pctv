"use client";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { AutoCompeleteList, DataTable, ModelForm } from "@/components/forms";
import { useEffect, useState } from "react";
import { Error } from "../layout";
import { Controller } from "react-hook-form";
import { formatDate } from "@/utils/common";
import axios from "axios";
import Loading from "@/components/layout/Loading";
import { CastColumn } from "@/constants/DataTableColumn";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormValues = {
  person: string;
  character: string;
};

export default function Genre({
  titleId,
}: {
  titleId: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelect = (users: any) => {
    setSelectedUsers(users);
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>();

  const fetch = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/creditables?`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
          params: {
            creditable_id: titleId,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data
        .filter((item: any) => item.character != null)
        .map((item: any) => ({
          ...item,
          updated_at: `${formatDate(item.updatedAt)} `,
        }));
        console.log("Fetched categories:", modifiedData);
        setLoading(false);
        setCategories(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const handleFormSubmit = async (data: Record<string, string>) => {
    const payload = {
      person_id: selectedUsers._id,
      creditable_id: titleId,
      character: data.character,
      order: 1,
      department: "cast",
      job: "cast",
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/creditable`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Creditable created successfully:", response.data);
        fetch();
        setIsModalOpen(false);
      } else {
        toast("Creditable creation failed:", response.data.message);
      }
    } catch (error) {
      toast("Error creating Creditable:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this person?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/creditable/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("creditable deleted successfully");
        fetch();
      } else {
        toast("Failed to delete creditable:", response.data.message);
      }
    } catch (error) {
      toast("Error deleting creditable:", error);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Cast</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Add Cradit
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={CastColumn}
              data={categories || []}
              renderActions={(person) => (
                <div className="flex gap-3 justify-center">
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
            <div className="flex flex-col  gap-3 ">
              <div>
                <label className="font-semibold pl-2 text-gray-600">
                  Person
                </label>
                <Controller
                  name="person"
                  control={control}
                  rules={{ required: "Person is required" }}
                  render={({ field }) => (
                    <AutoCompeleteList
                      onSelect={(user: any) => {
                        field.onChange(user); // updates form value
                        setSelectedUsers(user); // your local logic
                      }}
                      value={field.value} // keeps form in sync
                    />
                  )}
                />
                {errors.person && <Error message={errors.person.message} />}
              </div>
              <div className="pl-2  pb-4">
                <label className="block text-sm text-gray-600 mb-1 font-semibold">
                  Character
                </label>
                <input
                  type="text"
                  {...register("character", {
                    required: "character is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.character && (
                  <Error message={errors.character.message} />
                )}
              </div>
            </div>
          </ModelForm>
        </div>
      </div>
    </div>
  );
}
