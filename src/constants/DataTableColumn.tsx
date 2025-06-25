
import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";

const PersonImage = ({ poster, name }: { poster?: string; name?: string }) => {
  const [imgSrc, setImgSrc] = useState(
    poster
      ? `${process.env.NEXT_PUBLIC_WEBSITE}/${poster}`
      : "/default-image.jpg"
  );

  return (
    <Image
      src={imgSrc}
      alt={name || "Person"}
      width={32}
      height={32}
      className="w-8 h-8 rounded-sm object-cover"
      onError={() => setImgSrc("/default-image.jpg")}
    />
  );
};

// Crew Column
type typeOfCrew = {
  person_id: {
    name: string;
    poster: string;
  };
  job: string;
  department: string;
};

export const CrewColumn: {
  key: keyof typeOfCrew;
  label: string;
  render?: (row: typeOfCrew) => React.ReactNode;
}[] = [
  {
    key: "person_id",
    label: "Name",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <PersonImage poster={row.person_id?.poster} name={row.person_id?.name} />
        <span className="flex flex-col">{row.person_id?.name} </span> 
      </div>
    ),
  },
  { key: "job", label: "Job" },
  { key: "department", label: "Department" },
];


// Cast Column
type typeOfCast = {
  person_id: {
    name: string;
    poster: string;
  };
  character: string;
};

export const CastColumn: {
  key: keyof typeOfCast;
  label: string;
  render?: (row: typeOfCast) => React.ReactNode;
}[] = [
  {
    key: "person_id",
    label: "Name",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <PersonImage poster={row.person_id?.poster} name={row.person_id?.name} />
        <span className="flex flex-col">{row.person_id?.name} </span> 
      </div>
    ),
  },
  { key: "character", label: "Character" },
];

// Plans Column
type typeOfCategories = {
  name: "string";
  display_name: "string";
};

export const CategoriesColumn: {
  key: keyof typeOfCategories;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "display_name", label: "Display Name" },
];

// Plans Column
type typeOfPlans = {
  name: "string";
  amount: "number";
  currency: "string";
  interval: "string";
  recommended: "boolean";
  position: "number";
  updated_at: "string";
};

export const planColumn: {
  key: keyof typeOfPlans;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "amount", label: "Amount" },
  { key: "currency", label: "Currency" },
  { key: "interval", label: "Interval" },
  { key: "recommended", label: "Recommended" },
  { key: "position", label: "position" },
  { key: "updated_at", label: "Last Updated" },
];

// Additional Tag Column
type AdditionalTagItem = {
  name: string;
  birth_place: string;
  views: number;
  popularity: number;
  updated_at: string;
};

export const AdditionalTagColumn: {
  key: keyof AdditionalTagItem;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "birth_place", label: "Birthday" },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
  { key: "updated_at", label: "Last Updated" },
];

// Title  Column
type TitleItem = {
  name: string;
  type: string;
  release_date: number;
  rating: number;
  views: number;
  popularity: number;
};

export const TitleColumn: {
  key: keyof TitleItem;
  label: string;
  render?: (row: TitleItem) => React.ReactNode;
}[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => (
      <div className="flex items-center space-x-2">
        {/* <PersonImage poster={row.person_id?.poster} name={row.person_id?.name} /> */}
        <span className="flex flex-col">{row.name}</span>
      </div>
    ),
  },
  { key: "type", label: "Type" },
  { key: "release_date", label: "Release Date" },
  { key: "rating", label: "Rating" },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
];

// People  Column
type PeopleItem = {
  name: string;
  birthdate: string;
  views: number;
  popularity: number;
  last_update: number;
};

export const PeopleColumn: {
  key: keyof PeopleItem;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "birthdate", label: "Birth Date" },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
  { key: "last_update", label: "Last Update" },
];

// Video  Column
type VideoItem = {
  name: string;
  title: string;
  type: number;
  category: number;
  approved: number;
  plays: number;
  quality: number;
  score: number;
  reports: number;
  sessions: number;
  episode: number;
};

export const VideoColumn: {
  key: keyof VideoItem;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  { key: "type", label: "Type" },
  { key: "category", label: "Category" },
  { key: "approved", label: "Approved" },
  { key: "plays", label: "Plays" },
  { key: "quality", label: "quality" },
  { key: "score", label: "score" },
  { key: "reports", label: "reports" },
  { key: "sessions", label: "session" },
  { key: "episode", label: "Episode" },
];

// List Column
type typeOfList = {
  name: "string";
  owner: "number";
  item_count: "string";
  public: boolean;
  updated_at: "string";
};

