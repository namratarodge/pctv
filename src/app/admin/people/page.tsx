"use client";
import { Filter, Paginations, Model } from "@/components/forms";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import Link from "next/link";
import { filterType } from "@/constants/Filter";
import { useEffect, useState } from "react";
import axios from "axios";
import { UserIcon } from "@heroicons/react/24/outline";

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPeople = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getPeoples`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data.status) {
        console.log(response.data.data);
        setPeople(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  useEffect(() => {
    fetchPeople();
  }, []);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">People</h1>
      <div className="sm:flex sm:items-center mt-4  h-auto ">
        <Filter filterType={filterType} />
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
          <Link
            href="people/create"
            className="flex items-center  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> New People
          </Link>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0  py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Birthday Place
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Local View
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Popularity
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Updated
                  </th>
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr key={person._id}>
                    <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-14 shrink-0">
                          {person.poster ? (
                            <img
                              alt=""
                              src={
                                "https://projectcontrolstv.com/" + person.poster
                              }
                              className="w-14 h-14 rounded-full"
                              onError={(e) => {
                                e.target.onerror = null; // prevent infinite loop
                                e.target.src =
                                  "/default-image.jpg"; // fallback image
                              }}
                            />
                          ) : (
                            <UserIcon className="w-11 h-11 text-gray-400" />
                          )}
                        </div>
                        <div className="ml-4">{person.name}</div>
                      </div>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      <div className="text-gray-900">{person.birth_place}</div>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      {person.views}
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      {person.popularity}
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      {person.updated_at}
                    </td>
                    <td className="relative py-5 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                      <a
                        href="#"
                        className="text-red-600 hover:text-indigo-900"
                      >
                        Edit<span className="sr-only">, {person.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Paginations />
          </div>
        </div>
      </div>
    </div>
  );
}
