"use client";

import { useEffect, useState, useCallback } from "react";

import { navigationTitleSubMenu } from "@/constants/Menu";
import { useSearchParams, useParams } from "next/navigation";
import Video from "@/components/pages/video";
import Genre from "@/components/pages/genre";
import Cast from "@/components/pages/cast";
import Crew from "@/components/pages/crew";
import axios from "axios";
import Keywords from "@/components/pages/keywords";
import Country from "@/components/pages/country";
import Review from "@/components/pages/review";
import General from "@/components/pages/general";
import { TitleDetailsType } from "@/constants/Type";

function classNames(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function EditTitles() {
  const params = useParams();
  const titleId = params.id as string;
  const isNew = titleId === "new";
  const [titleDetails, setTitleDetails] = useState<TitleDetailsType | null>(null);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const active = searchParams.get("active") || "general";

  const fetchTitleDetails = useCallback(async () => {
    if (isNew) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            _id: titleId,
          },
        }
      );
      if (response.data.status) {
        console.log("Title details:", response.data.data);
        setTitleDetails(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [titleId, isNew]); // 👈 dependencies that affect the callback

  const handleSubmitted = () => {
    if (!isNew) {
      fetchTitleDetails();
    }
  };

  useEffect(() => {
    if (!isNew) {
      fetchTitleDetails();
    }
  }, [fetchTitleDetails, isNew]);

  return (
    <div className="flex gap-4">
      <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md w-4/5">
        {active === "videos" && <Video />}
        {active === "cast" && <Cast titleId={titleId} />}
        {active === "crew" && <Crew titleId={titleId} />}
        {active === "genres" && (
          <Genre
            titleId={titleId}
            data={titleDetails?.genres}
            onSubmit={handleSubmitted}
          />
        )}
        {active === "keywords" && (
          <Keywords
            titleId={titleId}
            data={titleDetails?.keywords}
            onSubmit={handleSubmitted}
          />
        )}
        {active === "countries" && (
          <Country
            titleId={titleId}
            data={titleDetails?.country ?? []}
            onSubmit={handleSubmitted}
          />
        )}
        {active === "reviews" && <Review titleId={titleId} />}
        {active === "general" && (
          <General titleId={titleId} data={titleDetails} />
        )}
      </div>
      <div className=" bg-white rounded-md w-1/5 border border-gray-200 h-full   ">
        <h2 className="bg-gray-600 text-white p-4 rounded-t-md text-sm/6 font-semibold">
          {loading ? "Edit Loading..." : "Edit"}
        </h2>
        <ul role="list" className="space-y-1">
          {navigationTitleSubMenu.map((item, index) => {
            const isDisabled = isNew && index !== 0;
            return (
              <li key={item.name}>
                <a
                  href={isDisabled ? "#" : "edit?active=" + item.href}
                  onClick={(e) => {
                    if (isDisabled) e.preventDefault();
                  }}
                  className={classNames(
                    isDisabled
                      ? "text-gray-300 cursor-not-allowed"
                      : item.href === active
                      ? "text-red-500"
                      : "text-gray-400 hover:text-gray-800",
                    `group flex gap-x-3 rounded-md px-4 py-2 text-sm/6 font-semibold`
                  )}
                  aria-disabled={isDisabled}
                >
                  {item.name}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
