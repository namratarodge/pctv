import { z } from "zod";

export const listsUpSchema = z.object({
  name: z.string().min(1, "name is required"),
  public: z.enum(["true", "false"]),

  description: z.string().min(1, "description is required"),
});
export type ListFormData = z.infer<typeof listsUpSchema>;

export const userUpdateSchema = z.object({
  first_name: z.string().min(1, "First Name is required"),
  last_name: z.string().min(1, "Last Name is required"),
  email: z.string().min(1, "email is required"),
  gender: z.string().min(1, "Gender is required"),
  country: z.string().min(1, "Country is required"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(11, "Phone number must be at most 11 digits")
    .regex(
      /^\+?[0-9]{7,15}$/,
      "Phone number must contain only digits and may start with +"
    ),
});
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;

// change password
export const userChangePasswordSchema = z
  .object({
    old_password: z.string().min(1, "Old Password is required"),
    new_password: z
      .string()
      .min(6, "New Password must be at least 6 characters"),
    new_enter_password: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters"),
  })
  .refine((data) => data.new_password === data.new_enter_password, {
    path: ["new_enter_password"],
    message: "Passwords do not match",
  });
export type UserChangePasswordFormData = z.infer<
  typeof userChangePasswordSchema
>;

export const userSignUpSchema = z.object({
  first_name: z
    .string()
    .min(1, "First Name is required")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "First Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  last_name: z
    .string()
    .min(1, "Last Name is required")
    .regex(
      /^[A-Za-z\s'-]+$/,
      "Last Name can only contain letters, spaces, hyphens, and apostrophes"
    ),

  email: z.string().min(1, "Email is required").email("Invalid email address"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(11, "Phone number must be at most 11 digits")
    .regex(
      /^\+?[0-9]{7,15}$/,
      "Phone number must contain only digits and may start with +"
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(12, "Password must be at most 12 characters"),
});
export type UserSignUpFormData = z.infer<typeof userSignUpSchema>;

export const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),

  known_for: z.string().min(1, "Known For is required"),

  description: z.string().min(1, "Bio is required"),

  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Gender is required" }),
  }),

  birth_date: z.string().optional().nullable(),
  // death_date: z.string().optional().nullable(),
  company_name: z.string().optional().nullable(),

  // popularity: z.string().optional().nullable(),
  popularity: z.number().optional(),

  birth_place: z.string().optional(),

  allow_update: z.boolean(),

  image: z.any().nullable(),
});
export type ProfileFormData = z.infer<typeof profileSchema>;

export const videoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.string().min(1, "type is required"),
  title_id: z.string().min(1, "title is required"),
  url: z.string(),
  quality: z.string(),
  language: z.string(),
  category: z.string(),
});
export type VideoFormData = z.infer<typeof videoSchema>;

export const createUserSchema = z
  .object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),

    email: z.string().min(1, "Email is required"),

    email_confirmed: z.string().min(1, "Email Confirmed is required"),

    userType: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "User Type is required" }),
    }),

    password: z.string().min(1, "Password is required"),
    password_confirmed: z.string().min(1, "password confimed is required"),
  })
  .refine((data) => data.password === data.password_confirmed, {
    path: ["password_confirmed"],
    message: "Password do not match",
  });

export const editUserSchema = z
  .object({
    first_name: z.string().min(1, "First Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
    email: z.string().min(1, "Email is required"),
    email_confirmed: z.string().optional(),
    userType: z.enum(["user", "admin"], {
      errorMap: () => ({ message: "User Type is required" }),
    }),
    password: z.string().optional(),
    password_confirmed: z.string().optional(),
  })
  .refine(
    (data) => !data.password || data.password === data.password_confirmed,
    {
      path: ["password_confirmed"],
      message: "Passwords do not match",
    }
  );
export type CreateUserFormData = z.infer<typeof createUserSchema>;
export type EditUserFormData = z.infer<typeof editUserSchema>;

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
  allow_update: z.number(),

  poster: z.any().nullable(),
  backdrop: z.any().nullable(),
  release_date: z.string().min(1, "release_date is required"),
  tagline: z.string().optional(),
  overview: z.string().optional(),
  runtime: z.string().optional(),
  certification: z.string().optional(),

  budget: z.number().optional(),
  revenue: z.number().optional(),
  
  popularity: z.number().optional(),

  language: z.string().min(1, "language is required"),
  is_free: z.number(),
});
export type TitleFormData = z.infer<typeof titleSchema>;
