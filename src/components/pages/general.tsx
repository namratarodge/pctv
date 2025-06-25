"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Error } from "../layout";
import { titleSchema, TitleFormData } from "@/constants/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type Genre = {
  _id: string;
  id?: number;
  name: string;
  display_name: string;
  type: string;
  created_at: string;
  updated_at: string;
  __v?: number;
};

type Keyword = {
  _id: string;
  id: number;
  name: string;
  display_name: string;
  type: string;
  created_at: string;
  updated_at: string;
};

type Title = {
  _id: string;
  id: number;
  name: string;
  type: string;
  tmdb_vote_average: number | null;
  release_date: string;
  year: number;
  description: string;
  genre: string | null;
  tagline: string | null;
  poster: string;
  backdrop: string;
  runtime: number | null;
  trailer: string | null;
  budget: number | null;
  revenue: number | null;
  views: number;
  popularity: number;
  imdb_id: string | null;
  tmdb_id: string | null;
  season_count: number | null;
  fully_synced: boolean;
  allow_update: boolean;
  created_at: string;
  updated_at: string;
  language: string;
  country: string[];
  original_title: string;
  affiliate_link: string | null;
  tmdb_vote_count: number | null;
  certification: string;
  episode_count: number | null;
  series_ended: boolean;
  is_series: boolean;
  local_vote_average: number | null;
  show_videos: boolean;
  adult: boolean;
  local_vote_count: number;
  is_free: boolean;
  slug: string;
  genres: Genre[];
  keywords: Keyword[];
};

export default function General({
  titleId,
  data,
  onSubmit,
}: {
  titleId: string;
  data: Title;
  onSubmit: () => void;
}) {
  const isNew = titleId === "new";
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TitleFormData>({
    resolver: zodResolver(titleSchema),
  });

  const addNewTitle = async (data: TitleFormData) => {
    const token = localStorage.getItem("token");

    setLoading(true);
    try {
      const url = isNew
        ? `${process.env.NEXT_PUBLIC_API_URL}/title`
        : `${process.env.NEXT_PUBLIC_API_URL}/title/${titleId}`;

      const method = isNew ? "post" : "put";

      const response = await axios({
        method,
        url,
        data,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });
      if (response.data.status) {
        setLoading(false);
        if (titleId === "new") {
          const newId = isNew ? response.data.data._id : titleId;
          toast("Sucessfully Title Created.");
          router.push(`/admin/titles/${newId}/edit?active=general`);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  useEffect(() => {
    console.log("nwwwqwq");
    console.log(titleId);
    console.log(data);
    if (data) {
      reset({
        name: data.name || "",
        original_title: data.original_title || "",
        type: data.type === "movie" ? "Tv_topic" : "Categories", // adapt if needed
        allow_update: data.allow_update ? "yes" : "no",
        poster: data.poster || "",
        backdrop: data.backdrop || "",
        release_date: data.release_date || "",
        tagline: data.tagline || "",
        overview: data.description || "",
        runtime: data.runtime?.toString() || "",
        certification: data.certification || "",
        budget: data.budget || 0,
        revenue: data.revenue?.toString() || "",
        popularity: data.popularity?.toString() || "",
        language: data.language || "",
        free: data.is_free ? "Free" : "Premium",
      });
    }
  }, [data, reset]);
  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            {isNew ? "Create New title" : "General"}{" "}
          </h1>
          {loading && "Loading..."}
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 px-8">
          <form onSubmit={handleSubmit(addNewTitle)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  {...register("name", { required: "Title is required" })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <Error message={errors.name.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Original Title
                </label>
                <input
                  type="text"
                  {...register("original_title", {
                    required: "Original Title For is required",
                  })}
                  className="w-full  border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
                />
                {errors.original_title && (
                  <Error message={errors.original_title.message} />
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Type</label>
                <select
                  {...register("type", {
                    required: "type is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Tv_topic">TV Topic</option>
                  <option value="Categories">Categories</option>
                </select>

                {errors.type && <Error message={errors.type.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Allow Auto Update
                </label>
                <select
                  {...register("allow_update", {
                    required: "allow_update is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                </select>

                {errors.allow_update && (
                  <Error message={errors.allow_update.message} />
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Release Date
                </label>
                <input
                  type="date"
                  {...register("release_date", {
                    required: "release date is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.release_date && (
                  <Error message={errors.release_date.message} />
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Tagline
                </label>
                <input
                  type="text"
                  {...register("tagline", {
                    required: "TagLine is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.tagline && <Error message={errors.tagline.message} />}
              </div>
            </div>
            <div className="">
              <label className="block text-sm text-gray-600 mb-1">
                Overview
              </label>
              <textarea
                {...register("overview", {
                  required: "overview is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.overview && <Error message={errors.overview.message} />}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Runtime
                </label>
                <input
                  type="text"
                  {...register("runtime", {
                    required: "Runtime is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.runtime && <Error message={errors.runtime.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Certification
                </label>
                <select
                  {...register("certification", {
                    required: "Certification is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advance">Advance</option>
                </select>

                {errors.certification && (
                  <Error message={errors.certification.message} />
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Budget
                </label>
                <input
                  type="text"
                  {...register("budget", {
                    required: "Budget is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.budget && <Error message={errors.budget.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Revenue
                </label>
                <input
                  type="text"
                  {...register("revenue", {
                    required: "Revenue is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.revenue && <Error message={errors.revenue.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Popularity
                </label>
                <input
                  type="text"
                  {...register("popularity", {
                    required: "Popularity is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.popularity && (
                  <Error message={errors.popularity.message} />
                )}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Language
                </label>
                <select
                  {...register("language", {
                    required: "Language is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Portuguese">Portuguese</option>
                  <option value="English">English</option>
                  <option value="Spnish">Spnish</option>
                </select>

                {errors.language && <Error message={errors.language.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Free</label>
                <select
                  {...register("free", {
                    required: "Free is required",
                  })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Free">Free</option>
                  <option value="Premium">Premium</option>
                </select>

                {errors.free && <Error message={errors.free.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Poster
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPosterPreview(URL.createObjectURL(file));
                    }
                  }}
                  name="image"
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  BackDrop
                </label>
                <input
                  type="file"
                  name="image"
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                />
              </div>
              <div className="border rounded-md border-gray-300"></div>
            </div>

            <div className="flex justify-end gap-4">
              <button className="cursor-pointer bg-gray-300  text-gray-600 font-semibold py-3 px-6 rounded-lg shadow-md transition-all">
                Cancel
              </button>

              <button
                type="submit"
                className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
