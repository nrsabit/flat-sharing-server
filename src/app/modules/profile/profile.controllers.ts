import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ProfileServices } from "./profile.services";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";

const getUserProfileController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await ProfileServices.getUserProfileService(user);

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile retrieved successfully",
      data: result,
    });
  }
);

const updateUserProfileController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const user = req.user;
    const result = await ProfileServices.updateUserProfileService(
      user,
      req.body
    );

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User profile updated successfully",
      data: result,
    });
  }
);

export const ProfileControllers = {
  getUserProfileController,
  updateUserProfileController,
};
