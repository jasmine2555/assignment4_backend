import { BaseError } from "./baseError";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export class AuthorizationError extends BaseError {
  constructor(
    message = "Forbidden: Insufficient role",
    errorCode = "INSUFFICIENT_ROLE"
  ) {
    super(message, HTTP_STATUS.FORBIDDEN, errorCode);
  }
}