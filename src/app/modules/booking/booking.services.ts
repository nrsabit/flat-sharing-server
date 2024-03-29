import { Booking } from "@prisma/client";
import prisma from "../../shared/prisma";

const bookingRequest = async (user: any, payload: Partial<Booking>) => {
  const { id } = user;
  const bookingData = {
    userId: id as string,
    flatId: payload.flatId as string,
  };

  const result = await prisma.booking.create({
    data: bookingData,
  });

  return result;
};

const getAllBookingsService = async () => {
  const result = await prisma.booking.findMany();

  return result;
};

const updateBookingService = async (id: string, payload: Partial<Booking>) => {
  const result = await prisma.booking.update({
    where: { id },
    data: payload,
  });

  return result;
};

export const BookingServices = {
  bookingRequest,
  getAllBookingsService,
  updateBookingService
};
