"use client";
import { useForm } from "react-hook-form";
import React, { useState } from "react";
import Error from "@/components/layout/Error";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export default function CreateProfile() {
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  console.log('tes')
  console.log(searchParams)
  const knownFor = searchParams.get('known_for'); 
  console.log(knownFor)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      allow_update: false,
    },
  });
  
  const addNewPeople = async (data: any) => {
    console.log(data);
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/createPeople`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        setLoading(false);
        console.log(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
      <div className="w-full  bg-white rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">
          Add New Person
        </h1>

        <form onSubmit={handleSubmit(addNewPeople)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-600 mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <Error message={errors.name.message} />}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Known For
              </label>
              <input
                type="text"
                value={knownFor}
                disabled
                {...register("known_for", { required: "Known For is required" })}
                className="w-full bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-gray-700"
              />
              {errors.known_for && <Error message={errors.known_for.message} />}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Birth Date
              </label>
              <input
                type="date"
                {...register("birth_date", {
                  required: "Birth date is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birth_date && <Error message={errors.birth_date.message} />}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Death Date
              </label>
              <input
                type="date"
                {...register("death_date", {
                  required: "Death date is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.death_date && <Error message={errors.death_date.message} />}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Birth Place
              </label>
              <input
                type="text"
                {...register("birth_place", {
                  required: "Birth Place is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birth_place && (
                <Error message={errors.birth_place.message} />
              )}
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Popularity
              </label>
              <input
                type="number"
                {...register("popularity", {
                  required: "Popularity is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.popularity && (
                <Error message={errors.popularity.message} />
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Gender</label>
            <div className="flex gap-6 mt-2">
              {["male", "female", "other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input
                    type="radio"
                    {...register("gender", {
                      required: "gender is required",
                    })}
                    value={g}
                    className="accent-blue-500"
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Bio</label>
            <textarea
              rows={4}
              {...register("bio", {
                required: "Bio is required",
              })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.bio && <Error message={errors.bio.message} />}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Upload Image
            </label>
            <input
              type="file"
              name="image"
              className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              {...register("allow_update")}
              className="accent-blue-500"
            />
            <label className="text-gray-700 text-sm">Allow Auto Update</label>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
