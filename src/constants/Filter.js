
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