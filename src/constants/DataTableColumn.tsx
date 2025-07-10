import { StarIcon } from "@heroicons/react/24/solid";

import UserAvatar from "@/components/forms/UserAvatar";
import { truncateToWords } from "@/utils/common";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

// Crew subscriptions
type typeOfSubscriptions = {
  user_id: {
    first_name: string;
    last_name: string;
    email: string;
    userType: string;
    avatar: string;
  };
  gateway_name: string;
  gateway_id: string;
  cancelled: string;
  renews_at: string;
  ends_at: string;
  created_at: string;
};

export const SubscriptionsColumn: {
  key: keyof typeOfSubscriptions;
  label: string;
  render?: (row: typeOfSubscriptions) => React.ReactNode;
}[] = [
  {
    key: "user_id",
    label: "User",
    render: (row) => (
      <div className="flex items-center space-x-4">
        <UserAvatar
          direct={true}
          poster={row.user_id?.avatar}
          name={row.user_id?.email}
        />
        <div>
          <span className="flex flex-col text-xs">
            {row.user_id?.first_name} {row.user_id?.last_name}{" "}
          </span>
          <span className="text-xs">{row.user_id?.email} </span>
        </div>
      </div>
    ),
  },
  { key: "gateway_name", label: "Gateway" },
  {
    key: "gateway_id",
    label: "Cancelled",
    render: (row) => (
      <div> {row.gateway_id === 'none' ? '-' : <CheckCircleIcon className="w-5 h-5 text-green-800"/> }</div>
    ),
  },
  { key: "renews_at", label: "Renews At" },
  { key: "ends_at", label: "Ends At" },
  { key: "created_at", label: "Created At" },
];


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
        <UserAvatar poster={row.person_id?.poster} name={row.person_id?.name} />
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
        <UserAvatar poster={row.person_id?.poster} name={row.person_id?.name} />
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
  name: string;
  amount: number;
  currency: string;
  currency_symbol: string;
  interval: string;
  position: number;
  updated_at: string;
};

export const planColumn: {
  key: keyof typeOfPlans;
  label: string;
  render?: (row: typeOfPlans) => React.ReactNode;
}[] = [
  { key: "name", label: "Name" },
  {
    key: "amount",
    label: "Amount",
    render: (row) => (
      <div>
        <span>{row.currency_symbol}</span>
        <span>{row.amount}</span>
      </div>
    ),
  },
  { key: "currency", label: "Currency" },
  { key: "interval", label: "Interval" },
  { key: "position", label: "position" },
  { key: "updated_at", label: "Last Updated" },
];

// Additional Tag Column
type AdditionalTagItem = {
  name: string;
  poster: string;
  birth_place: string;
  views: number;
  popularity: number;
  updated_at: string;
};

export const AdditionalTagColumn: {
  key: keyof AdditionalTagItem;
  label: string;
  render?: (row: AdditionalTagItem) => React.ReactNode;
}[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <UserAvatar poster={row.poster} name={row.name} />

        <span title={row.name} className="line-clamp-2">
          {truncateToWords(row.name, 7)}...{" "}
        </span>
      </div>
    ),
  },
  { key: "birth_place", label: "Birthday" },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
  { key: "updated_at", label: "Last Updated" },
];

// Title  Column
type TitleType = {
  _id: string;
  name: string;
  poster: string;
  type: string;
  release_date: number;
  rating: number;
  views: number;
  popularity: number;
};

export const TitleColumn: {
  key: keyof TitleType;
  label: string;
  render?: (row: TitleType) => React.ReactNode;
}[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <UserAvatar poster={row.poster} name={row.name} />

        <span title={row.name} className="line-clamp-2">
          {truncateToWords(row.name, 7)}...{" "}
        </span>
      </div>
    ),
  },
  { key: "type", label: "Type", render: () => <div>TV Topic</div> },
  { key: "release_date", label: "Release Date" },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
];

// People  Column
type PeopleItem = {
  _id: string;
  name: string;
  poster: string;
  birthdate: string;
  views: number;
  popularity: number;
  updated_at: number;
};

export const PeopleColumn: {
  key: keyof PeopleItem;
  label: string;
  render?: (row: PeopleItem) => React.ReactNode;
}[] = [
  {
    key: "name",
    label: "Name",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <UserAvatar poster={row.poster} name={row.name} />
        <span className="flex flex-col text-sm">{row.name}</span>
      </div>
    ),
  },
  {
    key: "birthdate",
    label: "Birth Date",
    render: (row) => <div>{!row.birthdate && "-"}</div>,
  },
  { key: "views", label: "Local View" },
  { key: "popularity", label: "Popularity" },
  { key: "updated_at", label: "Last Update" },
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
};

