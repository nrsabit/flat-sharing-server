import { BokingStatus } from "@prisma/client";
import { z } from "zod";

const bookingRequestSchema = z.object({
  flatId: z.string({
    required_error: "Flat Id is Required",
    invalid_type_error: "Flat Id must be string",
  }),
  additionalInformation: z.string({
    required_error: "Additional Info is Required",
    invalid_type_error: "Additional Info must be string",
  }),
});

const updateStatusSchema = z.object({
  status: z.enum(
    [BokingStatus.APPROVED, BokingStatus.PENDING, BokingStatus.REJECTED],
    {
      required_error: "Status is Required",
      invalid_type_error: "Status must be PENDING, BOOKED or REJECTED",
    }
  ),
});

export const BookingValidations = {
  bookingRequestSchema,
  updateStatusSchema,
};
