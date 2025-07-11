"use client";

import Loading from "@/components/layout/Loading";
import { ListFormData, listsUpSchema } from "@/constants/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function TitleDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const isNew = id === "new";
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ListFormData>({
    resolver: zodResolver(listsUpSchema),
  });

  // ✅ Create or Update
  const onSubmit = async (data: ListFormData) => {
    const token = localStorage.getItem("token");

    const payload = {
      ...data,
      public: data.public === "true",
    };

    try {
      let response;
      if (isNew) {
        // CREATE new
        response = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/list`,
          payload,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // UPDATE existing
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/list/${id}`,
          payload,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
      }
      const responseNew = response.data;
      console.log(responseNew);
      if (responseNew.status) {
        if (isNew) {
          toast.success("Lists Added successfully");
          reset();
          window.location.href = "/lists";
        } else {
          toast.success("Lists Updated successfully");
        }
      } else {
        toast.error(responseNew?.message?.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error during login:" + error);
    }
  };

  // Add this in your component
  useEffect(() => {
    const fetchListData = async () => {
      if (isNew) return;
      setLoading(true);

      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/lists`,
          {
            headers: {
              Authorization: token,
            },
            params: {
              _id: id,
            },
          }
        );

        const listData = response.data?.data.data[0];
        if (listData) {
          // IMPORTANT: ensure public is string "true"/"false" for the radio
          reset({
            name: listData.name,
            description: listData.description,
            public: listData.public ? "true" : "false",
          });
          setLoading(false);
        }
      } catch (error) {
        window.location.href = "/lists";
        console.error("Error loading list:", error);
        toast.error("Failed to load list data");
        setLoading(false);
      }
    };

    fetchListData();
  }, [id, reset]);


  return (
    <div className="mt-20  max-w-8/12 mx-auto flex flex-col lg:flex-row">
      <div className="w-1/2 p-5">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base/7 font-semibold ">
            {isNew ? "Create" : "Update"} List
          </h2>
          <p className="mt-1 text-sm/6 ">
            Use a permanent address where you can receive mail.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
          >
            <div className="col-span-full">
              <label htmlFor="email" className="block text-sm/6 font-medium">
                Name
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  {...register("name")}
                  autoComplete="name"
                  className="block text-gray-800 w-full rounded-md bg-white px-3 py-1.5 text-base outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-2 px-2">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="sm:col-span-3">
              <div className="flex  gap-4">
                <div className="flex items-center gap-x-3">
                  <input
                    defaultChecked
                    id="public"
                    {...register("public")}
                    type="radio"
                    value="true"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-red-600 checked:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm/6 font-medium "
                  >
                    Public
                  </label>
                </div>
                <div className="flex items-center gap-x-3">
                  <input
                    id="private"
                    {...register("public")}
                    type="radio"
                    value="false"
                    className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-red-600 checked:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                  />
                  <label
                    htmlFor="push-everything"
                    className="block text-sm/6 font-medium "
                  >
                    Private
                  </label>
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="street-address"
                className="block text-sm/6 font-medium "
              >
                Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  {...register("description")}
                  autoComplete="description"
                  className="block w-full rounded-md  text-gray-800 bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                />
              </div>
              {errors.description && (
                <p className="text-red-500 text-sm mt-2 px-2">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="flex gap-4">
              <button className="bg-red-500 rounded-md px-6 py-2 text-white cursor-pointer hover:bg-red-400">
                {isNew ? "Save" : "Update"}
              </button>
              <button className="bg-gray-800 rounded-md px-6 py-2 text-white cursor-pointer hover:bg-gray-400">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {!isNew && (
        <div className="w-1/2">
          <div className="p-5 ">
            <input
              type="text"
              className="border border-gray-300 rounded-md w-full px-4 py-2"
              placeholder="Enter title name"
            />
            <div className="border mt-5 ">
              <div></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
