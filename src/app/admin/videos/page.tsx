"use client";
import { Filter, Paginations, Model } from "@/components/forms";
import { PlusCircleIcon, UserCircleIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { fields } from "@/constants/Form";
import { filterType } from "@/constants/Filter";

import {
  videoOptions,
  QualityOptions,
  languageOptions,
  videoCategory,
} from "@/constants/Main";
const people = [
  {
    name: "Amelia Wright",
    title: "UI/UX Designer",
    department: "Design",
    email: "amelia.wright@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Noah Johnson",
    title: "Back-end Developer",
    department: "Engineering",
    email: "noah.johnson@example.com",
    role: "Admin",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
  },
  {
    name: "Sophia Lee",
    title: "Product Manager",
    department: "Product",
    email: "sophia.lee@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
  },
  {
    name: "Elijah Smith",
    title: "DevOps Engineer",
    department: "Infrastructure",
    email: "elijah.smith@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Olivia Brown",
    title: "Marketing Specialist",
    department: "Marketing",
    email: "olivia.brown@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/72.jpg",
  },
  {
    name: "Liam Davis",
    title: "Mobile Developer",
    department: "Development",
    email: "liam.davis@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/29.jpg",
  },
  {
    name: "Mia Wilson",
    title: "QA Engineer",
    department: "Quality Assurance",
    email: "mia.wilson@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    name: "James Taylor",
    title: "Technical Writer",
    department: "Content",
    email: "james.taylor@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  {
    name: "Emily Anderson",
    title: "Data Analyst",
    department: "Analytics",
    email: "emily.anderson@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Benjamin Moore",
    title: "Customer Support",
    department: "Support",
    email: "benjamin.moore@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/48.jpg",
  },
  {
    name: "Charlotte Clark",
    title: "Recruiter",
    department: "HR",
    email: "charlotte.clark@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/59.jpg",
  },
  {
    name: "Lucas Lewis",
    title: "Security Engineer",
    department: "IT Security",
    email: "lucas.lewis@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/60.jpg",
  },
  {
    name: "Harper Hall",
    title: "Financial Analyst",
    department: "Finance",
    email: "harper.hall@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "Henry Allen",
    title: "Legal Advisor",
    department: "Legal",
    email: "henry.allen@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
  },
  {
    name: "Ella Young",
    title: "Graphic Designer",
    department: "Creative",
    email: "ella.young@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
  },
  {
    name: "Jack Martinez",
    title: "Business Analyst",
    department: "Business",
    email: "jack.martinez@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    name: "Abigail Hernandez",
    title: "Content Strategist",
    department: "Content",
    email: "abigail.hernandez@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/women/19.jpg",
  },
  {
    name: "Aiden Scott",
    title: "Machine Learning Engineer",
    department: "AI",
    email: "aiden.scott@example.com",
    role: "Member",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
  },
];

export default function Videos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [videoType, setVideoType] = useState("embed");

  const videoOptionsMap = Object.fromEntries(
    videoOptions.map(({ key, value }) => [key, value])
  );

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Videos</h1>
      <div className="sm:flex sm:items-center mt-4  h-auto ">
        <Filter filterType={filterType} />
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="flex items-center cursor-pointer  gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            <PlusCircleIcon className="w-6 h-6" /> Add New Video
          </button>
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
                    className="sticky top-0 z-10 py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Release Date Rating
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Local Views
                  </th>
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {people.map((person) => (
                  <tr key={person.email}>
                    <td className="py-5 pr-3 pl-4 text-sm whitespace-nowrap sm:pl-0">
                      <div className="flex items-center">
                        <div className="size-11 shrink-0">
                          <img
                            alt=""
                            src={person.image}
                            className="size-11 rounded-full"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {person.name}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {person.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      <div className="text-gray-900">{person.title}</div>
                      <div className="mt-1 text-gray-500">
                        {person.department}
                      </div>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-green-600/20 ring-inset">
                        Active
                      </span>
                    </td>
                    <td className="px-3 py-5 text-sm whitespace-nowrap text-gray-500">
                      {person.role}
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
      <Model
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create video"
        form={
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleFormSubmit();
            }}
          >
            <div className=" space-y-4 overflow-auto h-120 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200 shadow-inner">
              <div>
                <label className="text-md ">Name</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Thubnail
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-12 text-gray-300"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                  >
                    Upload Photo
                  </button>
                </div>
              </div>
              <div>
                <label className="text-md ">Type</label>
                <select
                  value={videoType}
                  onChange={(e) => setVideoType(e.target.value)}
                  className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md"
                >
                  {videoOptions.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.value}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  {videoOptionsMap[videoType]}
                </label>

                {videoType === "basicUrl" ||
                  (videoType === "adaptive" && (
                    <input
                      type="text"
                      placeholder="Enter embed code"
                      className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md"
                    />
                  ))}
                {videoType === "directVideo" && (
                  <div className="mt-2 flex items-center gap-x-3">
                    <UserCircleIcon
                      aria-hidden="true"
                      className="size-12 text-gray-300"
                    />
                    <button
                      type="button"
                      className="rounded-md bg-white px-2.5 py-2 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    >
                      Upload Photo
                    </button>
                  </div>
                )}
                {videoType === "embed" && (
                  <textarea
                    placeholder="Enter embed code"
                    className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md"
                    rows={4}
                  />
                )}
              </div>
              <div className=" flex  gap-4">
                <div className="w-1/2">
                  <label className="text-md ">Quality</label>
                  <select className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md">
                    {QualityOptions.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.value}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="w-1/2">
                  <label className="text-md ">Language</label>
                  <select className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md">
                    {languageOptions.map((type) => (
                      <option key={type.key} value={type.key}>
                        {type.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-md ">Title</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="text-md ">Category</label>
                <select className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md">
                  {videoCategory.map((type) => (
                    <option key={type.key} value={type.key}>
                      {type.value}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-md ">Position</label>
                <input
                  type="number"
                  placeholder="Enter Position"
                  className="mt-2 px-4 py-2 w-full border border-gray-300 rounded-md"
                />
              </div>
            </div>
            {/* Add more fields here */}
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="submit"
                className="bg-red-600 text-white px-4 py-2 rounded-md cursor-pointer"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-600 px-4 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        }
      />
    </div>
  );
}
