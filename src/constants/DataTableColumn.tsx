import { StarIcon } from "@heroicons/react/24/solid";

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
        <img
          src={
            row.poster
              ? `${process.env.NEXT_PUBLIC_WEBSITE}/${row.poster}`
              : "/default-image.jpg"
          }
          alt={row.poster}
          className="w-8 h-8 rounded-sm object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        />
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
        <img
          src={row.avatar || "/default-image.jpg"}
          alt={row.first_name}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        />
        <span className="flex flex-col">
          {row.first_name} {row.last_name}
          <small>{row.email}</small>
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
        <img
          src={"/default-user.jpg"}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        />
        <span className="flex flex-col">
          Sandesh Mankar
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
  user_id: "string";
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
        <img
          src={"/default-user.jpg"}
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        />
        <span className="flex flex-col text-md">
          Sandesh Mankar
          <small className="text-gray-400">sandesh@gmail.com</small>
        </span>
      </div>
    ),
  },
  {
    key: "reviewable",
    label: "Reviewable",

    render: (row) => (
      <div className="flex items-center space-x-2">
        <img
          src={"/default-user.jpg"}
          className="w-8 h-8 rounded-full object-cover"
          onError={(e) => {
            const target = e.currentTarget;
            target.onerror = null; // prevent infinite loop
            target.src = "/default-image.jpg";
          }}
        />
        <span className="flex flex-col">Project communications</span>
      </div>
    ),
  },
  { key: "reviewable_type", label: "Type" },
  { key: "updated_at", label: "Last Updated" },
];
