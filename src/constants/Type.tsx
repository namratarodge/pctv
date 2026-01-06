export type TvTopicType = {
  name: string;
  display_name: string;
};

// Price plan

export type PricingProps = {
  step?: string;
  title: string;
  description?: string;
};

export type PlanCardProps = {
  label: string;
  price: string;
  type: string;
  paypal_id: string;
  plan_id: string;
  interval_count: number;
  isHighlighted: boolean;
  onSelect?: () => void;
  features: { label: string; value?: string }[];
};

// WhatchList

export type WhatchListType = {
  _id: string;
  user_id: string;
  title_id: TitleDetailsType;
  created_date: string;
};

// Settings

export type SettingsFormValues = {
  _id: string;
  name: string;
  value: string;
  private: string;
};

// Subscription Type

export type SubscriptionFormValue = {
  _id?: string;
  user_id: string;
  person_id: UserTagForUser | null;
  plan_id: string;
  description: string;
  renews_at: string | null;
  ends_at: string | null;
};

export type SubscriptionEditFormValue = {
  _id: string;
  user_id: { _id: string };
  person_id:  UserTagForUser | null;
  plan_id: { _id: string };
  description: string;
  renews_at: string | null;
  ends_at: string | null;
};

export type SubscriptionType = {
  _id: string;
  id: number;
  user_id: string;
  plan_id: {
    name: string;
    amount: string;
    currency: string;
  };
  gateway_name: string;
  gateway_id: string;
  quantity: number;
  description: string | null;
  trial_ends_at: string | null;
  ends_at: string | null;
  renews_at: string | null;
  created_at: string;
  updated_at: string;
};

export function toUserTag(raw: any): UserTagForUser {
  const fullName =
    raw.username ??
    raw.name ??
    [raw.first_name, raw.last_name].filter(Boolean).join(" ");

  return {
    // fields your type requires:
    id: raw._id,
    value: raw._id,
    username: raw.username ?? fullName ?? "",
    data: raw,

    // common optional fields most people have on this tag type
    _id: raw._id,
    email: raw.email ?? "",
    avatar: raw.avatar ?? raw.poster ?? "",
    first_name: raw.first_name ?? raw.name ?? "",
    last_name: raw.last_name ?? "",
    // add any other required keys your UserTagForUser interface mandates
  };
}

export type UserTagForUser = {
  value: string;
  data: PersonType;
  id: string;
  _id?: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string; // URL to image
};

// Titles Types

export type TitleType = {
  _id: string;
  name: string;
  slug: string;
  poster: string;
  language: string;
  views: string;
  genres: TagType[];
  keywords: TagType[];
  credit: CastCreditType[];
  cast: CastCreditType[];
  videos: VideoType[];
  description: string;
  created_at: string;
};

export type TitleDetailsType = {
  _id: string;
  id: number;
  name: string;
  type: "movie" | "series" | string;
  tmdb_vote_average: number | null;
  release_date: string;
  year: number;
  description: string;
  genre: string | null;
  tagline: string | null;
  poster?: string ;
  backdrop?: string;
  // poster?: FileList;
  // backdrop?: FileList;
  runtime: number | null;
  trailer: string | null;
  budget: number | null;
  revenue: string | null;
  views: number;
  popularity: number;
  imdb_id: string | null;
  tmdb_id: string | null;
  season_count: number | null;
  fully_synced: boolean;
  allow_update: number | null;
  created_at: string;
  updated_at: string;
  language: string;
  original_title: string;
  affiliate_link: string | null;
  tmdb_vote_count: number | null;
  certification: string | null;
  episode_count: number | null;
  series_ended: boolean;
  is_series: boolean;
  local_vote_average: number | null;
  show_videos: boolean;
  adult: boolean;
  local_vote_count: number;
  is_free: number;
  slug: string;
  genres: TagType[];
  keywords: TagType[];
  country?: TagType[];
  credit: CastCreditType[];
  cast: CastCreditType[];
};

// Person for Additional Tags
export type PersonType = {
  _id: string;
  id: number;
  name: string;
  description: string;
  gender: string | null;
  birth_date: string | null;
  birth_place: string | null;
  poster: string;
  imdb_id: string | null;
  views: number;
  tmdb_id: string | null;
  allow_update: boolean;
  created_at: string;
  updated_at: string;
  fully_synced: boolean;
  known_for: string;
  popularity: number;
  death_date: string | null;
  adult: boolean;
};

export type PeopleType = {
  _id: string;
  name: string;
  description: string;
  gender: string;
  death_date: string;
  birth_date: string;
  birth_place: string;
  poster: string;
  allow_update: string;
  known_for: string;
  popularity: string;
};

// List Type

export type ListType = {
  _id: string;
  id: number;
  name: string;
  description: string | null;
  user_id: string;
  system: boolean;
  public: boolean;
  auto_update: string | null;
  created_at: string;
  updated_at: string;
  style: string | null;
  image: string | null;
  userId: number;
};

// Page Types
export type TransactionType = {
  _id: string;
  user_id: string;
  subscription_id: string;
  stripe_payment_intent_id: string | null;
  stripe_invoice_id: string | null;
  amount: {
    $numberDecimal: string; // string representing decimal number
  };
  currency: string;
  status: string;
  type: string;
  payment_method: string | null;
  paid_at: string; // ISO date string
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  __v?: number;
};

