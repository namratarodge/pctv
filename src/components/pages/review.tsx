"use client";

import { DataTable } from "@/components/forms";
import Loading from "@/components/layout/Loading";
import { reviewColumn } from "@/constants/DataTableColumn";
import { ReviewType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import { TrashIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Review({ titleId }: { titleId: string }) {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/reviews?reviewable_id=${titleId}`,
          {
            headers: {
              Authorization: token,
              "Content-Type": "application/json",
            },
            params: {
              limit: 1000,
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
          setReview(modifiedData);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Always stop loading, whether success or failure
      }
    };

    fetch();
  }, [titleId]);

  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Review</h1>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto ">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={reviewColumn}
              data={review || []}
              renderActions={() => (
                <div className="flex gap-3 justify-end">
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
                    <TrashIcon className="text-gray-700 w-5 h-5"/>
                  </button>
                </div>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
}
