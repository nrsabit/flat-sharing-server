import { NextFunction, Request, Response } from "express";
import httpStaus from "http-status";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(httpStaus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: err.message || "Something went wrong",
    error: err,
  });
};

export default globalErrorHandler;
