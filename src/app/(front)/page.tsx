"use client";

import { usePublicData } from "@/components/context/PublicDataContext";
import Image from "next/image";
import Link from "next/link";

const joinPCTV = [
  {
    title: "Exclusive Access to Industry-Leading Content",
    description:
      "Get access to high-quality sessions led by seasoned project controls professionals covering real-world challenges, solutions and innovations.",
  },
  {
    title: "Learn from Global Experts AnyTime, AnyWhere",
    description:
      "Watch anytime, anywhere-from desktop to mobile. Perfect for busy professionals looking to grow their experties at their own place.",
  },
  {
    title: "Stay Ahead with Cutting_edge Trands And Techniques",
    description:
      "Stay current with emerging trands,tools and best practices shaping the future of projects controls.",
  },
  {
    title: "Join a growing Global Coummunity",
    description:
      "Join a growing international network of professionals who share your passion for projects excellence and continuous learning.",
  },
];

export default function Home() {
  const { user } = usePublicData();

  return (
    <>
      <div className="relative isolate overflow-hidden pt-14 ">
        <Image
          alt=""
          src="/landing-banner.jpg"
          fill
          className="absolute inset-0 -z-10 object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl py-32 sm:py-38 lg:py-56">
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-balance text-white sm:text-5xl">
                Unlimited session, Workshops, exclusive content and more
              </h1>
              <p className="mt-8 text-lg text-pretty text-white sm:text-xl/8">
                Sign Up. Start Free. Stay in Control.
              </p>
              <p className="mt-8 text-sm font-extralight text-white sm:text-sm">
                Ready to watch? Sign up for a free trial and start watching
                today.
              </p>
                <div className="mt-10 flex items-center justify-center gap-6 flex-col md:flex-col lg:flex-row ">
                  <Link
                    href="/register"
                    className="cursor-pointer w-40 rounded-full bg-red-500 px-6 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Get Started
                  </Link>
                </div>
              
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-[36.125rem] -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          />
        </div>
      </div>
      <div className="p-6 lg:px-8 mx-auto max-w-11/12">
        <h2 className="text-white text-xl">More reasons To Join PCTV</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {joinPCTV.map((item, index) => (
            <div key={index} className=" text-white bg-[#1f3844] px-6 py-6 ">
              <h2 className="text-xl">{item.title}</h2>
              <h4 className="text-sm mt-4">{item.description}</h4>
              <div className="mt-3 flex justify-end left-0">
                <Image alt="" src="/Subtraction 3.png" width={30} height={30} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 lg:px-8 mx-auto max-w-11/12">
        <h2 className="text-white text-xl">Our Top Voice</h2>
        <div className="mt-4 grid  gap-4  sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
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
    </>
  );
}
