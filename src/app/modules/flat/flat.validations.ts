import { z } from "zod";

const createFlatSchema = z.object({
  squareFeet: z.number({
    required_error: "Square Feet is Required",
    invalid_type_error: "Square Feet must be number",
  }),
  totalBedrooms: z.number({
    required_error: "Total Bedrooms is Required",
    invalid_type_error: "Total bedrooms must be number",
  }),
  totalRooms: z.number({
    required_error: "Total rooms is Required",
    invalid_type_error: "Total rooms must be number",
  }),
  utilitiesDescription: z.string({
    required_error: "Utilities Description is Required",
    invalid_type_error: "Utilities Description must be string",
  }),
  location: z.string({
    required_error: "Location is Required",
    invalid_type_error: "Location must be string",
  }),
  description: z.string({
    required_error: "Description is Required",
    invalid_type_error: "Description must be string",
  }),
  rent: z.number({
    required_error: "Rent is Required",
    invalid_type_error: "Rent must be number",
  }),
  advanceAmount: z.number({
    required_error: "Advance Amount is Required",
    invalid_type_error: "Advance Amount must be number",
  }),
});

const updateFlatSchema = z.object({
  squareFeet: z
    .number({
      invalid_type_error: "Square Feet must be number",
    })
    .optional(),
  totalBedrooms: z
    .number({
      invalid_type_error: "Total bedrooms must be number",
    })
    .optional(),
  totalRooms: z
    .number({
      invalid_type_error: "Total rooms must be number",
    })
    .optional(),
  utilitiesDescription: z
    .string({
      invalid_type_error: "Utilities Description must be string",
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
  rent: z
    .number({
      invalid_type_error: "Rent must be number",
    })
    .optional(),
  advanceAmount: z
    .number({
      invalid_type_error: "Advance Amount must be number",
    })
    .optional(),
});

export const FlatValidations = {
  createFlatSchema,
  updateFlatSchema,
};
