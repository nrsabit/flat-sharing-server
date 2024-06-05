import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";
import { TUserPayload } from "./user.types";

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await UserServices.getAllUsersService();

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Users retrieved successfully",
      data: result,
    });
  }
);

const registerController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerService(req.body);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "User registered successfully",
    data: result,
  });
});

const loginController = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.loginService(req.body);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: result,
  });
});

const changePasswordController = catchAsync(
  async (req: Request & { user?: TUserPayload }, res: Response) => {
    const user = req.user;

    const result = await UserServices.changePasswordService(
      user as TUserPayload,
      req.body
    );

    handleResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Password Changed successfully",
      data: result,
    });
  }
);

const editProfileController = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const result = await UserServices.editProfileService(req.user, req.body);

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Profile Updated Successfully",
      data: result,
    });
  }
);

const updateStatusController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserServices.updateUserStatus(id, req.body);

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User Updated Successfully",
      data: result,
    });
  }
);

export const UserControllers = {
  getAllUsersController,
  registerController,
  loginController,
  changePasswordController,
  editProfileController,
  updateStatusController,
};
