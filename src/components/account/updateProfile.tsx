"use client";

import { usePublicData } from "@/components/context/PublicDataContext";
import { countryOptions, genderOption } from "@/constants/Main";
import { UserUpdateFormData, userUpdateSchema } from "@/constants/Validation";
import { CheckBadgeIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { LoadingForm } from "../layout";

export default function UpdateProfile() {
  const { user, loading } = usePublicData();
  const [loadingUser, setLoadingUser] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserUpdateFormData>({
    resolver: zodResolver(userUpdateSchema),
  });

  // ✅ Create or Update
  const onSubmit = async (data: UserUpdateFormData) => {
    const token = localStorage.getItem("token");
    setLoadingUser(true);
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/${user?.id}`,
        data,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const responseNew = response.data;
      if (responseNew.status) {
        toast.success("Account Info Updated successfully");
      }
      setLoadingUser(false);
    } catch (error) {
      toast("Error during login:" + error);
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        gender: user.gender || "Male",
        country: user.country || "India",
      });
    }
  }, [user, reset]);

  return (
    <>
      <div className="min-h-screen bg-white text-black max-w-3xl mx-auto ">
        <h1 className="text-4xl font-semibold">Update Profile Details</h1>
        <p className="my-4">Account Details</p>
        {loading ? (
          <LoadingForm title="Fetching user data, please wait..." />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="bg-gray-100 mt-4 py-6 px-6 rounded-md">
              <h3 className="text-sm">Update user Info</h3>
              <div className="mt-4 w-2/3 space-y-3">
                <input
                  type="text"
                  {...register("first_name")}
                  placeholder="First Name"
                  autoComplete="email"
                  className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
                {errors.first_name && (
                  <p className="text-red-500 text-sm mt-2 px-2">
                    {errors.first_name.message}
                  </p>
                )}
                <input
                  type="text"
                  {...register("last_name")}
                  placeholder="Last Name"
                  autoComplete="last_name"
                  className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
                {errors.last_name && (
                  <p className="text-red-500 text-sm mt-2 px-2">
                    {errors.last_name.message}
                  </p>
                )}

                <div className="flex gap-2 justify-center items-center">
                  <input
                    type="text"
                    disabled
                    {...register("email")}
                    className="block w-full rounded-full bg-gray-200 px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                  />

                  {user.email_verified_at && (
                    <CheckBadgeIcon className="w-8 h-8 text-green-400" />
                  )}
                </div>

                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone no"
                  autoComplete="phone"
                  className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-2 px-2">
                    {errors.phone.message}
                  </p>
                )}
                <div className="mt-6 space-y-6 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
                  {genderOption.map((gender) => (
                    <div key={gender.label} className="flex items-center">
                      <input
                        {...register("gender")}
                        value={gender.value}
                        defaultChecked={gender.label === "male"}
                        type="radio"
                        className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-red-600 checked:bg-red-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
                      />
                      <label
                        htmlFor={gender.label}
                        className="ml-3 block text-sm/6 font-medium text-gray-900"
                      >
                        {gender.value}
                      </label>
                    </div>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-1">
                  <select
                    {...register("country")}
                    defaultValue="Canada"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-full bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-red-600 sm:text-sm/6"
                  >
                    {countryOptions.map((country, index) => (
                      <option key={index} value={country.value}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  type="submit"
                  disabled={loading && true}
                  className="rounded-full bg-red-500 text-white px-6 py-2 text-sm cursor-pointer"
                >
                  {loading ? "Updating..." : "Update Profile"}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
