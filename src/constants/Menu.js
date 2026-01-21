import {
  CreditCardIcon,
  FolderPlusIcon,
  HomeIcon,
  ShieldCheckIcon,
} from "@heroicons/react/16/solid";
import {
  ArrowRightCircleIcon,
  CalendarIcon, // Pages
  ChartPieIcon,
  Cog6ToothIcon, // Roles
  DocumentTextIcon,
  EyeIcon, // Subscription
  FilmIcon,
  KeyIcon, // People / Users
  ListBulletIcon,
  StarIcon, // Settings
  TagIcon,
  UserCircleIcon, // Reviews
  UserGroupIcon,
  UserIcon, // Video
  UsersIcon,
} from "@heroicons/react/24/outline";



export const baseNavigation = [
  { name: "Home", key: "home", href: "/home" },
  {
    name: "TV Topics",
    key: "tv_topics",
    href: "/browse",
    children: [],
  },
  { name: "Course/Zones", key: "categories", href: "/browse", children: [] },
  { name: "Pricing", key: "price", href: "/account?name=change-plan" },
];

export const userNavigation = [
  { name: "Admin Home", key: "admin_home", href: "/admin", icon: UserIcon },
  { name: "Profile", key: "profile", href: "/account", icon: UserCircleIcon },
  { name: "Watchlist", key: "watchlists", href: "/watchlists", icon: EyeIcon },
  // { name: "Your List", key: "your_list", href: "/lists", icon: ListBulletIcon },
  {
    name: "Account Settings",
    key: "security",
    href: "/account?name=security",
    icon: Cog6ToothIcon,
  },
  {
    name: "Log out",
    key: "logout",
    href: "#",
    icon: ArrowRightCircleIcon,
  },
];


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
  { name: "Video", href: "/admin/videos", icon: FilmIcon, current: false },
  { name: "Lists", href: "/admin/lists", icon: ListBulletIcon, current: false },
  { name: "Reviews", href: "/admin/reviews", icon: StarIcon, current: false },
  { name: "Users", href: "/admin/users", icon: UserGroupIcon, current: false },
  { name: "Pages", href: "/admin/pages", icon: KeyIcon, current: false },
  { name: "Tags", href: "/admin/tags", icon: DocumentTextIcon, current: false },
];

export const navigationSettings = [
  { name: "General", href: "/admin/settings", current: true },
  { name: "Content", href: "/admin/settings/content", current: false },
  {
    name: "Authentication",
    href: "/admin/settings/authentication",
    current: false,
  },
  { name: "Analytics", href: "/admin/settings/analytics", current: false },
];

export const navigationAccount = [
  { name: "Overview", href: "/account", icon: HomeIcon },
  {
    name: "Membership",
    href: "/account?name=membership",
    icon: CreditCardIcon,
  },
  { name: "Security", href: "/account?name=security", icon: ShieldCheckIcon },
  {
    name: "Watchlist",
    href: "/watchlists",
    icon: FolderPlusIcon,
  },
];

export const navigationTitleSubMenu = [
  { name: "Primary Facts", href: "general" },
  { name: "Videos", href: "videos" },
  { name: "Cast", href: "cast" },
  { name: "Crew", href: "crew" },
  { name: "Categories", href: "genres" },
  { name: "TV Topics", href: "keywords" },
  { name: "Countries", href: "countries" },
  { name: "Reviews", href: "reviews" },
];

export const WhitePages = ["/account", "/register", "/pricing"];

export const NoBGPages = ["/", "/home", "/login", "/forgot-password"];

export const slidesCountry = [
  {
    name: "Australia",
    image: "regions/PCE-AUS.png",
    url: "https://projectcontrolexpo.com/aus",
  },
  {
    name: "Brazil",
    image: "regions/PCE-BRAZIL.png",
    url: "https://projectcontrolexpo.com/brazil",
  },
  {
    name: "United Arab Emirates",
    image: "regions/PCE-UAE.png",
    url: "https://projectcontrolexpo.com/dubai",
  },
  {
    name: "United Kingdom",
    image: "regions/PCE-UK.png",
    url: "https://projectcontrolexpo.com/uk",
  },
  {
    name: "United States",
    image: "regions/PCE-USA.png",
    url: "https://projectcontrolexpo.com/usa",
  },
  {
    name: "Virtual",
    image: "regions/PCE-VIRTUAL.png",
    url: "https://projectcontrolexpo.com/virtual",
  },
];
