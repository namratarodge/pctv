"use client";

import Image from "next/image";
import { useState } from "react";

type PersonImageProps = {
  poster?: string;
  name?: string;
  direct?: boolean;
  rounded?: boolean;
};

const avatar = "/default-front.svg";

const UserAvatar: React.FC<PersonImageProps> = ({
  direct = false,
  name = "default",
  poster,
  rounded = false,
}) => {
  const getImageSrc = (poster?: string, direct?: boolean) => {
    if (!poster) return avatar;

    // If poster is already absolute URL (http/https), use as-is
    if (/^https?:\/\//.test(poster)) {
      return poster;
    }

    // If direct is true, don't prepend NEXT_PUBLIC_WEBSITE
    if (direct) {
      return poster;
    }

    // Otherwise, assume it's a relative path and prepend base url
    return `${process.env.NEXT_PUBLIC_WEBSITE}/${poster}`;
  };

  const [imgSrc, setImgSrc] = useState(getImageSrc(poster, direct));

  return (
    <Image
      src={imgSrc}
      alt={name || "avatar"}
      width={40}
      height={40}
      className={`${
        rounded ? "rounded-full" : "rounded-sm"
      } w-10 h-10 object-cover border border-gray-300`}
      onError={() => setImgSrc(avatar)}
    />
  );
};

export default UserAvatar;