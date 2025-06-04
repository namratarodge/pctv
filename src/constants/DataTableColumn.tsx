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
}[] = [
  { key: "name", label: "Name" },
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