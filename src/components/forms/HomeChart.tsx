// app/dashboard/Charts.tsx
"use client";

import { TitleColumn } from "@/constants/DataTableColumn";
import { TitleDetailsType } from "@/constants/Type";
import { formatDate } from "@/utils/common";
import axios from "axios";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";
import Loading from "../layout/LoadingForm";
import DataTable from "./DataTable";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function HomeCharts() {
  const [topTitle, setTopTitle] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLatest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles/most-views`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 10,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.map(
          (item: TitleDetailsType) => ({
            ...item,
            updated_at: `${formatDate(item.updated_at)} `,
          })
        );
        console.log(modifiedData);

        setLoading(false);
        setTopTitle(modifiedData);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "Content Created",
        data: [20, 40, 65, 80, 95],
        borderColor: "#3b82f6",
        fill: false,
      },
    ],
  };

  const barData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    datasets: [
      {
        label: "New Users",
        data: [50, 70, 100, 120, 150],
        backgroundColor: "#10b981",
      },
    ],
  };
  useEffect(() => {
    fetchLatest();
  }, []);

  return (
    <section className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
      <h1 className="font-semibold mt-5">Most View Titles</h1>
      {loading ? (
        <Loading />
      ) : (
        <DataTable
          columns={TitleColumn}
          data={topTitle}
        />
      )}
      {/* <div className="bg-white p-4 rounded-md shadow">
        <h2 className="text-xl font-bold mb-4">User Registrations</h2>
        <Bar data={barData} />
      </div> */}
    </section>
  );
}
