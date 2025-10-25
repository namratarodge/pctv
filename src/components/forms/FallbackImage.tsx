// components/FallbackImage.tsx
"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useState } from "react";

type FallbackImageProps = Omit<ImageProps, "src" | "alt"> & {
  src?: string;               // may be missing/empty
  alt?: string;               // optional alt, default provided
  fallback?: string;          // path in /public, default provided
};

export default function FallbackImage({
  src,
  alt,
  fallback = "/default-image.jpg",
  ...rest
}: FallbackImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(src || fallback);

  // If the incoming src prop changes, reset our state
  useEffect(() => {
    setImgSrc(src || fallback);
  }, [src, fallback]);

  return (
    <Image
      {...rest}
      alt={alt ?? "Image"}
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
    />
  );
}