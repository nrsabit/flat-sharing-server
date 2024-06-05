import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import handleResponse from "../../utils/handleResponse";
import { FlatServices } from "./flat.services";
import httpStatus from "http-status";
import validateParams from "../../utils/validateParams";
import { flatFilterableFields } from "./flat.constants";
import { paginationOptions } from "../../shared/global.constants";
import { TUserPayload } from "../user/user.types";

const createFlatController = catchAsync(
  async (req: Request & { user?: TUserPayload }, res: Response) => {
    const result = await FlatServices.createFlatService(
      req.user as TUserPayload,
      req
    );

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "Flat added successfully",
      data: result,
    });
  }
);

const getAllFlatsController = catchAsync(
  async (req: Request, res: Response) => {
    const queryObj = validateParams(req.query, flatFilterableFields);
    const options = validateParams(req.query, paginationOptions);
    const result = await FlatServices.getAllFlatsService(queryObj, options);

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Flats retrieved successfully",
      meta: result.meta,
      data: result.result,
    });
  }
);

const getSingleFlatController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await FlatServices.getSingleFlatService(id);

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Single Flat retrieved successfully",
      data: result,
    });
  }
);

const getMyFlatsController = catchAsync(
  async (req: Request & { user?: TUserPayload }, res: Response) => {
    const result = await FlatServices.getMyFlatsService(
      req.user as TUserPayload
    );

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "My Flats retrieved successfully",
      data: result,
    });
  }
);

const updateFlatController = catchAsync(async (req: Request, res: Response) => {
  const { flatId } = req.params;
  const result = await FlatServices.updateFlatService(flatId, req.body);

  handleResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Flat information updated successfully",
    data: result,
  });
});

const deleteFlatController = catchAsync(
  async (req: Request & { user?: TUserPayload }, res: Response) => {
    const { id } = req.params;
    const result = await FlatServices.deleteFlatService(
      req.user as TUserPayload,
      id
    );

    handleResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Flat deleted successfully",
      data: result,
    });
  }
);

export const FlatControllers = {
  createFlatController,
  getAllFlatsController,
  getSingleFlatController,
  getMyFlatsController,
  updateFlatController,
  deleteFlatController,
};
