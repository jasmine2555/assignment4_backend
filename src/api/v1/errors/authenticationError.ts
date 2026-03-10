import { BaseError } from "./baseError";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export class AuthenticationError extends BaseError {
  constructor(
    message = "Unauthorized",
    errorCode = "TOKEN_NOT_FOUND"
  ) {
    super(message, HTTP_STATUS.UNAUTHORIZED, errorCode);
  }
}