export const listColumn: {
  key: keyof typeOfList;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "owner", label: "Owner" },
  { key: "item_count", label: "Item Count" },
  { key: "public", label: "Public" },
  { key: "updated_at", label: "Last Updated" },
];

// tags Column
type typeOTags = {
  name: "string";
  type: "number";
  display_name: "string";
  updated_at: "string";
};

export const tagsColumn: {
  key: keyof typeOTags;
  label: string;
}[] = [
  { key: "name", label: "Name" },
  { key: "type", label: "Type" },
  { key: "display_name", label: "Display Name" },
  { key: "updated_at", label: "Last Updated" },
];

// users Column
type typeOfUsers = {
  user: "string";
  subscribed: "number";
  userType: "string";
  first_name: "string";
  last_name: "string";
  updated_at: "string";
  avatar?: string; // Optional avatar URL
};

export const usersColumn: {
  key: keyof typeOfUsers;
  label: string;
  render?: (row: typeOfUsers) => React.ReactNode;
}[] = [
  {
    key: "user",
    label: "User",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <PersonImage poster={row.avatar} name={row.first_name} />
        <span className="flex flex-col">
          {row.first_name} {row.last_name}
        </span>
      </div>
    ),
  },
  { key: "subscribed", label: "Subscribed" },
  { key: "userType", label: "Roles" },
  { key: "first_name", label: "First Name" },
  { key: "last_name", label: "Last Name" },
  { key: "updated_at", label: "Last Updated" },
];

// pages Column
type typeOfPages = {
  slug: "string";
  user_id: "number";
  type: "string";
  updated_at: "string";
};

export const pagesColumn: {
  key: keyof typeOfPages;
  label: string;
  render?: (row: typeOfPages) => React.ReactNode;
}[] = [
  { key: "slug", label: "Slug" },
  {
    key: "user_id",
    label: "Owner",

    render: (row) => (
      <div className="flex items-center space-x-2">
        {/* <img
          src={"/default-user.jpg"}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        /> */}
        <span className="flex flex-col">
          Sandesh Mankar {row}
          <small>sandesh@gmail.com</small>
        </span>
      </div>
    ),
  },
  { key: "type", label: "Type" },
  { key: "updated_at", label: "Last Updated" },
];

// review Column
type reviewOfPages = {
  score: "string";
  user_id: {
    username: string;
    email: string;
    _id?: string;
  };
  reviewable: "string";
  reviewable_type: "string";
  updated_at: "string";
};

export const reviewColumn: {
  key: keyof reviewOfPages;
  label: string;
  render?: (row: typeOfPages) => React.ReactNode;
}[] = [
  {
    key: "score",
    label: "Score",
    render: (row) => (
      <div className="flex items-center flex-col space-x-2">
        <StarIcon className="h-5 w-5 text-yellow-400" />
        {row.score} / 10
      </div>
    ),
  },

  {
    key: "user_id",
    label: "Owner",

    render: (row) => (
      <div className="flex items-center space-x-2">
        {/* <img
          src={"/default-user.jpg"}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        /> */}
        <span className="flex flex-col text-md">
          {row?.user_id?.username}
          <small className="text-gray-400"> {row?.user_id?.email}</small>
        </span>
      </div>
    ),
  },
  {
    key: "reviewable",
    label: "Reviewable",

    render: () => (
      <div className="flex items-center space-x-2">
        {/* <img
          src={"/default-user.jpg"}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        /> */}
        <span className="flex flex-col">Project communications</span>
      </div>
    ),
  },
  { key: "reviewable_type", label: "Type" },
  { key: "updated_at", label: "Last Updated" },
];

// review Column title
type reviewOfTitles = {
  score: number;
  reviewable_id: string;
  reviewable_type: string;
  updated_at: string;
};

export const reviewTitleColumn: {
  key: keyof reviewOfTitles;
  label: string;
  render?: (row: reviewOfTitles) => React.ReactNode;
}[] = [
  {
    key: "score",
    label: "Score",
    render: (row) => (
      <div className="flex items-center flex-col space-x-2">
        <StarIcon className="h-5 w-5 text-yellow-400" />
        {row.score} / 10
      </div>
    ),
  },
  {
    key: "reviewable_id",
    label: "Reviewable",

    render: () => (
      <div className="flex items-center space-x-2">
        <span className="flex flex-col">Project communications</span>
      </div>
    ),
  },
  { key: "reviewable_type", label: "Type" },
  { key: "updated_at", label: "Last Updated" },
];
