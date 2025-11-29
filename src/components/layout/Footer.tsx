"use client";
import { slidesCountry } from "@/constants/Menu";
import Image from "next/image";

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
    <footer
      className={`${
        WhitePages.includes(pageName) ? "border-gray-300" : "border-gray-700"
      } border-b border-t border-gray-200 `}
    >
      <div className="mx-auto max-w-11/12 px-2  pb-8 pt-10 lg:px-2 ">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8 ">
          <div className="space-y-4">
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
              Project Controls TV is the wolrd's first-ever OTT and stremming
              platform dedicated to empowering the global project controls
              community.
            </p>
          </div>
          <div className="mt-16 grid grid-cols-1  gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-8">
              <div>
                <h3 className="text-md font-extrabold">TV Topic</h3>
                <ul role="list" className="mt-2 space-y-2">
                  {tvtopic.map((item: TagType) => (
                    <li key={item._id}>
                      <Link
                        href={`/browse?keyword=${item.name}`}
                        className="text-sm/6"
                      >
                        {item.display_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-md font-extrabold ">
                  Project Controls Expo
                </h3>
                <ul role="list" className="mt-2 space-y-2">
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
                <h3 className="text-md font-extrabold ">Pages</h3>
                <ul role="list" className="mt-2 space-y-2">
                  {pages.map((item: PageType) => (
                    <li key={item._id}>
                      <Link href={`/pages/${item.slug}`} className="text-sm/6">
                        {item.title}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link href="/contact" className="text-sm/6">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-white/10 py-4   ">
        <div className="max-w-11/12 flex justify-between mx-auto">
          <p className="text-sm/6 text-gray-400">
            &copy; 2025 Project Control TV, Inc. All rights reserved.
          </p>
          <div className="flex space-x-4 justify-end ">
            <a
              href="https://www.youtube.com/channel/UCgcNn2Z5CVCuaYDIvnY9xaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaYoutube className="w-8 h-8 text-gray-600 p-1 rounded-sm hover:text-red-800 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="https://www.facebook.com/ProjectControlsTV/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookF className="w-8 h-8 text-gray-600 p-1 rounded-sm hover:text-blue-800 hover:scale-110 transition-transform duration-200" />
            </a>

            <a
              href="https://www.instagram.com/projectcontrolstv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="w-8 h-8 text-gray-600  p-1 rounded-sm hover:text-pink-700 hover:scale-110 transition-transform duration-200" />
            </a>
            <a
              href="https://www.linkedin.com/company/project-controls-tv/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedinIn className="w-8 h-8 text-gray-600 p-1 rounded-sm hover:text-blue-900 hover:scale-110 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
