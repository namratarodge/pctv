"use client";

import { usePublicData } from "@/components/context/PublicDataContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { SettingsFormValues, TagType, TitleType } from "@/constants/Type";

import { Button } from "@headlessui/react";
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  DocumentMagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { TitlePoster, YearRange } from ".";

const MIN_YEAR = 2010;
const MAX_YEAR = 2025;

export default function BrowserInner() {
  const router = useRouter();
  const [title, setTitle] = useState([]);
  const { tvtopic, categories, masterContry } = usePublicData();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const genreParam = searchParams.get("genre");
  const limitParam = searchParams.get("limit") ?? 16;
  const pageParam = searchParams.get("page") ?? 1;
  const languageName = searchParams.get("language") ?? "";
  const keywordName = searchParams.get("keyword") ?? "";
  const countryParam = searchParams.get("country") ?? "";
  const levelParam = searchParams.get("level") ?? "";
  const releasedParam = searchParams.get("released") ?? "";
  const [selectedGenres, setSelectedGenres] = useState(
    genreParam ? genreParam.split(",") : []
  );
  const genreList = genreParam ? genreParam.split(",") : [];

  // 👇 ANY filter present in URL?
  const hasActiveFilters =
    !!genreParam ||
    !!releasedParam ||
    (!!keywordName && keywordName !== "all") ||
    !!countryParam ||
    !!languageName ||
    !!levelParam;

  const [limit, setLimit] = useState(limitParam);
  const [page, setPage] = useState(pageParam);
  const [range, setRange] = useState<[number, number]>([MIN_YEAR, MAX_YEAR]);
  const [keywords, setKeywords] = useState(keywordName);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languageName);
  const [selectedLevel, setSelectedLevel] = useState("");

  const [minYear, setMinYear] = useState<number>();
  const [maxYear, setMaxYear] = useState<number>();

  const [appRating, setAppRating] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [country, setCountry] = useState<string[]>([]);

  // Pagination metadata
  const [totalItems, setTotalItems] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const handleCheckboxChange = (name: string) => {
    let updatedGenres = [];

    if (selectedGenres.includes(name)) {
      updatedGenres = selectedGenres.filter((g) => g !== name);
    } else {
      updatedGenres = [...selectedGenres, name];
    }

    setSelectedGenres(updatedGenres);

    const query = new URLSearchParams(window.location.search);

    if (updatedGenres.length > 0) {
      query.set("genre", updatedGenres.join(","));
    } else {
      query.delete("genre");
    }

    const newQueryString = query.toString(); // automatically handles `&` placement

    router.push(`/browse?${newQueryString}`);
  };

  const handleYearRange = (year: [number, number]) => {
    setRange(year);
    const yearName = year.toString();
    const query = new URLSearchParams(window.location.search);

    query.set("released", yearName);

    const newQueryString = decodeURIComponent(query.toString());

    router.push(`/browse?${newQueryString}`);
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    setter: (value: string) => void,
    paramName: string
  ) => {
    const value = event.target.value;
    setter(value);

    const query = new URLSearchParams(window.location.search);
    query.set(paramName, value);
    const newQueryString = decodeURIComponent(query.toString());
    router.push(`/browse?${newQueryString}`);
  };

  const fetchTitlte = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const query: Record<string, string> = {};

      const allowedParams = [
        "limit",
        "page",
        "genre",
        "released",
        "keyword",
        "country",
        "language",
        "level",
        "name",
        "slug",
        "_id",
      ];
      allowedParams.forEach((key) => {
        const value = searchParams.get(key);
        if (!value) return;
        if (key === "keyword") {
          const topic = tvtopic.find(
            (t: any) => t.name.toLowerCase() === value.toLowerCase()
          );
          if (topic) {
            query[key] = topic._id; // store the topic id
          }
        } else if (key === "genre") {
          // Split multiple values by comma, trim spaces, and match category IDs
          const ids = value
            .split(",")
            .map((v) => v.trim().toLowerCase()) // normalize
            .map((v) => {
              const category = categories.find(
                (t: any) => t.name.toLowerCase() === v
              );
              return category ? category._id : null;
            })
            .filter(Boolean); // remove nulls

          if (ids.length) {
            query[key] = ids.length === 1 ? ids[0] : ids; // keep single value as string, multiple as array
          }
        } else {
          query[key] = value;
        }
      });

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titlesSearch`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            ...query,
            limit: limit,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data;
        setTitle(modifiedData.data);
        if (modifiedData.pagination) {
          setTotalItems(modifiedData.pagination.total);
          setPage(modifiedData.pagination.page.toString());
          setLimit(modifiedData.pagination.limit.toString());
          setTotalPages(modifiedData.pagination.totalPages);
        }
        // Extract pagination metadata
      } else {
        setTitle([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const clearAllFilters = () => {
    // Reset state
    setSelectedGenres([]);
    setRange([MIN_YEAR, MAX_YEAR]);
    setKeywords("");
    setSelectedCountry("");
    setSelectedLanguage("");
    setSelectedLevel("");
    setLimit(16);

    // Clear query params
    router.push("/browse");

    // Trigger API call without filters
    fetchTitlte();
  };

  const handleNextPage = () => {
    const currentPage = parseInt(page as string);
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setPage(newPage.toString());
      const query = new URLSearchParams(window.location.search);
      query.set("page", newPage.toString());
      router.push(`/browse?${query}`);
    }
  };

  const handlePreviousPage = () => {
    const currentPage = parseInt(page as string);
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setPage(newPage.toString());
      const query = new URLSearchParams(window.location.search);
      query.set("page", newPage.toString());
      router.push(`/browse?${query}`);
    }
  };

  useEffect(() => {
    const releasedParams = searchParams.get("released");

    if (releasedParams) {
      const [start, end] = releasedParams.split(",").map(Number);

      if (!isNaN(start) && !isNaN(end)) {
        setRange([start, end]);
        return;
      }
    }

    // fallback to default range
    setRange([MIN_YEAR, MAX_YEAR]);
  }, [searchParams]); // 👈 run when the query string changes

  // useEffect(() => {
  //   fetchTitlte();
  // }, [pathname,searchParams.toString()]);

  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetchTitlte();
    }, 500); // 500ms delay – adjust as needed

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [searchParams.toString()]);

  // if (loading) {
  //   return <Loading title="" />;
  // }

  // Skeleton component for title cards
  const TitleCardSkeleton = () => (
    <div className="animate-pulse">
      <div className="bg-gray-700 rounded-md h-40 w-full mb-4"></div>
      <div className="bg-gray-700 rounded h-4 w-3/4"></div>
    </div>
  );

  const fetcSettings = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/settings_api`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            name: "streaming.qualities,browse.languages,homepage.countries,browse.ageRatings,browse.year_slider_min,browse.year_slider_max",
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        // setSettings(modifiedData);

        // Find each setting by name, parse JSON value to string arrays
        const findSetting = (name: string) =>
          modifiedData.find((item: SettingsFormValues) => item.name === name);

        setAppRating(
          JSON.parse(findSetting("browse.ageRatings")?.value ?? "[]")
        );
        setLanguages(
          JSON.parse(findSetting("browse.languages")?.value ?? "[]")
        );
        setCountry(
          JSON.parse(findSetting("homepage.countries")?.value ?? "[]")
        );

        setMinYear(
          JSON.parse(findSetting("browse.year_slider_min")?.value ?? 0)
        );

        setMaxYear(
          JSON.parse(findSetting("browse.year_slider_max")?.value ?? 0)
        );
        console.log(
          JSON.parse(findSetting("browse.year_slider_max")?.value ?? 0)
        );
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetcSettings();
  }, []);

  // Skeleton loading state for right section only
  const SkeletonLoading = () => (
    <div className="w-full  py-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <TitleCardSkeleton key={i} />
        ))}
      </div>

      {/* Pagination skeleton */}
      <div className="mt-10 flex justify-between">
        <div className="bg-gray-700 rounded-full h-10 w-24"></div>
        <div className="bg-gray-700 rounded h-6 w-16"></div>
        <div className="bg-gray-700 rounded-full h-10 w-28"></div>
      </div>
    </div>
  );

  return (
    <div className="pt-18  max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <div className="w-full  md:w-1/5 sm:w-full pr-4 py-4 h-screen overflow-y-auto scrollable custom-scrollbar">
        <div className="w-full border-b border-gray-500 pb-4">
          <div className="text-gray-400">TV Topic</div>
          <div className="relative inline-block mt-4 w-full  bg-gray-800 rounded-full text-sm">
            <select
              className="block appearance-none w-full border border-gray-500 bg-gray-800 text-white   py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2"
              // onChange={handleChangeKeyword}
              value={keywords}
              onChange={(e) => handleSelectChange(e, setKeywords, "keyword")}
            >
              <option value="all">All</option>
              {tvtopic.map((data: any) => (
                <option key={data._id || data.name} value={data.name}>
                  {data.display_name} 
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="py-4 border-b border-gray-500">
          <h2 className="text-gray-400">Categories</h2>
          <div className="mt-2">
            <ul className="list-none">
              {categories.map((category: TagType) => (
                <li
                  className="text-gray-300 py-1 cursor-pointer text-sm"
                  key={category._id}
                >
                  <label className="cursor-pointer items-center flex gap-2">
                    <input
                      type="checkbox"
                      checked={genreList.includes(category.name)}
                      onChange={() => handleCheckboxChange(category.name)}
                      className="mr-1 form-checkbox accent-red-500 border border-red-400"
                    />{" "}
                    {category.display_name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto  border-b   border-gray-500">
          <h2 className="text-gray-400 py-2">Year</h2>
          <div className="px-2 ">
            <YearRange values={range} onChange={handleYearRange} />
          </div>
        </div>
        <div className="w-full border-b border-gray-500 py-6">
          <div className="text-gray-400">Select Region</div>

          <div className="relative inline-block mt-4 w-full bg-gray-800 rounded-full">
            <select
              value={selectedCountry}
              onChange={(e) =>
                handleSelectChange(e, setSelectedCountry, "country")
              }
              className="text-sm block appearance-none w-full border border-gray-500 bg-gray-800 text-white  py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 "
            >
              <option value="">Select Country</option>
              {masterContry.map((row: TagType) => (
                <option key={row._id} value={row._id}>
                  {row.display_name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full border-b border-gray-500 py-6">
          <div className="text-gray-400">Language</div>

          <div className="relative inline-block mt-4 w-full bg-gray-800 rounded-full text-sm">
            <select
              value={selectedLanguage}
              onChange={(e) =>
                handleSelectChange(e, setSelectedLanguage, "language")
              }
              className="block appearance-none w-full border border-gray-500  bg-gray-800 text-white  py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 "
            >
              <option value="">Select Language</option>
              {languages.map((language) => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="w-full py-6">
          <div className="text-gray-400">Levels</div>
          <div className="relative inline-block mt-4 w-full bg-gray-800 rounded-full text-sm">
            <select
              value={selectedLevel}
              onChange={(e) => handleSelectChange(e, setSelectedLevel, "level")}
              className="block appearance-none w-full border border-gray-500 bg-gray-800 text-white   py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 "
            >
              <option value="">Select Level</option>
              {appRating.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-red-600">
              <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                <path d="M5.516 7.548a.75.75 0 011.06 0L10 10.97l3.424-3.423a.75.75 0 111.06 1.06l-4 4a.75.75 0 01-1.06 0l-4-4a.75.75 0 010-1.06z" />
              </svg>
            </div>
          </div>
        </div>
        {hasActiveFilters && (
          <div>
            <button
              onClick={clearAllFilters}
              className="cursor-pointer w-full mt-4 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
            >
              Reset Filter
            </button>
          </div>
        )}
      </div>
      <div className="w-full  lg:w-4/5 px-2 py-2 ">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex gap-4 items-center ">
            <h1 className="text-3xl text-white">TV Topics</h1>
            {hasActiveFilters && (
              <Button
                onClick={clearAllFilters}
                className="flex px-3 py-1.5  text-sm rounded-full bg-gray-700 text-gray-400 items-center cursor-pointer"
              >
                Reset Filter
                <XMarkIcon className="w-6 h-6 cursor-pointer text-red-400" />
              </Button>
            )}
          </div>
        </div>
        {loading ? (
          <SkeletonLoading />
        ) : title.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-2 gap-y-6 ">
              {title.map((title: TitleType) => (
                <div className=" text-white gap-2 " key={title._id}>
                  <Link href={`/titles/${title?._id}/${title?.slug}`}>
                    <TitlePoster poster={title.poster} name={title.name} />
                    <div className="mt-0">
                      <span className="text-xs">
                        {title?.name.slice(0, 34)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            {title.length > 9 && (
              <div className="mt-10 flex justify-between items-center">
                <button
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
                    parseInt(page as string) <= 1
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                  }`}
                  onClick={() => handlePreviousPage()}
                  disabled={parseInt(page as string) <= 1}
                >
                  <ChevronDoubleLeftIcon className="w-5 h-5" />
                  Previous
                </button>

                <div className="text-center">
                  <div className="text-white text-sm">
                    Page {page} of {totalPages}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">
                    Showing {title.length} of {totalItems} results
                  </div>
                </div>

                <button
                  className={`flex items-center gap-2 px-5 py-2 rounded-full transition ${
                    parseInt(page as string) >= totalPages
                      ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                  }`}
                  onClick={() => handleNextPage()}
                  disabled={parseInt(page as string) >= totalPages}
                >
                  Next Page
                  <ChevronDoubleRightIcon className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center p-6 text-gray-400  h-100 w-full">
            <DocumentMagnifyingGlassIcon className="w-20 h-20 mb-2" />
            <p className="text-2xl font-medium">Nothing To Display</p>
            <p className="text-xl text-gray-500 mt-4">
              Try adjusting your filters or check back later.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
