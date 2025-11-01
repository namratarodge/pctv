"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type Page = {
  body: string;
  title : string;
};

export default function Pages() {
  const params = useParams();
  const slug = params?.slug as string;
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<Page | null>(null);
  const fetchListData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/pages`,
        {
          headers: {
            Authorization: token,
          },
          params: {
            slug: slug,
          },
        }
      );
      console.log("response", response);
      const listData = response.data?.data.data;
      if (listData) {
        setPage(listData);
        setLoading(false);
      }
    } catch (error) {
      // window.location.href = "/lists";
      console.error("Error loading list:", error);
      setLoading(false);
    }
  };

  // Add this in your component
  useEffect(() => {
    fetchListData();
  }, []);

  return (
    <div className="pt-30  max-w-11/12 mx-auto  lg:flex-row mb-10">
      <h1 className="text-3xl">{page?.title}</h1>
      <div className="mt-10">
        <div dangerouslySetInnerHTML={{ __html: page?.body ?? '' }} />
      </div>
    </div>
  );
}
