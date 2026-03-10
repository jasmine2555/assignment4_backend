import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";
import { BaseError } from "../errors/baseError";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  if (err instanceof BaseError) {
    res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.errorCode,
      },
      timestamp: new Date().toISOString(),
    });
    return;
  }

  res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
    success: false,
    error: {
      message: "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    },
    timestamp: new Date().toISOString(),
  });
};