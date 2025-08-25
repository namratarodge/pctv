"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function GAListener() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams}` : "");
    window.gtag("event", "page_view", {
      page_path: url,
    });
  }, [pathname, searchParams]);

  return null;
}