"use client";
import { ProfileFormData, profileSchema } from "@/constants/Validation";
import { ChevronDownIcon, PhotoIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreatePeople() {
  const searchParams = useSearchParams(); // type: URLSearchParams
  const Known_for = searchParams.get("known_for") ?? "";
  const id = searchParams.get("id"); // check for ID in query param

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      known_for: Known_for,
      allow_update: false,
    },
  });

  // Fetch user details if in edit mode
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/peoples?_id=${id}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const user = res.data.data.data[0];
          setValue("name", user.name);
          setValue("known_for", user.known_for);
          setValue("birth_date", user.birth_date);
          // setValue("death_date", user.death_date);
          setValue("birth_place", user.birth_place);
          setValue("popularity", user.popularity);
          setValue("gender", user.gender);
          setValue("description", user.description);
          setValue("company_name", user.company_name);
          setValue("allow_update", Boolean(user.allow_update));

          // Set thumbnail preview
          if (user.poster) {
            const baseURL = process.env.NEXT_PUBLIC_WEBSITE + "/" + user.poster;
            setPreviewUrl(baseURL);
          }
        })
        .catch(() => {
          toast.error("Failed to fetch user details.");
        });
    }
  }, [id, setValue]);

  const onSubmit = async (formData: ProfileFormData) => {
    const token = localStorage.getItem("token");

    const formDataToSend = new FormData();

    // Append all fields manually
    formDataToSend.append("name", formData.name);
    formDataToSend.append("known_for", formData.known_for);
    formDataToSend.append("birth_date", formData.birth_date ?? "");
    // formDataToSend.append("death_date", formData.death_date ?? "");
    formDataToSend.append("birth_place", formData.birth_place ?? "");
    formDataToSend.append("popularity", String(formData.popularity ?? ""));
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("company_name", formData.company_name ?? "");
    formDataToSend.append("description", formData.description);
    formDataToSend.append(
      "allow_update",
      formData.allow_update ? "true" : "false"
    );

    if (thumbnail) {
      formDataToSend.append("poster", thumbnail);
    }

    // write post request to
    try {
      let response;
      if (!isEditMode) {
        response = await axios.post(
          process.env.NEXT_PUBLIC_API_URL + "/people",
          formDataToSend,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        response = await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/people/${id}`,
          formDataToSend,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      if (response.data.status) {
        toast.success(
          id ? "People updated successfully." : "People created successfully."
        );
        if (!id) reset(); // reset only on create
      }
      // Optionally reset form or give user feedback here
    } catch (error) {
      console.log(error);
      toast.error("Failed to create person:");
      // Optionally show error message to user
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnail(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };
  const handleRemoveThumbnail = () => {
    setPreviewUrl(null); // Or setPreviewUrl('')
    setThumbnail(null); // Or setPreviewUrl('')
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            {isEditMode ? "Edit" : "Add"} New People
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                {...register("name")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Job Title</label>
              <input
                type="text"
                {...register("known_for")}
                disabled={!!Known_for}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.known_for && (
                <p className="text-red-500">{errors.known_for.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Birth Date</label>
              <input
                {...register("birth_date")}
                type="date"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birth_date && (
                <p className="text-red-500">{errors.birth_date.message}</p>
              )}
            </div>

            {/* <div>
              <label className="block text-gray-600 mb-1">Death Date</label>
              <input
                type="date"
                {...register("death_date")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.death_date && (
                <p className="text-red-500">{errors.death_date.message}</p>
              )}
            </div> */}

            <div>
              <label className="block text-gray-600 mb-1">Birth Place</label>
              <input
                type="text"
                {...register("birth_place")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birth_place && (
                <p className="text-red-500">{errors.birth_place.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Popularity</label>
              <input
                type="number"
                {...register("popularity", {
                  setValueAs: (v) =>
                    v === "" || v === null ? undefined : Number(v),
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.popularity && (
                <p className="text-red-500">{errors.popularity.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Gender</label>
              <div className="mt-2 grid grid-cols-1">
                <select
                  {...register("gender")}
                  name="gender"
                  autoComplete="gender"
                  className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                />
              </div>
              {errors.gender && (
                <p className="text-red-500">{errors.gender.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Company Name</label>
              <input
                type="text"
                {...register("company_name")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.company_name && (
                <p className="text-red-500">{errors.company_name.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Bio</label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Upload Image</label>
            <div className="flex items-center gap-3">
              {previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Thumbnail Preview"
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveThumbnail}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </>
              ) : (
                <PhotoIcon className="w-10 h-10 text-gray-300" />
              )}

              <div>
                <label
                  htmlFor="thumbnailUpload"
                  className="cursor-pointer inline-block px-4 py-2 text-sm rounded-md border bg-white hover:bg-gray-50 text-gray-700"
                >
                  Speaker Headshot
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  name="poster"
                  id="thumbnailUpload"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <label className="text-gray-700">
              <input
                type="checkbox"
                {...register("allow_update")}
                className="mr-2"
              />
              Allow Auto Update
            </label>
          </div>

          <button
            type="submit"
            className="px-4 cursor-pointer bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md transition-all"
          >
            {isEditMode ? "Edit" : "Add"} Submit
          </button>
        </form>
      </div>
    </div>
  );
}
