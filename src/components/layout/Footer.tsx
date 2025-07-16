"use client";
import Image from "next/image";

const navigation = {
  solutions: [
    { name: "Marketing", href: "#" },
    { name: "Analytics", href: "#" },
    { name: "Automation", href: "#" },
    { name: "Commerce", href: "#" },
    { name: "Insights", href: "#" },
  ],
  support: [
    { name: "Submit ticket", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Guides", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Jobs", href: "#" },
    { name: "Press", href: "#" },
  ],
  legal: [
    { name: "Terms of service", href: "#" },
    { name: "Privacy policy", href: "#" },
    { name: "License", href: "#" },
  ],
};

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
                src="logo-white.png"
                width={200} // Replace with the actual width of the image or layout container
                height={200} // Replace with the actual height
                className="w-50"
                unoptimized // required for external images unless configured in next.config.js
              />
            ) : (
              <Image
                alt="Your Company"
                src="logo-dark.png"
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
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className="text-sm/6 ">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm/6 font-semibold ">Pages</h3>
                <ul role="list" className="mt-6 space-y-4 text-sm/6">
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
        <div className="mt-16 border-t border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-sm/6 text-gray-400">
            &copy; 2025 Project Control TV, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
