"use client";
import Image from "next/image";

const navigation = {
  support: [
    { name: "Submit ticket", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
  ],
};

import { slidesCountry } from "@/constants/Menu";

import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";

import { usePublicData } from "@/components/context/PublicDataContext";
import { WhitePages } from "@/constants/Menu";
import { PageType, TagType } from "@/constants/Type";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Footer() {
  const { tvtopic, pages } = usePublicData();
  const pageName = usePathname();
  return (
    <footer className="border-t border-gray-300 ">
      <div className="mx-auto max-w-11/12 px-6  pb-8 pt-10 lg:px-2 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            {WhitePages.includes(pageName) ? (
              <Image
                alt="Your Company"
                src="/logo-white.png"
                width={200} // Replace with the actual width of the image or layout container
                height={200} // Replace with the actual height
                className="w-50"
                unoptimized // required for external images unless configured in next.config.js
              />
            ) : (
              <Image
                alt="Your Company"
                src="/logo-dark.png"
                width={200} // Replace with the actual width of the image or layout container
                height={200} // Replace with the actual height
                className="w-50"
                unoptimized // required for external images unless configured in next.config.js
              />
            )}

            <p className="text-sm/6 text-balance ">
              Making the world a better place through constructing elegant
              hierarchies.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1  gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="text-sm/6 font-semibold ">TV Topic</h3>
                <ul role="list" className="mt-6 space-y-4">
                  {tvtopic.map((item: TagType, index: number) => (
                    <li key={index}>
                      <Link
                        href={`browse?keyword=${item.name}`}
                        className="text-sm/6"
                      >
                        {item.display_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold ">
                  Project Controls Expo
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {slidesCountry.map((item) => (
                    <li key={item.name}>
                      <a target="_blank" href={item.url} className="text-sm/6 ">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold ">Pages</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm">
                  {pages.map((item: PageType) => (
                    <li key={item._id}>
                      <Link href={`/pages/${item.slug}`}>{item.title}</Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact-us">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24 flex justify-between">
          <p className="text-sm/6 text-gray-400">
            &copy; 2025 Project Control TV, Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 justify-end ">
            <label>Connect with us:</label>
            <a
              href="https://www.youtube.com/channel/UCgcNn2Z5CVCuaYDIvnY9xaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="w-6 h-6 text-red-600 hover:text-red-800 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="https://www.facebook.com/ProjectControlsTV/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="w-6 h-6 text-blue-600 hover:text-blue-800 hover:scale-110 transition-transform duration-200" />
            </a>

            <a
              href="https://www.instagram.com/projectcontrolstv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-6 h-6 text-pink-500 hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="https://www.linkedin.com/company/project-controls-tv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="w-6 h-6 text-blue-700 hover:text-blue-900 hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
