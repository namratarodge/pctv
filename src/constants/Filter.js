const numberOptions = [
  { name: "is", value: "=" },
  { name: "is not", value: "!=" },
  { name: "is greater than", value: ">" },
  { name: "is greater than or equal to", value: ">=" },
  { name: "is less than", value: "<" },
  { name: "is less than or equal to", value: "<=" },
];

export const filterType = [
  {
    name: "Type",
    value: "Type",
    option: [
      { name: "All", value: "All" },
      { name: "Bug", value: "Bug" },
      { name: "Feature", value: "Feature" },
      { name: "Task", value: "Task" },
      { name: "Improvement", value: "Improvement" },
    ],
  },
  {
    name: "Status",
    value: "Status",
    option: [
      { name: "All", value: "All" },
      { name: "Open", value: "Open" },
      { name: "In Progress", value: "In Progress" },
      { name: "Closed", value: "Closed" },
    ],
  },
  {
    name: "Created",
    value: "Date",
    option: [
      { name: "is", value: "=" },
      { name: "is not", value: "!=" },
      { name: "is greater than ", value: "<" },
      { name: "is greater than or equal to", value: "=<" },
      { name: "is less than ", value: ">" },
      { name: "is less than or equal to", value: ">=" },
    ],
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
  {
    name: "Revenue",
    value: "Revenue",
    option: [
      { name: "is", value: "is" },
      { name: "is not", value: "is not" },
      { name: "is greater than ", value: "is greater than" },
      { name: "is greater than or equal to", value: "is on or before" },
      { name: "is less than ", value: "is less than" },
      { name: "is less than or equal to", value: "is on or before" },
    ],
    field: {
      type: "number",
      placeholder: "Enter revenue",
    },
  },
  {
    name: "Tags",
    value: "Tags",
  },
  {
    name: "Assigned to",
    value: "Assigned to",
  },
];

export const AdditionalTagFilter = [
  {
    name: "Image",
    key: "poster",
    option: [
      { name: "Has Image", value: "Yes" },
      { name: "Doesn't have Image", value: "No" },
    ],
    search: "name",
  },
  {
    name: "Known For",
    key: "knownFor",
    option: [
      { name: "Acting", value: "Acting" },
      { name: "Directing", value: "Directing" },
      { name: "Art", value: "Art" },
      { name: "Camera", value: "Camera" },
    ],
  },
  {
    name: "Birthday",
    key: "birthday",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
  {
    name: "Views",
    key: "views",
    option: numberOptions,
    field: {
      type: "number",
      placeholder: "Enter View",
    },
  },
  {
    name: "Created At",
    key: "created_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];

export const SubscriptionsFilter = [
  {
    name: "Status",
    key: "status",
    option: [
      { name: "Active", value: "yes" },
      { name: "Cancelled", value: "no" },
    ],
    search: "name",
  },
  {
    name: "Gateway",
    key: "Gateway",
    option: [
      { name: "Stripe", value: "Stripe" },
      { name: "Paypal", value: "Paypal" },
      { name: "None", value: "None" },
    ],
  },
  {
    name: "Created At",
    key: "created_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];

export const TitleFilter = [
  {
    name: "Release Date",
    key: "release_date",
    field: {
      type: "date",
      placeholder: "Select date",
    },
    search: "name",
  },
  {
    name: "Views",
    key: "views",
    field: {
      type: "number",
      placeholder: "Enter View",
    },
  },
  {
    name: "Created At",
    key: "created_at",
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];

export const PeopleFilter = [
  {
    name: "Email",
    key: "email",
    option: [
      { name: "Confirmed", value: "Yes" },
      { name: "Not Confirmed", value: "No" },
    ],
    search: "name",
  },
  {
    name: "Subscribed",
    key: "subscribed",
    option: [
      { name: "Yes", value: "yes" },
      { name: "No", value: "no" },
    ],
  },
  {
    name: "Created At",
    key: "created_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];

export const VideoFilter = [
  {
    name: "Type",
    key: "type",
    option: [
      { name: "All", value: "all" },
      { name: "Embed", value: "embed" },
      { name: "Direct Video", value: "direct_video" },
      { name: "Frame", value: "frame" },
      { name: "Remote Link", value: "remote_link" },
    ],
    search: "name",
  },
  {
    name: "Status",
    key: "approved",
    option: [
      { name: "Approved", value: "1" },
      { name: "Not Approved", value: "0" },
    ],
  },
  {
    name: "Created At",
    key: "created_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];

export const TagsfilterType = [
  {
    name: "Type",
    key: "type",
    option: [
      { name: "TV Topic", value: "keyword" },
      { name: "categories", value: "genre" },
      { name: "Production Country", value: "production_country" },
      { name: "Custom", value: "custom" },
    ],
  },
  {
    name: "Created At",
    key: "created_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
  {
    name: "Updated At",
    key: "updated_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];

export const ReviewfilterType = [
  {
    name: "Type",
    key: "type",
    option: [
      { name: "Review", value: "review" },
      { name: "Rating", value: "rating" },
    ],
    search: "name",
  },
  {
    name: "Created At",
    key: "created_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
  {
    name: "Updated At",
    key: "updated_at",
    option: numberOptions,
    field: {
      type: "date",
      placeholder: "Select date",
    },
  },
];
