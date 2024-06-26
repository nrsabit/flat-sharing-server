import express, { NextFunction, Request, Response } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FlatValidations } from "./flat.validations";
import { FlatControllers } from "./flat.controllers";
import auth from "../../middlewares/auth";
import { fileUploader } from "../../utils/fileUploader";

const router = express.Router();

router.get("/", FlatControllers.getAllFlatsController);

router.get("/my-flats", auth(), FlatControllers.getMyFlatsController);

router.get("/:id", FlatControllers.getSingleFlatController);


router.post(
  "/",
  auth(),
  fileUploader.upload.array("files"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = FlatValidations.createFlatSchema.parse(
      JSON.parse(req.body.data)
    );
    return FlatControllers.createFlatController(req, res, next);
  }
);

router.put(
  "/:flatId",
  auth(),
  validateRequest(FlatValidations.updateFlatSchema),
  FlatControllers.updateFlatController
);

router.delete("/:id", auth(), FlatControllers.deleteFlatController);

export const FlatRoutes = router;
