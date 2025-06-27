"use client";

import { PageFormData, pageSchema } from "@/constants/Validation";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation"; // for getting query string or routing
import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "@/components/layout/Loading";

const EditorInput = dynamic(() => import("@/components/forms/EditorInput"), {
  ssr: false,
});

export default function CreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pageId = searchParams.get("id"); // edit mode if this exists

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema),
    defaultValues: {
      title: "",
      slug: "",
      body: "",
    },
  });

  // ✅ Load data if editing
  useEffect(() => {
    if (pageId) {
      const token = localStorage.getItem("token");
      setLoading(true);
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/pages?_id=${pageId}`, {
          headers: { Authorization: token },
        })
        .then((res) => {
          if (res.data?.data) {
            reset({
              title: res.data.data.data.title,
              slug: res.data.data.data.slug,
              body: res.data.data.data.body,
            });
          }
        })
        .catch(() => toast.error("Failed to load page"))
        .finally(() => setLoading(false));
    }
  }, [pageId, reset]);

  // ✅ Create or Update
  const onSubmit = async (data: PageFormData) => {
    const token = localStorage.getItem("token");
    const requestData = {
      ...data,
      type: "default",
      user_id: 1,
    };

    try {
      if (pageId) {
        // EDIT
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/page/${pageId}`,
          requestData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Page updated successfully");
      } else {
        // CREATE
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/page`,
          requestData,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Page created successfully");
        reset();
      }
      router.push("/admin/pages"); // redirect after save
    } catch (error) {
      console.log(error)
      toast.error("Failed to save page");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="w-full bg-white rounded-md shadow-xl p-8">
        <h1 className="text-xl font-bold mb-6 text-gray-800">
          {pageId ? "Edit Page" : "Add New Page"}
        </h1>
        {loading ? (
          <Loading />
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-gray-800 mb-1">Page Title</label>
              <input
                type="text"
                {...register("title")}
                className="w-full border border-gray-300 rounded-md px-4 py-2"
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title.message}</p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm/6 font-medium text-gray-900">
                Slug Name
              </label>
              <div className="mt-2 flex items-center rounded-md border px-3 py-2">
                <span className="text-gray-500 text-sm">
                  https://projectcontrolstv.com/pages/
                </span>
                <input
                  type="text"
                  {...register("slug")}
                  className="flex-1 border-0 outline-none pl-1 text-gray-900 text-sm"
                />
              </div>
              {errors.slug && (
                <p className="text-red-500 text-sm">{errors.slug.message}</p>
              )}
            </div>

            {/* Body */}
            <div>
              <Controller
                name="body"
                control={control}
                render={({ field }) => (
                  <EditorInput
                    name="body"
                    label="Body"
                    value={field.value}
                    onChange={field.onChange}
                  />
                )}
              />
              {errors.body && (
                <p className="text-red-500 text-sm">{errors.body.message}</p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 rounded-md"
              >
                {pageId ? "Update" : "Create"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 bg-gray-300 text-black font-semibold py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
