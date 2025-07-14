"use client";

import { AutoCompeleteTitle } from "@/components/forms";
import UserAvatar from "@/components/forms/UserAvatar";
import { TitleDetailsType } from "@/constants/Type";
import { ListFormData, listsUpSchema } from "@/constants/Validation";
import { TrashIcon } from "@heroicons/react/24/outline";
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
  const [title, setTitle] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    control,
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
  const fetchListData = async () => {
    if (isNew) return;
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/list/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const listData = response.data?.data;
      if (listData) {
        setTitle(listData?.title);
        reset({
          name: listData.name,
          description: listData.description,
          public: listData.public ? "true" : "false",
        });
        setLoading(false);
      }
    } catch (error) {
      // window.location.href = "/lists";
      console.error("Error loading list:", error);
      toast.error("Failed to load list data");
      setLoading(false);
    }
  };

  // Add this in your component
  useEffect(() => {
    fetchListData();
  }, [id, reset]);

  const handleUserSelected = async (titleId: string) => {
    try {
      const token = localStorage.getItem("token");
      const payload = {
        titleId: titleId,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/list/${id}/add`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Titles Added successfully");
      await fetchListData();
    } catch (error) {
      console.error("Error loading list:", error);
      toast.error("Failed to load list data");
      setLoading(false);
    }
  };

  const handleDelete = async (titleId: string) => {
    const token = localStorage.getItem("token");
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_URL}/list/${id}/delete/${titleId}`,
      {
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );
    toast.success("Titles remove successfully");
    await fetchListData();
  };

  return (
    <div className="mt-20 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8">
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
        <div className="w-full lg:w-1/2 p-4 sm:p-6 lg:p-8 ">
          <AutoCompeleteTitle onSelect={handleUserSelected} />
          <div className=" mt-5">
            {title.length > 0 ? (
            <ul className="border border-gray-300 mt-2 rounded-md shadow-md bg-white max-h-100 overflow-y-auto">
              {title.map((item: TitleDetailsType, index: number) => (
                <li
                  key={index}
                  className="flex items-center justify-between gap-2 px-2 py-2  hover:bg-blue-200"
                >
                  <div className="flex gap-4">
                    <UserAvatar poster={item.poster} />
                    <div className="flex flex-col text-gray-800 ">
                      <span className="text-sm">{item.name}</span>
                      <small>
                        {item.type === "movie" ? "TV Topic" : "Category"}
                      </small>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="text-red-500 hover:text-red-700 px-2 py-1 rounded-md cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5 text-gray-800" />
                  </button>
                </li>
              ))}
            </ul>
            ) : (
              <div className="flex items-center justify-center h-100 text-center">
                <h1>No items are attached to this list yet.</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
