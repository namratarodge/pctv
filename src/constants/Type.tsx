export type TvTopicType = {
  name: string;
  display_name: string;
};

// Titles Types

export type TitleType = {
  _id: string;
  name: string;
  slug: string;
  poster: string;
  language: string;
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
  poster: string;
  backdrop: string;
  runtime: number | null;
  trailer: string | null;
  budget: number | null;
  revenue: number | null;
  views: number;
  popularity: number;
  imdb_id: string | null;
  tmdb_id: string | null;
  season_count: number | null;
  fully_synced: boolean;
  allow_update: boolean;
  created_at: string;
  updated_at: string;
  language: string;
  country: string | null;
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
  is_free: boolean;
  slug: string;
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

export type SubscriptionPlanType = {
  _id: string;
  id: string;
  name: string;
  amount: string;
  currency: string;
  currency_symbol: string;
  interval: string;
  interval_count: string;
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
  updated_at: string;
  available_space: string | null;
  hidden: boolean;
};

// Review

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
  name: string;
  display_name: string;
  type: string;
  created_at: string;
  updated_at: string;
  __v: number;
};

export type TagFormValue = {
  name: string;
  display_name: string;
  type: string;
};

// User Type 

export type UserType = {
    userType: "user";
    _id: string;
    id: number;
    username: string | null;
    first_name: string | null;
    last_name: string | null;
    avatar_url: string | null;
    gender: string | null;
    legacy_permissions: unknown | null;
    email: string;
    password: string;
    card_brand: string | null;
    card_last_four: string | null;
    remember_token: string | null;
    created_at: string; // ISO date string
    updated_at: string; // ISO date string
    background: string | null;
    language: string;
    country: string;
    timezone: string | null;
    avatar: string | null;
    stripe_id: string | null;
    available_space: number | null;
    email_verified_at: string | null;
  };


  // Video Type 

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

// import { TvTopicType } from "@/constants/Type"
