import { BaseError } from "./baseError";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export class NotFoundError extends BaseError {
  constructor(
    message = "Resource not found",
    errorCode = "NOT_FOUND"
  ) {
    super(message, HTTP_STATUS.NOT_FOUND, errorCode);
  }
}