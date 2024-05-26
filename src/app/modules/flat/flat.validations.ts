import { z } from "zod";

const createFlatSchema = z.object({
  totalBedrooms: z.number({
    required_error: "Total Bedrooms is Required",
    invalid_type_error: "Total bedrooms must be number",
  }),
  location: z.string({
    required_error: "Location is Required",
    invalid_type_error: "Location must be string",
  }),
  amenities: z.string({
    required_error: "Amenities is Required",
    invalid_type_error: "Amenities must be string",
  }),
  description: z.string({
    required_error: "Description is Required",
    invalid_type_error: "Description must be string",
  }),
  rent: z.number({
    required_error: "Rent is Required",
    invalid_type_error: "Rent must be number",
  }),
});

const updateFlatSchema = z.object({
  totalBedrooms: z
    .number({
      invalid_type_error: "Total bedrooms must be number",
    })
    .optional(),
  location: z
    .string({
      invalid_type_error: "Location must be string",
    })
    .optional(),
  description: z
    .string({
      invalid_type_error: "Description must be string",
    })
    .optional(),
  amenities: z
    .string({
      invalid_type_error: "Amenities must be string",
    })
    .optional(),
  rent: z
    .number({
      invalid_type_error: "Rent must be number",
    })
    .optional(),
});

export const FlatValidations = {
  createFlatSchema,
  updateFlatSchema,
};
