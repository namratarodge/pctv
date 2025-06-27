"use client";
import { ProfileFormData, profileSchema } from "@/constants/Validation";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import axios from "axios";

export default function CreateVideo() {
  const searchParams = useSearchParams(); // type: URLSearchParams
  const known_for = searchParams.get("known_for") ?? "";

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      knownFor: known_for,
      allow_update: false,
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    const token = localStorage.getItem("token");
    // write post request to
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/api/createPeople",
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("People created sucessfully.");
        reset({
          name: "",
          knownFor: known_for, // keep known_for prefilled if needed
          birth_date: "",
          death_date: "",
          birth_place: "",
          popularity: undefined,
          gender: "male",
          description: "",
          allow_update: false,
        });
      }
      // Optionally reset form or give user feedback here
    } catch (error) {
      console.log(error)
      toast("Failed to create person:");
      // Optionally show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            Add new Video
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
              <label className="block text-gray-600 mb-1">Known For</label>
              <input
                type="text"
                {...register("knownFor")}
                disabled={!!known_for}
                value={known_for}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.knownFor && (
                <p className="text-red-500">{errors.knownFor.message}</p>
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

            <div>
              <label className="block text-gray-600 mb-1">Death Date</label>
              <input
                type="date"
                {...register("death_date")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.death_date && (
                <p className="text-red-500">{errors.death_date.message}</p>
              )}
            </div>

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
                {...register("popularity")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.popularity && (
                <p className="text-red-500">{errors.popularity.message}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Gender</label>
            <div className="flex gap-6">
              <select
                {...register("gender")}
                className="col-start-1 row-start-1 w-1/6 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            {errors.gender && (
              <p className="text-red-500">{errors.gender.message}</p>
            )}
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
            <input
              type="file"
              name="image"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-xl file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
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
            className="w-50 bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-md transition-all"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
