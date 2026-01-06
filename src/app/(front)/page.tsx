"use client";

import { usePublicData } from "@/components/context/PublicDataContext";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const joinPCTV = [
  {
    title: "Exclusive Access to Industry-Leading Content",
    description:
      "Get access to high-quality sessions led by seasoned project controls professionals covering real-world challenges, solutions and innovations.",
  },
  {
    title: "Learn from Global Experts AnyTime, AnyWhere",
    description:
      "Watch anytime, anywhere-from desktop to mobile. Perfect for busy professionals looking to grow their expertise at their own pace.",
  },
  {
    title: "Stay Ahead with Cutting-edge Trends And Techniques",
    description:
      "Stay current with emerging trends, tools and best practices shaping the future of project controls.",
  },
  {
    title: "Join a Growing Global Community",
    description:
      "Join a growing international network of professionals who share your passion for project excellence and continuous learning.",
  },
];

type Page = {
  body: string;
  title: string;
};

export default function Home() {
  const { user } = usePublicData();
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState<Page | null>(null);
  const [email, setEmail] = useState("");

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
            slug: "home",
          },
        }
      );

      const listData = response.data?.data.data;
      console.log("listData", listData);
      if (listData) {
        setPage(listData);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error loading list:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListData();
  }, []);

  const handleGetStarted = () => {
    if (email) {
      // You can handle email submission here
      window.location.href = `/register?email=${encodeURIComponent(email)}`;
    } else {
      window.location.href = "/register";
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gray-900">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 -z-10">
          <Image
            alt="Background"
            src="/landing-banner.jpg"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0" />
        </div>

        {/* Decorative gradient blobs */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#3f3f3f] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl py-20 sm:py-32 lg:py-40 xl:py-48">
            <div className="text-center">
              {/* Main Heading */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Unlimited sessions, workshops,
                <br className="hidden sm:block" />
                exclusive content and more
              </h1>

              {/* Subheading */}
              <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl font-medium text-white">
                Sign Up. Start Free. Stay in Control.
              </p>

              {/* Description */}
              <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-md font-light text-gray-200 px-4">
                Ready to watch? Enter your email to create or restart your
                membership.
              </p>

              {/* Email Input and CTA */}
              <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0 max-w-2xl mx-auto">
                <input
                  type="email"
                  placeholder="Enter address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 rounded-full bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base"
                />
                <button
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-3 rounded-full bg-[#f44336] hover:bg-[#f44336] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom decorative gradient blob */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#282828] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>

      {/* Dynamic Content Section */}
      {/* <div className="bg-gray-900">
        {loading && <Loading />}
        {page?.body && (
          <div
            className="prose prose-invert max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            dangerouslySetInnerHTML={{ __html: page?.body ?? "" }}
          />
        )}
      </div> */}

      {/* More Reasons to Join Section */}
      <div className=" py-12 sm:py-16 lg:py-10 ">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-white text-xl ">More reasons to join PCTV</h2>
          <div className="mt-4 grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {joinPCTV.map((item, index) => (
              <div
                key={index}
                className="bg-[#1f3844] p-6 sm:p-7 rounded-lg hover:bg-[#234854] transition-colors duration-200 flex flex-col"
              >
                <h3 className="text-white text-lg sm:text-xl font-semibold mb-3 sm:mb-4 leading-snug">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed flex-grow">
                  {item.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <Image
                    alt="Decorative icon"
                    src="/Subtraction 3.png"
                    width={30}
                    height={30}
                    className="opacity-70"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-10">
          <h2 className="text-white text-xl">Our Top Voice</h2>
          <div className="mt-4 grid  gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {Array.from({ length: 6}, (_, index) => (
              <div key={index}>
                <Image
                  src={`/topvoice/Group${index + 1}.png`}
                  alt="test"
                  width={300}
                  height={200}
                  className="w-full h-auto object-cover rounded-md"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p className="mt-4 sm:mt-6 text-sm sm:text-base md:text-md font-light text-gray-200 px-4">
            Ready to watch? Enter your email to create or restart your
            membership.
          </p>

          {/* Email Input and CTA */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 px-4 sm:px-0 max-w-2xl mx-auto">
            <input
              type="email"
              placeholder="Enter address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-6 py-2.5 sm:py-3 rounded-full bg-gray-800/80 backdrop-blur-sm text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all text-sm sm:text-base"
            />
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-3 rounded-full bg-[#f44336] hover:bg-[#f44336] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm sm:text-base whitespace-nowrap"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
