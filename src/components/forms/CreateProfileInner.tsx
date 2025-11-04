"use client";
import { CreateUserFormData, EditUserFormData, createUserSchema, editUserSchema } from "@/constants/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function CreateProfile() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // check for ID in query param

  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<EditUserFormData | CreateUserFormData>({
    resolver: zodResolver(isEditMode ? editUserSchema : createUserSchema),
  });
  // Fetch user details if in edit mode
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (id) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/users?_id=${id}`, {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const user = res.data.data.data;
          setValue("first_name", user.first_name);
          setValue("last_name", user.last_name);
          setValue("email", user.email);
          // setValue("email_confirmed", user.email_confirmed ? "yes" : "no");
          setValue("userType", user.userType);
        })
        .catch(() => {
          toast.error("Failed to fetch user details.");
        });
    }
  }, [id, setValue]);



  const onSubmit = async (data: CreateUserFormData | EditUserFormData) => {
    const token = localStorage.getItem("token");
  
    try {
      const url = id
        ? `${process.env.NEXT_PUBLIC_API_URL}/user/${id}` // Adjust to match your API route
        : `${process.env.NEXT_PUBLIC_API_URL}/user`;
  
      const method = id ? "put" : "post"; // use PATCH or PUT if that's what your API expects
  
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
        toast.success(id ? "User updated successfully." : "User created successfully.");
        if (!id) reset(); // reset only on create
      }
    } catch (error : string | any) { 
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Failed to create user.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <div className="flex gap-2">
          <h1 className="text-xl font-bold mb-6  text-gray-800">
            {id ? "Edit Users" : "Add User"}
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
                // disabled={!!id} // Disable if editing existing user
                autoComplete="email"
                name="email"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>

            {!id && (
              <div>
                <label className="block text-gray-600 mb-1">
                  Email Confirmed
                </label>
                <select
                  disabled={!!id} // Disable if editing existing user
                  {...register("email_confirmed")}
                  className="col-start-1 row-start-1 w-2/6 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                >
                  <option value="yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.email_confirmed && (
                  <p className="text-red-500">
                    {errors.email_confirmed.message}
                  </p>
                )}
              </div>
            )}

            <div>
              <label className="block text-gray-600 mb-1">Password</label>
              <input
                type="text"
                {...register("password")}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <small>Password must be at least 6 characters</small>
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
                  <input type="radio" {...register("userType")} value={g} />
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </label>
              ))}
            </div>

            {errors.userType && (
              <p className="text-red-500">{errors.userType.message}</p>
            )}
          </div>

       

          <button
            type="submit"
            className="w-50 bg-red-400 hover:bg-red-500 text-white font-semibold py-3 rounded-md transition-all cursor-pointer"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
