"use client";
import { AutoCompeleteList, DataTable, ModelForm } from "@/components/forms";
import Loading from "@/components/layout/Loading";
import { CrewColumn } from "@/constants/DataTableColumn";
import { CastCreditType, CrewTypes, UserTag } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Error } from "../layout";

export default function Crew({ titleId }: { titleId: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CastCreditType>();

  const handleFormSubmit = async (data: CastCreditType) => {
    const payload = {
      person_id: data.person_id._id,
      creditable_id: titleId,
      order: 0,
      department: data.department,
      job: data.job,
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
      console.log(error);
      toast("Error creating Creditable:");
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
      console.log(error)
      toast("Error deleting creditable:");
    }
  };

  const fetch = useCallback(async () => {
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
          .filter((item: CrewTypes) => item.character === null)
          .map((item: CrewTypes) => ({
            ...item,
            updated_at: `${formatDate(item.updatedAt)} `,
          }));
        setLoading(false);
        setCategories(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:",error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  }, [titleId]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Speaker</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" />
            Add Speaker
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={CrewColumn}
              data={categories || []}
              renderActions={(person : CastCreditType) => (
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
            title="Select Speaker Member"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col  gap-3 ">
              <div>
                <label className="font-semibold pl-2 pb-2  text-gray-600">
                 Speaker Name
                </label>
                <Controller
                  name="person_id"
                  control={control}
                  rules={{ required: "Person is required" }}
                  render={({ field }) => (
                    <AutoCompeleteList
                      onSelect={(user: UserTag) => {
                        field.onChange(user); // updates form value
                      }}
                    />
                  )}
                />
                {errors.person_id && <Error message={errors.person_id.message} />}
              </div>
              <div className="pl-2  pb-4">
                <label className="block text-sm text-gray-600 mb-1 font-semibold">
                  Job
                </label>
                <input
                  type="text"
                  {...register("job", {
                    required: "job is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.job && <Error message={errors.job.message} />}
              </div>
              <div className="pl-2  pb-4">
                <label className="block text-sm text-gray-600 mb-1 font-semibold">
                  Department
                </label>
                <input
                  type="text"
                  {...register("department", {
                    required: "department is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.department && (
                  <Error message={errors.department.message} />
                )}
              </div>
            </div>
          </ModelForm>
        </div>
      </div>
    </div>
  );
}
