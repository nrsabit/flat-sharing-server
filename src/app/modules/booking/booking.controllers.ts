import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";
import { BookingServices } from "./booking.services";

const bookingRequestController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await BookingServices.bookingRequest(user, req.body);

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Booking requests submitted successfully",
      data: result,
    });
  }
);

const getAllBookingsController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await BookingServices.getAllBookingsService();

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking requests retrieved successfully",
      data: result,
    });
  }
);

const updateBookingController = catchAsync(
  async (req: Request, res: Response) => {
    const { bookingId } = req.params;
    const result = await BookingServices.updateBookingService(
      bookingId,
      req.body
    );

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Booking request updated successfully",
      data: result,
    });
  }
);

export const BookingControllers = {
  bookingRequestController,
  getAllBookingsController,
  updateBookingController,
};
