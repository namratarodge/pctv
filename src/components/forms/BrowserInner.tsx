"use client";

import { usePublicData } from "@/components/context/PublicDataContext";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

import { TagType, TitleType, TvTopicType } from "@/constants/Type";

import { countryOptions } from "@/constants/Main";

const Language = [
  { value: "English", name: "English" },
  { value: "Spanish", name: "Spanish" },
  { value: "French", name: "French" },
  { value: "German", name: "German" },
  { value: "Hindi", name: "Hindi" },
];

const Levels = [
  { value: "beginner", name: "Beginner" },
  { value: "intermediate", name: "Intermediate" },
  { value: "expert", name: "Expert" },
];

import Loading from "@/components/layout/Loading";
import { Button } from "@headlessui/react";
import {
  ChevronDownIcon,
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
  const { tvtopic, categories } = usePublicData();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();

  const genreParam = searchParams.get("genre");
  const limitParam = searchParams.get("limit") ?? 16;
  const languageName = searchParams.get("language") ?? "";
  const keywordName = searchParams.get("keyword") ?? "";
  const [selectedGenres, setSelectedGenres] = useState(
    genreParam ? genreParam.split(",") : []
  );
  const genreList = genreParam ? genreParam.split(",") : [];

  const [limit, setLimit] = useState(limitParam);
  const [range, setRange] = useState<[number, number]>([MIN_YEAR, MAX_YEAR]);
  const [keywords, setKeywords] = useState(keywordName);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState(languageName);
  const [selectedLevel, setSelectedLevel] = useState("");

  const handleMore = () => {
    const newLimit = (limit as number) + 4;
    setLimit(newLimit);
    console.log(newLimit);
    const query = new URLSearchParams(window.location.search);

    if (newLimit >= 20) {
      query.set("limit", newLimit.toString());
    } else {
      query.delete("limit");
    }

    router.push(`/browse?${query}`);
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    const params = new URLSearchParams(window.location.search);
    if (selectedValue === "all") {
      params.delete("keyword");
    } else {
      params.set("keyword", selectedValue);
    }
    router.push(`/browse?${params.toString()}`);
  };

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
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
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
        const modifiedData = response.data.data.data;
        setTitle(modifiedData);
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

  if (loading) {
    return <Loading title="" />;
  }

  return (
    <div className="pt-18  max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <div className="w-full  md:w-1/5 sm:w-full px-2 py-4 overflow-auto lg:h-auto h-screen ">
        <div className="w-full border-b border-gray-500 pb-4">
          <div className="text-gray-300 text-lg">TV Topic</div>
          <div className="relative inline-block mt-4 w-full  bg-gray-800 rounded-full text-sm">
            <select
              className="block appearance-none w-full border border-gray-500 bg-gray-800 text-white   py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2"
              // onChange={handleChangeKeyword}
              value={keywords}
              onChange={(e) => handleSelectChange(e, setKeywords, "keyword")}
            >
              <option value="all">All</option>
              {tvtopic.map((data: TvTopicType, index: number) => (
                <option key={index} value={data.name}>
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
                  <label className="cursor-pointer">
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
          <div className="text-gray-300">Select Region</div>
          <div className="relative inline-block mt-4 w-full bg-gray-800 rounded-full">
            <select
              value={selectedCountry}
              onChange={(e) =>
                handleSelectChange(e, setSelectedCountry, "country")
              }
              className="text-sm block appearance-none w-full border border-gray-500 bg-gray-800 text-white  py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 "
            >
              {countryOptions.map((country, index) => (
                <option key={index} value={country.value}>
                  {country.name}
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
          <div className="text-gray-300">Language</div>
          <div className="relative inline-block mt-4 w-full bg-gray-800 rounded-full text-sm">
            <select
              value={selectedLanguage}
              onChange={(e) =>
                handleSelectChange(e, setSelectedLanguage, "language")
              }
              className="block appearance-none w-full border border-gray-500  bg-gray-800 text-white  py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 "
            >
              <option>Select Language</option>
              {Language.map((language) => (
                <option key={language.value} value={language.value}>
                  {language.name}
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
          <div className="text-gray-300">Levels</div>
          <div className="relative inline-block mt-4 w-full bg-gray-800 rounded-full text-sm">
            <select
              value={selectedLevel}
              onChange={(e) => handleSelectChange(e, setSelectedLevel, "level")}
              className="block appearance-none w-full border border-gray-500 bg-gray-800 text-white   py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 "
            >
              {Levels.map((level) => (
                <option key={level.name} value={level.value}>
                  {level.name}
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

        <div>
          <button
            onClick={clearAllFilters}
            className="cursor-pointer w-full mt-4 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
          >
            Reset Filter
          </button>
        </div>
      </div>
      <div className="w-full  lg:w-4/5 px-4 py-2 ">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex gap-4 items-center ">
            <h1 className="text-3xl text-white">PCE Brazil</h1>
            {selectedGenres.length > 0 && (
              <Button
                onClick={clearAllFilters}
                className="flex px-3 py-1.5  text-sm rounded-full bg-gray-700 text-gray-400 items-center cursor-pointer"
              >
                Reset Filter
                <XMarkIcon className="w-6 h-6 cursor-pointer text-red-400" />
              </Button>
            )}
          </div>

          {/* <div className="flex items-center gap-4    px-3 py-1 text-white">
            <TableCellsIcon className="w-6 h-6 cursor-pointer hover:text-red-400" />
            <ListBulletIcon className="w-6 h-6 cursor-pointer hover:text-red-400" />
          </div> */}
        </div>

        {title.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {title.map((title: TitleType, index) => (
                <div className=" text-white gap-4" key={index}>
                  <Link href={`/titles/${title?._id}/${title?.slug}`}>
                    <TitlePoster poster={title.poster} name={title.name} />
                    <div className="mt-4">
                      <span className="text-sm">
                        {title?.name.slice(0, 34)}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
            <div className="mt-10 flex justify-center">
              <button
                className="flex cursor-pointer items-center gap-2 px-5 py-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => handleMore()}
              >
                View More
                <ChevronDownIcon className="w-5 h-5" />
              </button>
            </div>
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
