"use client";
import { TitleDetailsType } from "@/constants/Type";
import { TitleFormData, titleSchema } from "@/constants/Validation";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Error } from "../layout";

type PageProps = {
  titleId: string;
  data: TitleDetailsType | null;
};

export default function General({ titleId, data }: PageProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isNew = titleId === "new";
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [posterData, setPosterData] = useState<File | null>(null);
  const [previewPosterUrl, setPreviewPosterUrl] = useState<string | null>(null);

  const [backdropData, setBackdropData] = useState<File | null>(null);
  const [previewBackdropUrl, setPreviewBackdroprUrl] = useState<string | null>(
    null
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TitleFormData>({
    resolver: zodResolver(titleSchema),
  });

  const addNewTitle = async (data: TitleFormData) => {
    console.log("Submitting data:", data);
    const token = localStorage.getItem("token");
    const formData = new FormData();

    // JSON fields
    formData.append("name", data.name);
    formData.append("original_title", data.original_title);
    formData.append("type", data.type);
    formData.append("allow_update", data.allow_update ? "1" : "0");
    formData.append("release_date", data.release_date);
    formData.append("tagline", data.tagline || "");
    formData.append("overview", data.overview || "");
    formData.append("runtime", data.runtime || "");
    formData.append("certification", data.certification || "");
    if (data.budget !== undefined)
      formData.append("budget", String(data.budget));
    if (data.revenue !== undefined)
      formData.append("revenue", String(data.revenue));
    if (data.popularity !== undefined)
      formData.append("popularity", String(data.popularity));
    formData.append("language", data.language);
    formData.append("is_free", data.is_free ? "1" : "0");

    if (posterData) {
      formData.append("poster", posterData);
    }
    if (!previewPosterUrl) {
      formData.append("remove_poster", "true");
    }

    if (backdropData) {
      formData.append("backdrop", backdropData);
    }
    if (!previewBackdropUrl) {
      formData.append("remove_backdrop", "true");
    }

    console.log("FormData entries:", Array.from(formData.entries())); // debug

    setLoading(true);
    try {
      const url = isNew
        ? `${process.env.NEXT_PUBLIC_API_URL}/title`
        : `${process.env.NEXT_PUBLIC_API_URL}/title/${titleId}`;
      const method = isNew ? "post" : "put";

      const response = await axios({
        method,
        url,
        data: formData, // ← important
        headers: {
          Authorization: token,
        },
      });

      if (response.data.status) {
        const newId = isNew ? response.data.data._id : titleId;
        toast(
          isNew ? "Sucessfully Title Created." : "Sucessfully Title Updated."
        );
        router.push(`/admin/titles/${newId}/edit?active=general`);
      }
    } catch (error) {
      console.error("Error submitting:", error);
      toast.error("Failed to save Title");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      reset({
        name: data.name || "",
        original_title: data.original_title || "",
        type: data.type === "movie" ? "Tv_topic" : "Categories", // adapt if needed
        allow_update: data.allow_update ? 1 : 0,
        // poster: data.poster || "",
        // backdrop: data.backdrop || "",
        release_date: data.release_date || "",
        tagline: data.tagline || "",
        overview: data.description || "",
        runtime: data.runtime?.toString() || "",
        certification: data.certification || "",
        budget: data.budget || 0,
        revenue: data.revenue || 0,
        popularity: data.popularity || 0,
        language: data.language || "",
        is_free: data.is_free,
      });
      if (data.poster) {
        setPreviewPosterUrl(
          process.env.NEXT_PUBLIC_WEBSITE + "/" + data.poster || null
        );
      } else {
        setPreviewPosterUrl(null);
      }

      if (data.backdrop) {
        setPreviewBackdroprUrl(
          process.env.NEXT_PUBLIC_WEBSITE + "/" + data.backdrop || null
        );
      } else {
        setPreviewBackdroprUrl(null);
      }
    }
  }, [titleId, data, reset]);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "poster" | "backdrop"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (type === "poster") {
      setPosterData(file);
      setPreviewPosterUrl(URL.createObjectURL(file));
    } else {
      setBackdropData(file);
      setPreviewBackdroprUrl(URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = (type: "poster" | "backdrop") => {
    if (type === "poster") {
      setPosterData(null);
      setPreviewPosterUrl(null);
    } else {
      setBackdropData(null);
      setPreviewBackdroprUrl(null);
    }
  };

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
                  {...(register("allow_update"), { valueAsNumber: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={1}>Yes</option>
                  <option value={0}>No</option>
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
                  type="number"
                  {...register("budget", {
                    setValueAs: (v) =>
                      v === "" || v === null ? undefined : Number(v),
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
                  type="number"
                  {...register("revenue", { valueAsNumber: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {errors.revenue && <Error message={errors.revenue.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Popularity
                </label>
                <input
                  type="number"
                  {...register("popularity", {
                    setValueAs: (v) =>
                      v === "" || v === null ? undefined : Number(v),
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
                  <option value="">Select Language</option>
                  <option value="Portuguese">Portuguese</option>
                  <option value="English">English</option>
                  <option value="Spnish">Spnish</option>
                </select>

                {errors.language && <Error message={errors.language.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">Free</label>
                <select
                  {...register("is_free", { valueAsNumber: true })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {/* <option value={1}>Free</option> */}
                  <option value={0}>Premium</option>
                </select>

                {errors.is_free && <Error message={errors.is_free.message} />}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Poster
                </label>

                <div className="flex items-center gap-4">
                  {previewPosterUrl ? (
                    <div className="relative">
                      <img
                        src={previewPosterUrl}
                        alt="Thumbnail Preview"
                        className="w-30 h-20 rounded-sm border border-gray-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("poster")}
                        className="absolute  cursor-pointer -top-2 -right-2 text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-red-500 hover:bg-red-50"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-100">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="posterUpload"
                      className="cursor-pointer inline-block px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                    >
                      {previewPosterUrl ? "Change" : "Upload"} Poster
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="poster"
                      id="posterUpload"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "poster")}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* <input
                  type="file"
                  accept="image/*"
                  {...register("poster")}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                /> */}
              </div>

              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  BackDrop
                </label>

                <div className="flex items-center gap-4">
                  {previewBackdropUrl ? (
                    <div className="relative">
                      <img
                        src={previewBackdropUrl}
                        alt="Thumbnail Preview"
                        className="w-30 h-20 rounded-sm  border border-gray-300 shadow-sm"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemoveImage("backdrop")}
                        className="absolute -top-2 -right-2 text-xs bg-white border border-gray-200 rounded-full px-2 py-0.5 text-red-500 hover:bg-red-50"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <div className="w-20 h-20 flex items-center justify-center rounded-full border border-dashed border-gray-300 bg-gray-100">
                      <PhotoIcon className="w-8 h-8 text-gray-400" />
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="backdropUpload"
                      className="cursor-pointer inline-block px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 shadow-sm"
                    >
                      {previewPosterUrl ? "Change" : "Upload"} Poster
                    </label>
                    <input
                      ref={fileInputRef}
                      type="file"
                      name="backdrop"
                      id="backdropUpload"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "backdrop")}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* <input
                  type="file"
                  accept="image/*"
                  {...register("backdrop")}
                  className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
                /> */}
              </div>
              {/* <div className="border rounded-md border-gray-300"></div> */}
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
