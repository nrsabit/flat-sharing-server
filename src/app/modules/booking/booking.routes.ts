import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { BookingValidations } from "./booking.validations";
import { BookingControllers } from "./booking.controllers";

const router = express.Router();

router.get("/", auth(["admin"]), BookingControllers.getAllBookingsController);

router.get("/my-bookings", auth(), BookingControllers.getMyBookingsController);

router.post(
  "/",
  auth(),
  validateRequest(BookingValidations.bookingRequestSchema),
  BookingControllers.bookingRequestController
);

router.put(
  "/:bookingId",
  auth(["admin"]),
  validateRequest(BookingValidations.updateStatusSchema),
  BookingControllers.updateBookingController
);

export const BookingRoutes = router;
