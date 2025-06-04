"use client";
import { Filter, Paginations, ModelWithForm } from "@/components/forms";
import {
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import { useEffect, useState } from "react";
import { fields } from "@/constants/Form";
import { TitleFilter } from "@/constants/Filter";
import axios from "axios";
import { formatDate } from "@/utils/common";
import AdvanceDataTable from "@/components/forms/AdvanceDataTable";
import { TitleColumn } from "@/constants/DataTableColumn";
import Loading from "@/components/layout/Loading";
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

export default function Subscription() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  const [pages, setPages] = useState(1);
  const [limits, setLimits] = useState(10);

  const handleFormSubmit = (data: Record<string, string>) => {
    console.log("Form submitted:", data);
    setIsModalOpen(false);
  };

  const fetch = async () => {
    const token = localStorage.getItem("token");
    setLoading(true);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/getTitles`,
        {
          headers: {
            Authorization: token,
            "Content-Type": "application/json",
          },
          params: {
            limit: limits,
            page: pages,
          },
        }
      );
      if (response.data.status) {
        const modifiedData = response.data.data.data.map((item: any) => ({
          ...item,
          updated_at: `${formatDate(item.updated_at)} `,
        }));
        setData(modifiedData);
        setPagination(response.data.data.pagination);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false); // Always stop loading, whether success or failure
    }
  };

  const setPage = (value: number) => {
    setPages(value);
  };

  const setLimit = (value: number) => {
    setLimits(value);
  };

  useEffect(() => {
    fetch();
  }, [pages, limits]);

  return (
    <div className="p-6 sm:px-6 lg:px-8 bg-white rounded-md ">
      <h1 className="text-2xl font-semibold text-gray-600 ">Titles</h1>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="sm:flex sm:items-center mt-4  h-auto ">
            <Filter filterType={TitleFilter} />
            <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none ">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="flex items-center cursor-pointer gap-2 rounded-md bg-red-500 px-3 py-3 text-center text-sm font-semibold text-white shadow-xs hover:bg-red-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <PlusCircleIcon className="w-6 h-6" /> New Title
              </button>
            </div>
          </div>
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <AdvanceDataTable
                  columns={TitleColumn}
                  data={data}
                  renderActions={(person) => (
                    <div className="flex gap-3 justify-end">
                      <button
                        onClick={() => console.log("Edit", person)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer"
                      >
                        <PencilIcon className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => console.log("Delete", person)}
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
            </div>
          </div>
        </>
      )}
      <ModelWithForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create a New Plan"
        fields={fields}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
}
