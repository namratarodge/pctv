"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type PersonImageProps = {
  poster?: string;           // undefined while loading => show skeleton
  name?: string;
  direct?: boolean;
  rounded?: boolean;
  showSkeletonWhileLoading?: boolean; // optional
};

const FALLBACK = "/default-front.svg";

const UserAvatar: React.FC<PersonImageProps> = ({
  direct = false,
  name = "default",
  poster,
  rounded = false,
  showSkeletonWhileLoading = true,
}) => {
  const getImageSrc = (p?: string, d?: boolean) => {
    if (!p) return FALLBACK;
    if (/^https?:\/\//i.test(p)) return p;
    if (d) return p;
    return `${process.env.NEXT_PUBLIC_WEBSITE}/${p}`;
  };

  // Compute desired src from props
  const desiredSrc = useMemo(() => getImageSrc(poster, direct), [poster, direct]);

  // Keep internal src so we can switch on prop changes and handle onError fallback
  const [imgSrc, setImgSrc] = useState(desiredSrc);

  // ✅ Update image when poster/direct changes
  useEffect(() => {
    setImgSrc(desiredSrc);
  }, [desiredSrc]);

  // ✅ While data is loading (poster === undefined), show a skeleton (no default image flicker)
  if (showSkeletonWhileLoading && typeof poster === "undefined") {
    return (
      <div
        className={`h-10 w-10 ${rounded ? "rounded-full" : "rounded-sm"} bg-gray-200 animate-pulse border border-gray-300`}
        aria-label="avatar loading"
      />
    );
  }

  return (
    <Image
      src={imgSrc}
      alt={name || "avatar"}
      width={40}
      height={40}
      className={`${rounded ? "rounded-full" : "rounded-sm"} w-10 h-10 object-cover border border-gray-300`}
      onError={() => setImgSrc(FALLBACK)}
    />
  );
};

export default UserAvatar;