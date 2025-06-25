
import { z } from "zod";

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),

  knownFor: z.string().min(1, "Known For is required"),

  description: z.string().min(1, "Bio is required"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),

  birth_date: z.string().optional(),
  death_date: z.string().optional(),

  popularity: z.string().min(1, "popularity is required."),

  birth_place: z.string().optional(),

  allow_update: z.boolean(),

  image: z.any().nullable(),
});
export type ProfileFormData = z.infer<typeof profileSchema>;

export const videoSchema = z.object({
  name: z.string().min(1, "Name is required"),

  knownFor: z.string().min(1, "Known For is required"),

  description: z.string().min(1, "Bio is required"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),

  birth_date: z.string().optional(),
  death_date: z.string().optional(),

  popularity: z.string().min(1, "popularity is required."),

  birth_place: z.string().optional(),

  allow_update: z.boolean(),

  image: z.any().nullable(),
});
export type VideoFormData = z.infer<typeof videoSchema>;

export const userSchema = z
  .object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),

    email: z.string().min(1, "Email is required"),

    email_confirmed: z.string().min(1, "Email Confirmed is required"),

    user_type: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "User Type is required" }),
    }),

    password: z.string().min(1, "Password is required"),
    password_confirmed: z.string().min(1, "password confimed is required"),
    image: z.any().nullable(),
  })
  .refine((data) => data.password === data.password_confirmed, {
    path: ["password_confirmed"],
    message: "Password do not match",
  });
export type UserFormData = z.infer<typeof userSchema>;

export const pageSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "slug is required"),

  body: z.string().min(1, "body is required"),
});
export type PageFormData = z.infer<typeof pageSchema>;

// Title Forms Data

export const titleSchema = z.object({
  name: z.string().min(1, "Name is required"),

  original_title: z.string().min(1, "original_title is required"),
  type: z.enum(["Tv_topic", "Categories"], {
    errorMap: () => ({ message: "type is required" }),
  }),
  allow_update: z.string().optional(),
  poster: z.any().nullable(),
  backdrop: z.any().nullable(),
  release_date: z.string().min(1, "release_date is required"),
  tagline: z.string().optional(),
  overview: z.string().optional(),
  runtime: z.string().optional(),
  certification: z.string().optional(),
  budget: z.number().optional(),
  revenue: z.string().optional(),
  popularity: z.string().optional(),
  language: z.string().min(1, "language is required"),
  free: z.string().min(1, "free is required"),
});
export type TitleFormData = z.infer<typeof titleSchema>;
