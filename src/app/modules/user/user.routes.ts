import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controllers";
import express from "express";
import { UserValidations } from "./user.validations";
import auth from "../../middlewares/auth";

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

router.post(
  "/change-password",
  auth(),
  validateRequest(UserValidations.changePasswordSchema),
  UserControllers.changePasswordController
);

export const UserRoutes = router;
