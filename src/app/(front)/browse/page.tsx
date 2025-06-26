"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { usePublicData } from "@/components/context/PublicDataContext";
import Image from "next/image";

import { TitleType, TvTopicType } from "@/constants/Type"

const country = [
  { id: 1, name: "United States" },
  { id: 2, name: "Canada" },
  { id: 3, name: "United Kingdom" },
  { id: 4, name: "Australia" },
  { id: 5, name: "Germany" },
  { id: 6, name: "France" },
  { id: 7, name: "Japan" },
  { id: 8, name: "India" },
  { id: 9, name: "Brazil" },
  { id: 10, name: "South Africa" },
];

const Language = [
  { id: 1, name: "English" },
  { id: 2, name: "Spanish" },
  { id: 3, name: "French" },
  { id: 4, name: "German" },
  { id: 5, name: "Hindi" },
];

const Levels = [
  { id: 1, name: "Beginner" },
  { id: 2, name: "Intermediate" },
  { id: 3, name: "Expert" },
];

// type TvTopicType = {
//   name: string;
//   display_name: string;
// };


import Loading from "@/components/layout/Loading";
import {
  ListBulletIcon,
  TableCellsIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Link from "next/link";

type GenreType = {
  _id: string;
  name: string;
  display_name: string;
  type: "genre";
  created_at: string;
  updated_at: string;
  __v: number;
};

export default function Browser() {
  const router = useRouter();
  const [title, setTitle] = useState([]);
  const { tvtopic, categories } = usePublicData();
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const keyword = searchParams.get("keyword");
  const genreParam = searchParams.get("genre");
  const [selectedGenres, setSelectedGenres] = useState(
    genreParam ? genreParam.split(",") : []
  );
  const genreList = genreParam ? genreParam.split(",") : [];

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

  const fetchTitlte = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/titles`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          params: {
            limit: 20,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data;
        setLoading(false);
        setTitle(modifiedData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  useEffect(() => {
    fetchTitlte();
  }, []);

  if (loading) {
    return <Loading title="" />;
  }

  return (
    <div className="pt-18  max-w-11/12 mx-auto flex flex-col lg:flex-row mb-10">
      <div className="w-full md:w-1/5 px-4 py-4 overflow-auto lg:h-screen ">
        <div className="w-full border-b border-gray-500 pb-4">
          <div className="text-gray-300 text-lg">TV Topic</div>
          <div className="relative inline-block mt-4 w-full text-white">
            <select
              className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2"
              onChange={handleChangeKeyword}
            >
              <option value="all">All</option>
              {tvtopic.map((data: TvTopicType, index: number) => (
                <option
                  key={index}
                  value={data.name}
                  selected={data.name === keyword}
                >
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
              {categories.map((category : GenreType) => (
                <li
                  className="text-gray-300 py-1 cursor-pointer"
                  key={category._id}
                >
                  <label className="cursor-pointer">
                    <input
                      type="checkbox"
                      checked={genreList.includes(category.name)}
                      onChange={() => handleCheckboxChange(category.name)}
                      className="mr-2 form-checkbox accent-red-500 border border-red-400"
                    />{" "}
                    {category.display_name}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full max-w-md mx-auto mt-4 border-b pb-6 border-gray-500">
          <label
            htmlFor="yearRange"
            className="block text-md font-medium text-gray-700 mb-2"
          >
            Year
          </label>
          <input
            type="range"
            id="yearRange"
            min="2010"
            max="2025"
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>2010</span>
            <span>2010</span>
            <span>2025</span>
          </div>
        </div>
        <div className="w-full border-b border-gray-500 py-6">
          <div className="text-gray-300">Select Region</div>
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              {country.map((country) => (
                <option key={country.id}>{country.name}</option>
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
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              {Language.map((language) => (
                <option key={language.id}>{language.name}</option>
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
          <div className="text-gray-300">Levels</div>
          <div className="relative inline-block mt-4 w-full">
            <select className="block appearance-none w-full border border-gray-500  text-gray-300 py-2 px-4 pr-8 rounded-full leading-tight focus:outline-none focus:ring-2 ">
              {Levels.map((level) => (
                <option key={level.id}>{level.name}</option>
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
          <button className="cursor-pointer w-full mt-4 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Reset Filter
          </button>
        </div>
      </div>
      <div className="w-full lg:w-4/5 px-4 py-2 ">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div className="flex gap-4 items-center ">
            <h1 className="text-3xl text-white">PCE Brazil</h1>

            {selectedGenres ||
              (genreParam && (
                <div className="flex px-4 py-2  text-sm rounded-full bg-gray-700 text-gray-400 items-center cursor-pointer">
                  Reset Filter
                  <XMarkIcon className="w-6 h-6 cursor-pointer text-red-400" />
                </div>
              ))}
          </div>

          <div className="flex items-center gap-4    px-3 py-1 text-white">
            <TableCellsIcon className="w-6 h-6 cursor-pointer hover:text-red-400" />
            <ListBulletIcon className="w-6 h-6 cursor-pointer hover:text-red-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {title.map((title : TitleType) => (
            <div className=" text-white gap-4" key={title._id}>
              <Link href={`/titles/${title._id}/${title.slug}`}>
                <Image
                  src={`${process.env.NEXT_PUBLIC_WEBSITE}/${title.poster}`}
                  alt={title.name || "Poster"}
                  width={300} // or any appropriate width
                  height={450} // adjust height as needed
                  className="rounded-lg"
                />
                <div className="mt-4">
                  <a href="#" className="text-sm">
                    {title?.name.slice(0, 34)}
                  </a>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
