import {
  UserChangePasswordFormData,
  userChangePasswordSchema,
} from "@/constants/Validation";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function changePassword() {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UserChangePasswordFormData>({
    resolver: zodResolver(userChangePasswordSchema),
  });

  // ✅ Create or Update
  const onSubmit = async (data: UserChangePasswordFormData) => {
    const token = localStorage.getItem("token");
    console.log(data)
    try { 
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/change_password`,
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
        localStorage.setItem("token", responseNew.data.token);
        toast.success("Password change successfully");
        window.location.href = "/login";
      }
    } catch (error) {
      toast("Error during login:" + error);
    }
  };

  return (
    <>
      <div className="h-100 text-black">
        <h1 className="text-4xl font-semibold">Change Password</h1>
        <p className="my-4">Account Details</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-gray-100 mt-4 py-6 px-6 rounded-sm">
            <h3 className="text-sm">Update Password</h3>
            <small>
              Protect your account with a unique at least 6 charachters long
            </small>
            <div className="mt-4 w-2/3 space-y-3">
              <input
                type="text"
                {...register("old_password")}
                placeholder="Old Password"
                autoComplete="old_password"
                className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
              />
              {errors.old_password && (
                <p className="text-red-500 text-sm mt-2 px-2">
                  {errors.old_password.message}
                </p>
              )}
              <input
                type="text"
                {...register("new_password")}
                placeholder="New Password"
                autoComplete="new_password"
                className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
              />
              {errors.new_password && (
                <p className="text-red-500 text-sm mt-2 px-2">
                  {errors.new_password.message}
                </p>
              )}
              <input
                type="text"
                {...register("new_enter_password")}
                placeholder="New Enter Password"
                autoComplete="new_enter_password"
                className="block w-full rounded-full bg-white px-4 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-red-400 sm:text-sm/6"
              />
              {errors.new_enter_password && (
                <p className="text-red-500 text-sm mt-2 px-2">
                  {errors.new_enter_password.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            <button className="rounded-full bg-red-500 text-white px-6 py-1.5 mt-4 text-sm cursor-pointer">
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
