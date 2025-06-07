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
