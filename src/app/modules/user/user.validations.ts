import { z } from "zod";

const createUserSchema = z.object({
  name: z.string({
    required_error: "Name is Required",
    invalid_type_error: "Name must be string",
  }),
  email: z.string({
    required_error: "Email is Required",
    invalid_type_error: "Email must be string",
  }),
  password: z.string({
    required_error: "Password is Required",
    invalid_type_error: "Password must be string",
  }),
  bio: z.string({
    required_error: "Bio is Required",
    invalid_type_error: "Bio must be string",
  }),
  profession: z.string({
    required_error: "Profession is Required",
    invalid_type_error: "Profession must be string",
  }),
  address: z.string({
    required_error: "Address is Required",
    invalid_type_error: "Address must be string",
  }),
});

export const UserValidations = {
  createUserSchema,
};
