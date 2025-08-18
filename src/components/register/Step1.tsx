"use client";
import { UserSignUpFormData, userSignUpSchema } from "@/constants/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function Step1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSignUpFormData>({
    resolver: zodResolver(userSignUpSchema),
  });

  // ✅ Create or Update
  const onSubmit = async (data: UserSignUpFormData) => {
    const token = localStorage.getItem("token");
    const requestData = {
      ...data,
      cpassword: data.password,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
        requestData,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      const responseNew = response.data;
      console.log(responseNew);
      if (responseNew.status) {
        localStorage.setItem("token", responseNew.data.token);
        toast.success("User created successfully");
        window.location.href = "/register?step=two";
      } else {
        toast.error(responseNew?.message?.message);
      }
    } catch (error: any) {
      const message =
        error.response?.data?.errors?.[0] || "Error during signup";
      toast.error(message);
    }
  };

  return (
    <div className=" px-6 py-12  sm:rounded-lg sm:px-12">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <small className="text-sm font-extralight">Step 1 OF 3</small>
        <h2 className="mt-3 text-left text-5xl font-bold tracking-tight text-gray-800">
          Welcome to PCTV! <br />
          Create Your Digital Key
        </h2>
        <p className=" text-sm">
          Set your email & password - light the fuse on your learning journey
        </p>
        <div className="w-full space-y-4 md:w-3/5 lg:w-3/5 ">
          <div>
            <input
              type="text"
              {...register("email")}
              placeholder="Your email"
              autoComplete="email"
              className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2 px-2">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className=" flex gap-4">
            <div className="w-1/2">
              <input
                type="text"
                {...register("first_name")}
                placeholder="First Name"
                autoComplete="first_name"
                className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
              />
              {errors.first_name && (
                <p className="text-red-500 text-sm mt-2 px-2">
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
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
            </div>
          </div>
          <div>
            <input
              type="text"
              {...register("phone")}
              placeholder="Contact Number"
              autoComplete="phone"
              className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-2 px-2">
                {errors.phone.message}
              </p>
            )}
          </div>
          <div>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your password"
              autoComplete="password"
              className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2 px-2">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="cursor-pointer flex w-30 justify-center rounded-full bg-[#f44336] px-3 py-2 text-sm/6 font-semibold text-white shadow-xs hover:bg-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
          >
            Get Started
          </button>
        </div>
      </form>
    </div>
  );
}
