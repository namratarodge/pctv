"use client";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { DataTable, ModelForm } from "@/components/forms";
import { useEffect, useState } from "react";
import { formatDate } from "@/utils/common";
import axios from "axios";
import Loading from "@/components/layout/Loading";
import { CategoriesColumn } from "@/constants/DataTableColumn";
import { useForm } from "react-hook-form";
import currencies from "@/constants/currencies.json"; // adjust path as needed
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

type FormValues = {
  name: string;
  amount: number;
  currency: string;
  interval: string;
  interval_count: number;
};

export default function Genre() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  const currencyDetails = currencies[selectedCurrency];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

 

  const handleFormSubmit = async (data: Record<string, string>) => {
    const selectedCurrencyCode = data.currency;
    const currencyInfo = currencies[selectedCurrencyCode];

    const payload = {
      ...data,
      currency_symbol: currencyInfo?.symbol || "",
      uuid: uuidv4(),
    };

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/billing-plan`,
        payload,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Plan created successfully:", response.data);
        setIsModalOpen(false); // Close modal
        fetchGetPlans(); // Refresh list
        reset();
      } else {
        toast("Plan creation failed:", response.data.message);
      }
    } catch (error) {
      toast("Error creating plan:", error);
    }
  };

 
  useEffect(() => {
  }, []);

  return (
    <div className=" bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Cast</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Cast
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={CategoriesColumn}
              data={plans}
              renderActions={(person) => (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => console.log("Edit", person)}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            />
          )}
            <ModelForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Add New Cast"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col">
              <label className="mb-1 text-gray-800">Plan Name</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-800">Character</label>
              <input
                {...register("name", { required: "Name is required" })}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>

            
          </ModelForm>
        </div>
      </div>
    </div>
  );
}
