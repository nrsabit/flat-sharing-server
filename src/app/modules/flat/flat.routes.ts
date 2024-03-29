import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FlatValidations } from "./flat.validations";
import { FlatControllers } from "./flat.controllers";
import auth from "../../middlewares/auth";

const router = express.Router();

router.get("/", FlatControllers.getAllFlatsController);

router.post(
  "/",
  auth(),
  validateRequest(FlatValidations.createFlatSchema),
  FlatControllers.createFlatController
);

router.put(
  "/:flatId",
  auth(),
  validateRequest(FlatValidations.updateFlatSchema),
  FlatControllers.updateFlatController
);

export const FlatRoutes = router;