// Page Types
export type PageType = {
  _id: string;
  id: number;
  title: string;
  body: string;
  slug: string;
  meta: string | null;
  type: string;
  created_at: string;
  updated_at: string;
  user_id: number;
  hide_nav: boolean;
  workspace_id: string | null;
};

type NameForPlan = {
  name: string;
};

export type PlanFormValues = {
  _id: string;
  name: string;
  amount: number;
  currency: string;
  currency_symbol: string;
  recommended: string;
  interval: string;
  paypal_id: string;
  interval_count: number;
  features?: Array<NameForPlan>;
};

export type SubscriptionPlanType = {
  _id: string;
  id: string;
  name: string;
  amount: string;
  currency: string;
  currency_symbol: string;
  interval: "month" | "year";
  interval_count?: number;
  parent_id: string | null;
  legacy_permissions: string | null;
  uuid: string;
  paypal_id: string | null;
  recommended: boolean;
  free: boolean;
  show_permissions: boolean;
  features: string[]; // cleaned below
  position: string;
  created_at: string;
  ends_at: string;
  updated_at: string;
  available_space: string | null;
  hidden: boolean;
};

// Review type

export type ReviewType = {
  _id: string;
  id: number;
  score: number;
  reviewable_id: string;
  user_id: {
    _id: string;
    username: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  reviewableId: number;
};

export type reviewFormType = {
  score: number;
  review: string;
};

// Tag Type

export type TagType = {
  _id: string;
  id: string;
  name: string;
  display_name: string;
  type: string;
  created_at: string;
  updated_at: string;
};

export type TagFormValue = {
  _id: string;
  name: string;
  display_name: string;
  type: string;
};

// User Type

export type DecodedUser = {
  _id: string;
  email: string;
  userType: "user" | "admin" | string; // adjust as needed
  full_name: string;
  username: string;
};
export type UserType = {
  userType: "user" | "admin"; // adjust as needed
  _id: string;
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  gender: string;
  phone: string;
  legacy_permissions: unknown | null;
  email: string;
  password: string | null;
  pass: string | null;
  card_brand: string | null;
  card_last_four: string | null;
  remember_token: string | null;
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
  background: string | null;
  language: string;
  country: string;
  timezone: string | null;
  avatar: string;
  stripe_id: string | null;
  available_space: number | null;
  email_verified_at: string | null;
};

// Video Type

export type VideoFormType = {
  _id: string;
  name: string;
  thumbnail: string;
  type: string;
  embed_code: string;
  url: string;
  quality: string;
  language: string;
  title_id: string;
  category: string;
};

export type VideoType = {
  _id: string;
  id: number;
  name: string;
  thumbnail: string | null;
  url: string;
  type: string;
  quality: string | null;
  title_id: number;
  season_num: number | null;
  episode_num: number | null;
  source: string;
  negative_votes: number;
  positive_votes: number;
  reports: number;
  approved: number;
  order: number;
  created_at: string;
  updated_at: string;
  user_id: string;
  language: string;
  category: string;
  episode_id: number | null;
  userId: number;
  video_play: VideoPlayed;
};

export type VideoPlayed = {
  _id: string;
  user_id: string;
  video_id: string;
  time_watched: number;
  created_at: string; // ISO date string
  __v: number;
};

// Filter Types

export type FilterOption = {
  name: string;
  value: string;
};

export type FilterField = {
  type: string;
  placeholder: string;
};

export type FilterItem = {
  name: string;
  key?: string; // Some have `key`, others use `value`
  value?: string;
  option?: FilterOption[];
  field?: FilterField;
  search?: string;
};

export type FilterValues = {
  [key: string]: {
    value?: string;
    value1?: string;
  };
};

// cast Type

export type CastCreditType = {
  _id: string;
  person_id: {
    _id: string;
    name: string;
    poster: string;
    known_for: string;
  };
  creditable_id: string;
  character: string;
  order: number;
  department: string;
  job: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type CastFormType = {
  _id: string;
  creditable_id: string;
  person_id: string;
  character: string;
  order: number;
  department: string;
  job: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
export type UserTag = {
  id: string;
  _id?: string;
  name: string;
  poster?: string; // URL to image
  known_for?: string;
};

export type ApiUserTag = {
  _id: string;
  display_name: string;
};

// Country

export type CountryFormType = {
  person_id: UserTag[];
  taggable_id: string;
  taggable_type: string;
  tag_id: string[];
};

export type CountryType = {
  _id: string;
  id: number;
  name: string;
  display_name: string;
  type: "production_country";
  created_at: string; // ISO date string
  updated_at: string; // ISO date string
};

// Crew Types

export type CrewFormType = {
  person_id: string[];
  job: string;
  department: string;
};

export type CrewTypes = {
  _id: string;
  person_id: {
    _id: string;
    name: string;
    poster: string;
    known_for: string;
  };
  creditable_id: string;
  character: string;
  order: number;
  department: string;
  job: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// import { TvTopicType } from "@/constants/Type"
