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
import { planColumn } from "@/constants/DataTableColumn";
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


 type SubscriptionPlan = {
  _id: string;
  id: string;
  name: string;
  amount: string;
  currency: string;
  currency_symbol: string;
  interval: string;
  interval_count: string;
  parent_id: string | null;
  legacy_permissions: string | null;
  uuid: string;
  paypal_id: string | null;
  recommended: boolean;
  free: boolean;
  show_permissions: boolean;
  features: string[]; // cleaned below
  position: string;
  created_at: string;
  updated_at: string;
  available_space: string | null;
  hidden: boolean;
};

export default function Plans() {
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
  const [loading, setLoading] = useState(true);

  const fetchGetPlans = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/billing-plans`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map((item: SubscriptionPlan) => ({
          ...item,
          amount: `${item.currency} ${item.amount}`,
          updated_at: `${formatDate(item.updated_at)} `,
        }));

        setLoading(false);
        setPlans(modifiedData);
      }
    } catch (error) {
      toast("Error fetching data:",error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

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

  const handleDeletePlan = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/billing-plan/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Plan deleted successfully");
        fetchGetPlans(); // Refresh the plans list
      } else {
        toast("Delete failed:", response.data.message);
      }
    } catch (error) {
      toast("Error deleting plan:", error);
    }
  };

  useEffect(() => {
    fetchGetPlans();
  }, []);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">
            Subscription Plans
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Your team is on the{" "}
            <strong className="font-semibold text-gray-900">Startup</strong>{" "}
            plan. The next payment of $80 will be due on August 4, 2022.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 rounded-md bg-red-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Plan
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <DataTable
              columns={planColumn}
              data={plans}
              renderActions={(person) => (
                <div className="flex gap-3 justify-end">
                  <button
                    onClick={() => console.log("Edit", person)}
                    className="text-gray-600 hover:text-gray-800 cursor-pointer"
                  >
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePlan(person._id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            />
          )}
          <ModelForm
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Create a New Plan"
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
              <label className="mb-1 text-gray-800">Currency</label>
              <select
                {...register("currency", { required: "currency is required" })}
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                {Object.entries(currencies).map(([code, details]) => (
                  <option key={code} value={code}>
                    {details.name} ({code}):
                    {details.symbol} - {details.name_plural}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-800">Amount</label>
              <div className="flex items-center rounded-md bg-white px-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6">
                  {currencyDetails.symbol}
                </div>
                <input
                  {...register("amount", { required: "amount is required" })}
                  type="number"
                  placeholder="0.00"
                  min={0}
                  max={9999}
                  aria-describedby="price-currency"
                  className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                />
                <div
                  id="price-currency"
                  className="shrink-0 text-base text-gray-500 select-none sm:text-sm/6"
                >
                  {selectedCurrency}
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-800">Interval</label>
              <select
                {...register("interval", { required: "interval is required" })}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="day">Day</option>
                <option value="Week">Week</option>
                <option value="Month">Month</option>
                <option value="Year">Year</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-800">Interval Count</label>
              <input
                {...register("interval_count", {
                  required: "interval Count is required",
                })}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              />
              {errors.interval_count && (
                <p className="text-red-500">{errors.interval_count.message}</p>
              )}
            </div>
          </ModelForm>
        </div>
      </div>
    </div>
  );
}
