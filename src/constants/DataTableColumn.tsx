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
