import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from "../errors/authorizationError";
import { UserRole } from "../types/expressTypes";

export const authorize = (allowedRoles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const role: UserRole | undefined = res.locals.user?.role;

    if (!role) {
      return next(
        new AuthorizationError(
          "Forbidden: Role not found",
          "ROLE_NOT_FOUND",
        ),
      );
    }

    if (!allowedRoles.includes(role)) {
      return next(
        new AuthorizationError(
          "Forbidden: Insufficient role",
          "INSUFFICIENT_ROLE",
        ),
      );
    }

    next();
  };
};import { NextFunction, Request, Response } from "express";
import { AuthorizationError } from "../errors/authorizationError";

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = res.locals.user;

    if (!user || !user.role) {
      return next(
        new AuthorizationError(
          "Forbidden: Role not found",
          "ROLE_NOT_FOUND"
        )
      );
    }

    if (!allowedRoles.includes(user.role)) {
      return next(
        new AuthorizationError(
          "Forbidden: Insufficient role",
          "INSUFFICIENT_ROLE"
        )
      );
    }

    next();
  };
};