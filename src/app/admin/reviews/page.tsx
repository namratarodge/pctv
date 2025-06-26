"use client";
import {
  Filter,
  Paginations,
  ModelForm,
  TenStarRating,
} from "@/components/forms";
import { ReviewfilterType } from "@/constants/Filter";
import { useEffect, useState } from "react";
import axios from "axios";
import { PencilIcon } from "@heroicons/react/24/outline";
import { formatDate } from "@/utils/common";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import { reviewColumn } from "@/constants/DataTableColumn";
import Loading from "@/components/layout/Loading";
import { toast } from "react-toastify";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ReviewType, reviewFormType } from "@/constants/Type";

export default function People() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [review, setReview] = useState<ReviewType | null>(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: {},
  } = useForm<reviewFormType>();

  const [pages, setPages] = useState(1);
  const [limits, setLimits] = useState(10);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            limit: limits,
            page: pages,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map(
          (item: ReviewType) => ({
            ...item,
            updated_at: `${formatDate(item.updated_at)} `,
          })
        );
        setData(modifiedData);
        setPagination(response.data.data.pagination);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const handleFormSubmit: SubmitHandler<reviewFormType> = async (data) => {
    const token = localStorage.getItem("token");
    const reviewID = review?._id;

    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/review/${reviewID}`;

      const method = "put";

      const response = await axios({
        url,
        method,
        data,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      });

      if (response.data.status) {
        toast.success(`Review updated successfully`);
        setIsModalOpen(false); // Close modal
        fetch(); // Refresh list
        reset();
      } else {
        toast("Review Update failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error Update review:");
    }
  };

  const handleEdit = async (data: ReviewType) => {
    setIsModalOpen(true);
    setReview(data);
  };

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            params: {
              limit: limits,
              page: pages,
            },
          }
        );
        if (response.data.status) {
          const modifiedData = response.data.data.data.map(
            (item: ReviewType) => ({
              ...item,
              updated_at: `${formatDate(item.updated_at)} `,
            })
          );
          setData(modifiedData);
          setPagination(response.data.data.pagination);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Always stop loading, whether success or failure
      }
    };

    fetch();
  }, [pages, limits]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Review</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4  h-auto ">
            <Filter filterType={ReviewfilterType} />
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <AdvanceDataTable
                  columns={reviewColumn}
                  data={data}
                  renderActions={(person) => (
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => handleEdit(person)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                />

                <Paginations
                  pagination={pagination}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </div>
            </div>
          </div>
        </>
      )}
      <ModelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Edit Review"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="flex flex-col">
          <label className="mb-1 text-gray-800"> Score</label>
          <Controller
            name="score"
            control={control}
            defaultValue={review?.score}
            rules={{ required: "Score is required" }}
            render={({ field, fieldState }) => (
              <>
                <TenStarRating score={field.value} onRate={field.onChange} />
                {fieldState.error && (
                  <span className="text-red-500 text-sm">
                    {fieldState.error.message}
                  </span>
                )}
              </>
            )}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 text-gray-800"> Review</label>
          <textarea
            {...register("review", {
              required: "review is required",
            })}
            className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
          />
        </div>
      </ModelForm>
    </div>
  );
}
