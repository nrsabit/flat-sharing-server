import { z } from "zod";

const updateProfileSchema = z.object({
  bio: z
    .string({
      invalid_type_error: "Bio must be string",
    })
    .optional(),
  profession: z
    .string({
      invalid_type_error: "Profession must be string",
    })
    .optional(),
  address: z
    .string({
      invalid_type_error: "Address must be string",
    })
    .optional(),
});

export const ProfileValidations = {
  updateProfileSchema,
};
