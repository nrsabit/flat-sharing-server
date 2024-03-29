import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { UserServices } from "./user.services";
import handleResponse from "../../utils/handleResponse";
import httpStatus from "http-status";

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

export const UserControllers = {
  registerController,
  loginController,
};