export const VideoColumn: {
  key: keyof VideoItem;
  label: string;
  render?: (row: VideoItem) => React.ReactNode;
}[] = [
  { key: "name", label: "Name" },
  { key: "title", label: "Title" },
  {
    key: "type",
    label: "Type",

    render: (row) => <div className=" capitalize">{row.type}</div>,
  },
  {
    key: "category",
    label: "Category",
    render: (row) => <div className=" capitalize">{row.category}</div>,
  },
  {
    key: "approved",
    label: "Approved",

    render: (row) => (
      <div className=" flex">
        {row.approved ? (
          <CheckCircleIcon className="w-5 h-5 text-green-500" />
        ) : (
          "No"
        )}
      </div>
    ),
  },
  {
    key: "plays",
    label: "Plays",
    render: (row) => <span>{row.plays ? row.plays : "-"}</span>,
  },
  { key: "quality", label: "Quality" },
  { key: "score", label: "Score" },
  { key: "reports", label: "Reports" },
];

// List Column
type typeOfList = {
  name: "string";
  owner: "number";
  item_count: "string";
  user_id: {
    first_name: string;
    last_name: string;
    email: string;
    userType: string;
    avatar: string;
  };
  public: number;
  updated_at: "string";
};

export const listColumn: {
  key: keyof typeOfList;
  label: string;
  render?: (row: typeOfList) => React.ReactNode;
}[] = [
  { key: "name", label: "Name" },
  {
    key: "owner",
    label: "Owner",
    render: (row) => (
      <div className="flex items-center space-x-2">
        <UserAvatar
          poster={row.user_id?.avatar}
          name={row.user_id?.first_name}
        />
        <span className="flex flex-col text-sm">
          {row.user_id?.first_name} {row.user_id?.last_name}
        </span>
      </div>
    ),
  },
  { key: "item_count", label: "Item Count" },
  {
    key: "public",
    label: "Public",
    render: (row) => <div>{row.public == 1 ? "True" : "False"}</div>,
  },
  { key: "updated_at", label: "Last Updated" },
];

// tags Column
type typeOTags = {
  name: string;
  type: string;
  display_name: string;
  updated_at: string;
};

const replaceName = (name: string) => {
  if (name === "genre") {
    return "Categories";
  } else if (name === "keyword") {
    return "TV Topics";
  } else {
    return name;
  }
};

export const tagsColumn: {
  key: keyof typeOTags;
  label: string;
  render?: (row: typeOTags) => React.ReactNode;
}[] = [
  { key: "name", label: "Name" },
  {
    key: "type",
    label: "Type",
    render: (row) => (
      <div className="flex items-center space-x-2">{replaceName(row.type)}</div>
    ),
  },
  { key: "display_name", label: "Display Name" },
  { key: "updated_at", label: "Last Updated" },
];

// users Column
type typeOfUsers = {
  _id: string;
  user: string;
  subscribed: number;
  userType: string;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  created_at: string;
  avatar?: string;
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
        <UserAvatar poster={row.avatar} name={row.email} rounded />
        <span className="flex flex-col">
          {row.first_name} {row.last_name}
          <small>{row.email}</small>
        </span>
      </div>
    ),
  },
  {
    key: "subscribed",
    label: "Subscribed",
    render: () => <div>No</div>,
  },
  { key: "userType", label: "Roles" },
  {
    key: "first_name",
    label: "First Name",
    render: (row) => <div>{row.first_name ? row.first_name : "-"}</div>,
  },
  {
    key: "last_name",
    label: "Last Name",
    render: (row) => <div>{row.last_name ? row.last_name : "-"}</div>,
  },
  { key: "created_at", label: "Created Updated" },
];

// pages Column
export type typeOfPages = {
  _id: string;
  slug: string;
  user_id: {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  type: string;
  updated_at: string;
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
        <span className="flex flex-col text-md">
          {row?.user_id?.first_name} {row?.user_id?.last_name}
          <small className="text-gray-400"> {row?.user_id?.email}</small>
        </span>
      </div>
    ),
  },
  { key: "type", label: "Type" },
  { key: "updated_at", label: "Last Updated" },
];

// review Column
type reviewOfPages = {
  _id: string;
  id: number;
  score: number;
  reviewable_id: {
    name: string;
    backdrop: string;
    description: string;
  };
  user_id: {
    _id: string;
    username: string;
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  };
  created_at: string;
  rating_type: string;
  updated_at: string;
  reviewableId: number;
};

export const reviewColumn: {
  key: keyof reviewOfPages;
  label: string;
  render?: (row: reviewOfPages) => React.ReactNode;
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
        <UserAvatar
          rounded={true}
          poster={row.user_id?.avatar}
          name={row.user_id?.email}
        />
        <span className="flex flex-col text-md">
          {row?.user_id?.first_name} {row?.user_id?.last_name}
          <small className="text-gray-400"> {row?.user_id?.email}</small>
        </span>
      </div>
    ),
  },
  {
    key: "reviewable_id",
    label: "Reviewable",

    render: (row) => (
      <div className="flex space-x-3 items-center">
        <UserAvatar
          poster={row.reviewable_id?.backdrop}
          name={row.reviewable_id?.name}
        />
        <p className="line-clamp-2 flex ">
          {truncateToWords(row.reviewable_id?.name, 5)}...{" "}
        </p>
      </div>
    ),
  },
  {
    key: "rating_type",
    label: "Type",
    render: () => <div>Rating</div>,
  },
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
