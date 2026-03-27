"use client";

import HomeCharts from "@/components/forms/HomeChart";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

type SliderType = {
  title: string;
  name: string;
  poster: string;
  _id: string;
  slug: string;
};

type StatItemRaw = {
  name: string;
  stat: number;
  previousStat: number;
  change: number;
  changeType: "increase" | "decrease";
};

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/home`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data;
        setLoading(false);
        setData(modifiedData);
      }
    } catch (error) {
      console.log(error);
      toast("Error fetching data:");
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="p-4">
      <h3 className="text-base font-semibold text-gray-900">
        Welcome, ADMIN Back!
      </h3>
      <dl className="mt-5 grid grid-cols-1 gap-1 divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow-sm md:grid-cols-5 md:divide-x md:divide-y-0">
        {data.map((item: StatItemRaw) => (
          <div key={item.name} className="px-2 py-2 sm:p-5">
            <dt className="text-base font-normal text-gray-900">{item.name}</dt>
            <dd className="mt-1 flex items-baseline justify-between md:block lg:flex">
              <div className="flex items-baseline text-xl font-semibold text-red-600">
                {item.stat}
                {/* <span className="ml-2 text-xs font-medium text-gray-500">
                  from {item.previousStat}
                </span> */}
              </div>

              <div
                className={classNames(
                  item.changeType === "increase"
                    ? "bg-green-100 text-green-800"
                    : "bg-red-100 text-red-800",
                  "inline-flex items-baseline rounded-full px-2 py-0.5 text-sm font-medium md:mt-2 lg:mt-0"
                )}
              >
                {item.changeType === "increase" ? (
                  <ArrowUpIcon
                    aria-hidden="true"
                    className="mr-0.5 -ml-1 size-5 shrink-0 self-center text-green-500"
                  />
                ) : (
                  <ArrowDownIcon
                    aria-hidden="true"
                    className="mr-0.5 -ml-1 size-5 shrink-0 self-center text-red-500"
                  />
                )}

                <span className="sr-only">
                  {" "}
                  {item.changeType === "increase"
                    ? "Increased"
                    : "Decreased"}{" "}
                  by{" "}
                </span>
                {item.change}
              </div>
            </dd>
          </div>
        ))}
      </dl>
      <div className="mt-4">
        <HomeCharts />
      </div>
    </div>
  );
}
