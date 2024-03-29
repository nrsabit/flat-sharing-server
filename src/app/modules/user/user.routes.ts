import validateRequest from "../../utils/validateRequest";
import { UserControllers } from "./user.controllers";
import express from "express";
import { UserValidations } from "./user.validations";

const router = express.Router();

router.post(
  "/register",
  validateRequest(UserValidations.createUserSchema),
  UserControllers.registerController
);

router.post(
  "/login",
  validateRequest(UserValidations.loginUserSchema),
  UserControllers.loginController
);

export const UserRoutes = router;
