"use client";

import { VideoFormType } from "@/constants/Type";
import { videoSchema } from "@/constants/Validation";
import { PhotoIcon, VideoCameraIcon } from "@heroicons/react/24/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AutoCompleteTitleList } from ".";

import { QualityOptions, categoryOptions, languageOptions, videoOptions } from "@/constants/Main";




export default function CreateVideo() {
  const [videoType, setVideoType] = useState("embed");

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<VideoFormType>({
    resolver: zodResolver(videoSchema),
  });

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setVideoType(e.target.value);
  };

  const onSubmit = async (data: VideoFormType) => {
    const token = localStorage.getItem("token");
    console.log("Sending:", data);
    // post logic here
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/video",
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Video Added sucessfully.");
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to create Video:");
    }
  };
  const handleUserSelected = async (data: string) => {
    console.log(data);
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  return (
    <div className="  from-gray-100 to-gray-200 flex items-center justify-center px-2">
      <div className="w-full bg-white rounded-sm shadow-lg p-10 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <VideoCameraIcon className="h-7 w-7 text-red-500" />
          Add New Video
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Video Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Video Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  {...register("name")}
                  className="w-full border rounded-md py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none border-gray-300"
                />
                <VideoCameraIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Thumbnail */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Thumbnail
              </label>
              <div className="flex items-center gap-3">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Thumbnail Preview"
                    className="w-16 h-16 rounded object-cover border"
                  />
                ) : (
                  <PhotoIcon className="w-10 h-10 text-gray-300" />
                )}

                <div>
                  <label
                    htmlFor="thumbnailUpload"
                    className="cursor-pointer inline-block px-4 py-2 text-sm rounded-md border bg-white hover:bg-gray-50 text-gray-700"
                  >
                    Select Thumbnail
                  </label>
                  <input
                    type="file"
                    id="thumbnailUpload"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Video Type */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Type
              </label>
              <select
                {...register("type")}
                onChange={handleTypeChange}
                value={videoType}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {videoOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
              {errors.type && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.type.message}
                </p>
              )}
            </div>

            {/* Dynamic Input Field */}
            <div>
              <>
                <label className="block text-gray-700 font-medium mb-1">
                  Embed Code
                </label>
                <textarea
                  {...register("url")}
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
                {errors.embed_code && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.embed_code.message}
                  </p>
                )}
              </>
            </div>

            {/* Quality */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Quality
              </label>
              <select
                {...register("quality")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {QualityOptions.map((option) => (
                  <option key={option.key} value={option.key}>
                    {option.value}
                  </option>
                ))}
              </select>
              {errors.quality && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.quality.message}
                </p>
              )}
            </div>

            {/* Language */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Language
              </label>
              <select
                {...register("language")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {languageOptions.map((lang) => (
                  <option key={lang.key} value={lang.key}>
                    {lang.value}
                  </option>
                ))}
              </select>
              {errors.language && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.language.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Title
              </label>

              <Controller
                name="title_id"
                control={control}
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <AutoCompleteTitleList
                    onSelect={(titleId: string) => {
                      field.onChange(titleId);
                    }}
                  />
                )}
              />

              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Category
              </label>
              <select
                {...register("category")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-red-500 focus:outline-none"
              >
                {categoryOptions.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.category.message}
                </p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-right">
            <button
              type="submit"
              className="cursor-pointer inline-flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white font-semibold rounded-md shadow transition"
            >
              <VideoCameraIcon className="h-5 w-5" />
              Save Video
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
