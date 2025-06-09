"use client";
import { PageFormData, pageSchema } from "@/constants/Validation";
import dynamic from "next/dynamic";

const EditorInput = dynamic(() => import("@/components/forms/EditorInput"), {
  ssr: false,
});
import { BackwardIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
// pages/create-profile.tsx
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateProfile() {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  const onSubmit = async (data: PageFormData) => {
    const newData = {
      ...data,
      type: "default",
      user_id: 1,
    };
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/page",
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        toast("Pages created sucessfully.");
        reset();
      }
    } catch (error) {
      toast("Failed to create person:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex  justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            Add New Page
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className=" gap-6">
            <div>
              <label className="block text-gray-800 mb-1">Page Title</label>
              <input
                type="text"
                {...register("title")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="company-website"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Slug Name
            </label>
            <div className="mt-2">
              <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                  https://projectcontrolstv.com/pages/*/
                </div>
                <input
                  id="company-website"
                  {...register("slug")}
                  type="text"
                  placeholder="www.example.com"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
              </div>
              {errors.slug && (
                <p className="text-red-500 text-sm">{errors.slug.message}</p>
              )}
            </div>
          </div>

          <div>
            <Controller
              name="body"
              control={control}
              render={({ field }) => (
                <EditorInput
                  name="body"
                  label="body"
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {errors.body && (
              <p className="text-red-500 text-sm">{errors.body.message}</p>
            )}
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md transition-all"
            >
              Create
            </button>
            <button
              type="submit"
              className="px-6 font-semibold py-2 rounded-md transition-all"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
