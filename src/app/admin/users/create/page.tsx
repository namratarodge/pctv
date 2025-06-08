"use client";
import { UserFormData, userSchema } from "@/constants/Validation";
import { BackwardIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data: UserFormData) => {
    const token = localStorage.getItem("token");
    // write post request to
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/user",
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("User created sucessfully.");
        reset();
      }
      // Optionally reset form or give user feedback here
    } catch (error) {
      toast("Failed to create person:", error);
      // Optionally show error message to user
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            Add Users
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-600 mb-1">First Name</label>
              <input
                type="text"
                {...register("first_name")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.first_name && (
                <p className="text-red-500">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Last Name</label>
              <input
                type="text"
                {...register("last_name")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.last_name && (
                <p className="text-red-500">{errors.last_name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Email</label>
              <input
                type="email"
                {...register("email")}
                name="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Email Confirmed
              </label>
              <select
                {...register("email_confirmed")}
                className="col-start-1 row-start-1 w-2/6 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="yes">Yes</option>
                <option value="No">No</option>
              </select>
              {errors.email_confirmed && (
                <p className="text-red-500">{errors.email_confirmed.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="text"
                {...register("password")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-gray-600 mb-1">
                Confirmed Password
              </label>
              <input
                type="text"
                {...register("password_confirmed")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.password_confirmed && (
                <p className="text-red-500">
                  {errors.password_confirmed.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1">User Type</label>
            <div className="flex gap-6">
              {["user", "admin"].map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 text-gray-700"
                >
                  <input type="radio" {...register("user_type")} value={g} />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>

            {errors.user_type && (
              <p className="text-red-500">{errors.user_type.message}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-600 mb-1">Upload Image</label>
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-48 h-48 object-cover rounded shadow"
              />
            )}
            <div className="mt-2">
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-xl file:text-sm file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
              />
            </div>
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
