"use client";
import {
  AutoCompeleteListUser,
  Filter,
  ModelForm,
  Paginations,
} from "@/components/forms";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import { Error, LoadingForm } from "@/components/layout";
import { SubscriptionsFilter } from "@/constants/Filter";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useCallback, useEffect, useState } from "react";

import { SubscriptionsColumn } from "@/constants/DataTableColumn";
import { formatNormal } from "@/utils/common";
import axios from "axios";

import Loading from "@/components/layout/Loading";
import {
  SubscriptionEditFormValue,
  SubscriptionFormValue,
  SubscriptionPlanType,
  SubscriptionType,
  UserTagForUser,
  UserType,
} from "@/constants/Type";
import { parseQueryString } from "@/utils/helper";
import { Button } from "@headlessui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useDebounce } from "use-debounce";

type RawUser = {
  _id: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  username?: string;
  avatar?: string;
  poster?: string;
  known_for?: string;
  // ...whatever your API returns
};

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingForm, setLoadingForm] = useState(false);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [filterQuery, setFilterQuery] = useState("");
  const [debouncedFilterQuery] = useDebounce(filterQuery, 1000); // 1 seconds delay

  const [pages, setPages] = useState(1);
  const [limits, setLimits] = useState(10);
  const [plans, setPlans] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SubscriptionFormValue>();

  const watchPlanId = watch("plan_id");
  const watchStart = watch("renews_at"); // "Starting At"

  // helper: yyyy-mm-dd
  const toYMD = (d: Date) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
      d.getDate()
    ).padStart(2, "0")}`;

  // helper: add days
  const addDays = (date: Date, days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
  };

  const fetch = useCallback(async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const filterParams = parseQueryString(debouncedFilterQuery);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/subscriptions`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            limit: limits,
            page: pages,
            ...filterParams,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map(
          (item: SubscriptionType) => ({
            ...item,
            ends_at: `${formatNormal(item.ends_at)} `,
            renews_at: `${formatNormal(item.renews_at)} `,
            created_at: `${formatNormal(item.created_at)} `,
          })
        );
        setData(modifiedData);
        setPagination(response.data.data.pagination);
      } else {
        setData([]);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  }, [limits, pages, debouncedFilterQuery]);

  const handleFormSubmit: SubmitHandler<SubscriptionFormValue> = async (
    form
  ) => {
    const token = localStorage.getItem("token");
    const payload = {
      // server-needed fields only
      user_id: form.person_id?._id ?? form.person_id?.id, // tolerate both
      plan_id: form.plan_id,
      description: form.description,
      renews_at: form.renews_at, // YYYY-MM-DD from input
      ends_at: form.ends_at,
    };

    if (!payload.user_id) {
      toast.error("Please select a user");
      return;
    }
    if (!payload.plan_id) {
      toast.error("Please select a plan");
      return;
    }

    try {
      const url = isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/subscription/${editingId}`
        : `${process.env.NEXT_PUBLIC_API_URL}/subscription`;

      const method = isEditing ? "put" : "post";

      const { data } = await axios({
        url,
        method,
        data: payload,
        headers: { Authorization: token, "Content-Type": "application/json" },
      });

      if (data.status) {
        toast.success(
          `Subscriptions ${isEditing ? "updated" : "created"} successfully`
        );
        setIsModalOpen(false);
        fetch();
        reset();
        setIsEditing(false);
        setEditingId(null);
      } else {
        toast.error(data.message || "Failed to save subscription");
      }
    } catch (err: any) {
      // Optional: special-case duplicate/existing subscription from API
      if (err?.response?.status === 409) {
        toast.info(
          err.response.data?.message ??
            "Subscription already exists. Updated instead."
        );
      } else {
        console.error(err);
        toast.error("Error creating plan");
      }
    }
  };
  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  const addSubscriptions = () => {
    reset({
      user_id: "",
      plan_id: "",
      description: "",
      renews_at: "",
      ends_at: "",
    });
    setIsEditing(false);
    setEditingId(null);
    setIsModalOpen(true);
  };

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
        const modifiedData = response.data.data.data.map(
          (item: SubscriptionPlanType) => ({
            ...item,
            amount: `${item.currency} ${item.amount}`,
          })
        );
        setPlans(modifiedData);
      }
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("token");

    try {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/subscription/${id}`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        toast("Subscription deleted successfully");
        fetch(); // Refresh the plans list
      } else {
        toast("Delete failed:", response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast("Error deleting plan:");
    }
  };

  const handleEdit = async (data: SubscriptionEditFormValue) => {
    console.log(data);
    setLoadingForm(true);
    setIsEditing(true);
    setEditingId(data._id ?? null);
    setIsModalOpen(true);
    let raw: RawUser | null = null;
    if (data.user_id._id) {
      raw = await fetchUserById(data.user_id._id); // RawUser | null
    }
    console.log(raw);
    // Populate form with existing data
    reset({
      person_id: raw ?? null,
      plan_id: data.plan_id._id,
      description: data.description,
      renews_at: formatNormal(data.renews_at),
      ends_at: formatNormal(data.ends_at),
    });
    setLoadingForm(false);
  };

  const fetchUserById = async (id: string): Promise<UserType | null> => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/users`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            _id: id,
          },
        }
      );

      const responseData = response.data;

      if (!responseData?.status) return null;
      // unwrap safely depending on your API shape
      // try data.data or data if needed
      return response.data.data?.data ?? response.data.data ?? null;
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
    return null;
  };

  useEffect(() => {
    fetchGetPlans();
    fetch();
  }, [fetch]);

  useEffect(() => {
    // need both a plan and a start date to compute
    if (!watchPlanId || !watchStart) return;

    // find the selected plan
    const plan = plans.find((p: SubscriptionPlanType) => p._id === watchPlanId);
    if (!plan) return;

    const start = new Date(watchStart);
    if (isNaN(start.getTime())) return;

    // OPTION A: exactly 30 days for monthly and 365 for yearly (as you asked)
    const days = plan.interval === "month" ? 30 : 365;
    const end = addDays(start, days);

    setValue("ends_at", toYMD(end), {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [watchPlanId, watchStart, plans, setValue]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Subscription</h1>
      <div className="sm:flex  mt-4  h-auto justify-between gap-4 ">
        <Filter
          filterType={SubscriptionsFilter}
          onQueryChange={setFilterQuery}
        />
        <div className="mt-4 sm:mt-0 sm:flex-none ">
          <Button
            type="button"
            onClick={() => addSubscriptions()}
            className=" cursor-pointer flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Subscription
          </Button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          {loading ? (
            <Loading />
          ) : (
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <AdvanceDataTable
                columns={SubscriptionsColumn}
                data={data}
                renderActions={(person: SubscriptionEditFormValue) => (
                  <div className="flex gap-3 justify-end">
                    <button
                      onClick={() => handleEdit(person)}
                      className="text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(person._id)}
                      className="text-red-600 hover:text-red-800 cursor-pointer"
                    >
                      <TrashIcon className="w-5 h-5" />
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
          )}
        </div>
      </div>
      <ModelForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? "Edit Subscription" : "Create a New Subscription"}
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        {loadingForm ? (
          <LoadingForm />
        ) : (
          <>
            <div>
              <label className="font-semibold pb-2  text-gray-600">User</label>
              <Controller
                name="person_id"
                control={control}
                rules={{ required: "Person is required" }}
                render={({ field }) => (
                  <AutoCompeleteListUser
                    value={field.value as UserTagForUser | null}
                    onSelect={(user: UserTagForUser) => {
                      field.onChange(user);
                    }}
                  />
                )}
              />
              {errors.person_id && <Error message={errors.person_id.message} />}
            </div>
            <div className="flex flex-col">
              <label className="mb-1 text-gray-800"> Plan</label>

              <select
                {...register("plan_id", { required: "Plan is required" })}
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              >
                <option value="">Select a plan</option>
                {plans.map((item: SubscriptionPlanType) => {
                  return (
                    <option key={item.id} value={item._id}>
                      {item.name} {item.amount}
                    </option>
                  );
                })}
              </select>
              {errors.plan_id && (
                <p className="text-red-500">{errors.plan_id.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-800"> Description</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-800"> Starting At</label>
              <input
                type="date"
                {...register("renews_at")}
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              />
              {errors.renews_at && (
                <p className="text-red-500">{errors.renews_at.message}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label className="mb-1 text-gray-800"> Ends At</label>
              <input
                type="date"
                {...register("ends_at", {
                  required: "Ends At is required",
                })}
                readOnly
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              />
              {errors.ends_at && (
                <p className="text-red-500">{errors.ends_at.message}</p>
              )}
            </div>
          </>
        )}
      </ModelForm>
    </div>
  );
}
