import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

const notFoundError = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API NOT FOUND",
  });
};

export default notFoundError;
