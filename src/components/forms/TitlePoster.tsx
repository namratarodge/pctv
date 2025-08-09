"use client";

import Image from "next/image";
import { useState } from "react";
type PersonImageProps = {
  poster?: string;
  name?: string;
  direct?: boolean;
};

const avatar = "/default-image.jpg";

const TitlePoster: React.FC<PersonImageProps> = ({
  direct = false,
  name = "default",
  poster,
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
      width={400}
      height={300}
      className={` rounded-md  border-gray-600 border h-37`}
      onError={() => setImgSrc(avatar)}
    />
  );
};

export default TitlePoster;
