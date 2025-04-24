import { Currencies } from "@/constants/Main";

export const fields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Enter plan name",
  },
  {
    type: "select",
    name: "parentPlan",
    label: "Parent Plan",
    options: [
      { label: "Plan", value: "plan" },
      { label: "Plan 2", value: "plan2" },
      { label: "Plan 3", value: "plan3" },
    ],
    helperText:
      "Used for creating yearly, weekly etc versions of base plan. Child plans will inherit their parent permissions/features.",
  },
  {
    type: "select",
    name: "currency",
    label: "Currency",
    options: Currencies.map((c) => ({ label: c.name, value: c.value })),
  },
  {
    type: "select",
    name: "Interval",
    label: "Interval",
    options: [
      { label: "Monthly", value: "monthly" },
      { label: "Yearly", value: "yearly" },
      { label: "Weekly", value: "weekly" },
    ],
  },
];

export const TagsFields = [
  {
    type: "text",
    name: "name",
    label: "Name",
    placeholder: "Enter plan name",
    helperText:
      "Unique tag identifier.",
  },
  {
    type: "text",
    name: "display_name",
    label: "Display Name",
    placeholder: "Enter plan name",
    helperText:
      "User friendly tag name.",
  },
  {
    type: "select",
    name: "type",
    label: "Type",
    options: [
      { label: "TV Topic", value: "plan" },
      { label: "Categories", value: "plan2" },
      { label: "Production Country", value: "plan3" },
      { label: "Custom", value: "plan31" },
    ]
  },
];
