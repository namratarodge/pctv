"use client";

import Image from "next/image";
import { useState } from "react";

type UserAvatarProps = {
  poster: string;
  name?: string;
};

const UserAvatar: React.FC<UserAvatarProps> = ({ name = 'default', poster }) => {
  const [imgSrc, setImgSrc] = useState(
    `${process.env.NEXT_PUBLIC_WEBSITE}/${poster}`
  );

  return (
    <Image
      src={imgSrc}
      alt={name}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover"
      onError={() => setImgSrc("/default-user.jpg")}
    />
  );
};

export default UserAvatar;
