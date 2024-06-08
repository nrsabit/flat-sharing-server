import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controllers";
import express from "express";
import { UserValidations } from "./user.validations";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", auth(["admin"]), UserControllers.getAllUsersController);

router.get("/me", auth(), UserControllers.getMeController);

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

router.put(
  "/update-profile",
  auth(),
  validateRequest(UserValidations.updateProfileSchema),
  UserControllers.editProfileController
);

router.put(
  "/update-status/:id",
  auth(["admin"]),
  validateRequest(UserValidations.updateUserStatus),
  UserControllers.updateStatusController
);

export const UserRoutes = router;
