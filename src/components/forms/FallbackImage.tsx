// components/FallbackImage.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function FallbackImage({
  src,
  alt,
  fallback = "/default-image.jpg",
  ...props
}) {
  const [imgSrc, setImgSrc] = useState(src || fallback);

  return (
    <Image
      {...props}
      alt={alt || "Image"}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
    />
  );
}