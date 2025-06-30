"use client";

import Image from "next/image";
import { useState } from "react";
type PersonImageProps = {
  poster?: string;
  name?: string;
  direct?: boolean;
  rounded?: boolean;
};

const avatar = "/default-front.jpg";

const UserAvatar: React.FC<PersonImageProps> = ({
  direct = false,
  name = "default",
  poster,
  rounded = false,
}) => {
  const initialSrc = !poster
    ? avatar
    : direct
    ? poster
    : `${process.env.NEXT_PUBLIC_WEBSITE}/${poster}`;
  const [imgSrc, setImgSrc] = useState(initialSrc);

  return (
    <Image
      src={imgSrc}
      alt={name}
      width={40}
      height={40}
      className={`${
        rounded ? "rounded-full" : "rounded-sm"
      } w-10 h-10  object-cover`}
      onError={() => setImgSrc(avatar)}
    />
  );
};

export default UserAvatar;
