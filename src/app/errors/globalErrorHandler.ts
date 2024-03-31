import { NextFunction, Request, Response } from "express";
import httpStaus from "http-status";
import zodErrorHandler from "./zodErrorHandler";
import { ZodError } from "zod";

const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = err.message || err.name || "Something went wrong";
  let errorDetails = err as any;

  if (err.name === "ZodError") {
    const { zodMessage, zodIssues } = zodErrorHandler(err as ZodError);
    (message = zodMessage), (errorDetails = { issues: zodIssues });
  }

  if (err.name === "JsonWebTokenError") {
    message = "Unauthorized Access";
  }

  res.status(httpStaus.INTERNAL_SERVER_ERROR).json({
    success: false,
    message,
    errorDetails,
  });
};

export default globalErrorHandler;
