import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import auth from "../../middlewares/auth";
import { BookingValidations } from "./booking.validations";
import { BookingControllers } from "./booking.controllers";

const router = express.Router();

router.get(
  "/booking-requests",
  auth(),
  BookingControllers.getAllBookingsController
);

router.post(
  "/booking-applications",
  auth(),
  validateRequest(BookingValidations.bookingRequestSchema),
  BookingControllers.bookingRequestController
);

router.put(
  "/booking-requests/:bookingId",
  auth(),
  validateRequest(BookingValidations.updateStatusSchema),
  BookingControllers.updateBookingController
);

export const BookingRoutes = router;
