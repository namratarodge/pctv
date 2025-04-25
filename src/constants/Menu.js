import {
    HomeIcon,
    Cog6ToothIcon,           // Settings
    TagIcon,                 // Additional Tags
    CalendarIcon,            // Plans
    CreditCardIcon,          // Subscription
    FilmIcon,                // Video
    UsersIcon,               // People / Users
    NewspaperIcon,           // News
    ListBulletIcon,          // Lists
    StarIcon,                // Reviews
    ChatBubbleBottomCenterTextIcon, // Comments
    UserGroupIcon,           // Users
    KeyIcon,                 // Roles
    DocumentTextIcon,        // Pages
    FolderIcon,              // You already used this
    DocumentDuplicateIcon,   // Already used
    ChartPieIcon,            // Title (or Analytics)
  } from "@heroicons/react/24/outline";
  
  export const navigation = [
    { name: "Dashboard", href: "/admin", icon: HomeIcon, current: true },
    { name: "Settings", href: "/admin/settings", icon: Cog6ToothIcon, current: false },
    { name: "Additional Tags", href: "/admin/additional-tags", icon: TagIcon, current: false },
    { name: "Plans", href: "/admin/plans", icon: CalendarIcon, current: false },
    { name: "Subscription", href: "/admin/subscriptions", icon: CreditCardIcon, current: false },
    { name: "Titles", href: "/admin/titles", icon: ChartPieIcon, current: false },
    { name: "People", href: "/admin/people", icon: UsersIcon, current: false },
    { name: "News", href: "#", icon: NewspaperIcon, current: false },
    { name: "Video", href: "/admin/videos", icon: FilmIcon, current: false },
    { name: "Lists", href: "/admin/lists", icon: ListBulletIcon, current: false },
    { name: "Reviews", href: "/admin/reviews", icon: StarIcon, current: false },
    { name: "Comments", href: "#", icon: ChatBubbleBottomCenterTextIcon, current: false },
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
    { name: "Authentication", href: "#", current: false },
    { name: "Uploading", href: "#", current: false },
    { name: "Mail", href: "#", current: false },
    { name: "Cache", href: "#", current: false },
    { name: "Analytics", href: "#", current: false },
    { name: "Logging", href: "#", current: false },
    { name: "Recaptcha", href: "#", current: false },
  ];