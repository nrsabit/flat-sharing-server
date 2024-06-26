import { Booking } from "@prisma/client";
import prisma from "../../shared/prisma";
import { TUserPayload } from "../user/user.types";

const bookingRequest = async (user: any, payload: Partial<Booking>) => {
  const { id } = user;
  const bookingData = {
    userId: id as string,
    flatId: payload.flatId as string,
    additionalInformation: payload?.additionalInformation as string,
  };

  const result = await prisma.booking.create({
    data: bookingData,
  });

  return result;
};

const getAllBookingsService = async () => {
  const result = await prisma.booking.findMany({
    include: { flat: true, user: true },
  });

  return result;
};

const getMyBookingsService = async (user: TUserPayload) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: { email: user?.email, isActive: true },
  });

  const result = await prisma.booking.findMany({
    where: { userId: userInfo.id },
    include: { flat: true },
  });

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
  getMyBookingsService,
  updateBookingService,
  getAllBookingsService,
};
