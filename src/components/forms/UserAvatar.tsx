"use client";

import Image from "next/image";
import { useState } from "react";

type User = {
  poster: string;
  name: string;
};

type UserImageProps = {
  user: User;
};

const UserAvatar: React.FC<UserImageProps> = ({ user }) => {
  const [imgSrc, setImgSrc] = useState(`${process.env.NEXT_PUBLIC_WEBSITE}/${user.poster}`);

  return (
    <Image
      src={imgSrc}
      alt={user.name}
      width={40}
      height={40}
      className="w-10 h-10 rounded-full object-cover"
      onError={() => setImgSrc("/default-user.jpg")}
    />
  );
};

export default UserAvatar;