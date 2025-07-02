import {
  HomeIcon,
  Cog6ToothIcon, // Settings
  TagIcon, // Additional Tags
  CalendarIcon, // Plans
  CreditCardIcon, // Subscription
  FilmIcon, // Video
  UsersIcon, // People / Users
  NewspaperIcon, // News
  ListBulletIcon, // Lists
  StarIcon, // Reviews
  ChatBubbleBottomCenterTextIcon, // Comments
  UserGroupIcon, // Users
  KeyIcon, // Roles
  DocumentTextIcon, // Pages
  ChartPieIcon, // Title (or Analytics)
  UserCircleIcon,
  LockClosedIcon,
  BookmarkIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";

export const navigation = [
  { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Cog6ToothIcon,
    current: false,
  },
  {
    name: "Additional Tags",
    href: "/admin/additional-tags",
    icon: TagIcon,
    current: false,
  },
  { name: "Plans", href: "/admin/plans", icon: CalendarIcon, current: false },
  {
    name: "Subscription",
    href: "/admin/subscriptions",
    icon: CreditCardIcon,
    current: false,
  },
  { name: "Titles", href: "/admin/titles", icon: ChartPieIcon, current: false },
  { name: "People", href: "/admin/people", icon: UsersIcon, current: false },
  { name: "News", href: "#", icon: NewspaperIcon, current: false },
  { name: "Video", href: "/admin/videos", icon: FilmIcon, current: false },
  { name: "Lists", href: "/admin/lists", icon: ListBulletIcon, current: false },
  { name: "Reviews", href: "/admin/reviews", icon: StarIcon, current: false },
  {
    name: "Comments",
    href: "#",
    icon: ChatBubbleBottomCenterTextIcon,
    current: false,
  },
  { name: "Users", href: "/admin/users", icon: UserGroupIcon, current: false },
  { name: "Pages", href: "/admin/pages", icon: KeyIcon, current: false },
  { name: "Tags", href: "/admin/tags", icon: DocumentTextIcon, current: false },
];
export const teams = [
  { id: 1, name: "Heroicons", href: "#", initial: "H", current: false },
  { id: 2, name: "Tailwind Labs", href: "#", initial: "T", current: false },
  { id: 3, name: "Workcation", href: "#", initial: "W", current: false },
];

export const navigationSettings = [
  { name: "General", href: "/admin/settings", current: true },
  { name: "Content", href: "/admin/settings/content", current: false },
  { name: "Localization", href: "/", current: false },
  {
    name: "Authentication",
    href: "/admin/settings/authentication",
    current: false,
  },
  { name: "Uploading", href: "#", current: false },
  { name: "Mail", href: "#", current: false },
  { name: "Cache", href: "#", current: false },
  { name: "Analytics", href: "/admin/settings/analytics", current: false },
  { name: "Logging", href: "#", current: false },
  { name: "Recaptcha", href: "/admin/settings/recaptcha", current: false },
];

export const navigationAccount = [
  { name: "Overview", href: "/account", icon: HomeIcon },
  { name: "Membership", href: "/account?name=membership", icon: UserCircleIcon },
  { name: "Security", href: "/account?name=security", icon: LockClosedIcon },
  {
    name: "Watchlist",
    href: "/watchlists",
    icon: BookmarkIcon,
  },
];

export const navigationTitleSubMenu = [
  { name: "Primary Facts", href: "general" },
  { name: "Seasons", href: "seasons" },
  { name: "Images", href: "images" },
  { name: "Videos", href: "videos" },
  { name: "Cast", href: "cast" },
  { name: "Crew", href: "crew" },
  { name: "Categories", href: "genres" },
  { name: "TV Topics", href: "keywords" },
  { name: "Countries", href: "countries" },
  { name: "Reviews", href: "reviews" },
];
