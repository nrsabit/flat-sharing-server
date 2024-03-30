import express from "express";
import auth from "../../middlewares/auth";
import { ProfileControllers } from "./profile.controllers";
import validateRequest from "../../middlewares/validateRequest";
import { ProfileValidations } from "./profile.validations";

const router = express.Router();

router.get("/", auth(), ProfileControllers.getUserProfileController);

router.put(
  "/",
  auth(),
  validateRequest(ProfileValidations.updateProfileSchema),
  ProfileControllers.updateUserProfileController
);

export const ProfileRoutes = router;
