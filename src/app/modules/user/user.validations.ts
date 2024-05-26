import { z } from "zod";

const createUserSchema = z.object({
  userName: z.string({
    required_error: "User Name is Required",
    invalid_type_error: "User Name must be string",
  }),
  email: z.string({
    required_error: "Email is Required",
    invalid_type_error: "Email must be string",
  }),
  password: z.string({
    required_error: "Password is Required",
    invalid_type_error: "Password must be string",
  }),
});

const loginUserSchema = z.object({
  email: z.string({
    required_error: "Email is Required",
    invalid_type_error: "Email must be string",
  }),
  password: z.string({
    required_error: "Password is Required",
    invalid_type_error: "Password must be string",
  }),
});

const changePasswordSchema = z.object({
  oldPassword: z.string({
    required_error: "Old Password is Required",
    invalid_type_error: "Old Password must be string",
  }),
  newPassword: z.string({
    required_error: "New Password is Required",
    invalid_type_error: "New Password must be string",
  }),
});

export const UserValidations = {
  createUserSchema,
  loginUserSchema,
  changePasswordSchema,
};
