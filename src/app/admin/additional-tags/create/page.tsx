"use client";
import { useForm } from "react-hook-form";
// pages/create-profile.tsx
import React, { useState } from "react";
import Error from "@/components/layout/Error";

export default function CreateProfile() {
  
  const [formData, setFormData] = useState({
    name: "",
    knownFor: "",
    bio: "",
    gender: "",
    birthDate: "",
    deathDate: "",
    popularity: "",
    birthPlace: "",
    allowAutoUpdate: false,
    image: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files?.[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = (data: any) => {
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            Add New People
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && (
                <Error message={errors.name.message} />
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Known For</label>
              <input
                type="text"
                {...register("knownFor", { required: "Known For is required" })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.knownFor && (
               <Error message={errors.knownFor.message} />
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Birth Date</label>
              <input
                type="date"
                {...register("birthdate", {
                  required: "Birth date is required",
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birthdate && (
                <p className="text-red-500 text-sm">
                  <Error message={errors.birthdate.message} />
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Death Date</label>
              <input
                type="date"
                {...register("deathDate", {
                  required: "Dead date is required",
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.deathDate && (
                 <Error message={errors.deathDate.message} />
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Birth Place</label>
              <input
                type="text"
                {...register("birthPlace", {
                  required: "Birth Place is required",
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.birthPlace && (
                <Error message={errors.birthPlace.message} />
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Popularity</label>
              <input
                type="number"
                {...register("popularity", {
                  required: "Popularity is required",
                })}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.popularity && (
                <Error message={errors.popularity.message} />
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Gender</label>
            <div className="flex gap-6">
              {["male", "female", "other"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={handleChange}
                  />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Bio</label>
            <textarea
              rows={4}
              {...register("bio", {
                required: "Bio is required",
              })}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
            {errors.bio && (
              <Error message={errors.bio.message} />
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-xl file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="allowAutoUpdate"
              onChange={handleChange}
              className="mr-2"
            />
            <label className="text-gray-700">Allow Auto Update</label>
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
