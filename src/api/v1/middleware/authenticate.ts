import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors/authenticationError";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AuthenticationError(
          "Unauthorized: No token provided",
          "TOKEN_NOT_FOUND"
        )
      );
    }

    const parts: string[] = authHeader.split(" ");
const token: string = parts[1];

    if (token === "officer-token-abc123") {
      res.locals.user = {
        uid: "officer-uid-001",
        email: "officer@pixell-river.com",
        role: "officer",
      };
      return next();
    }

    if (token === "manager-token-abc123") {
      res.locals.user = {
        uid: "manager-uid-001",
        email: "manager@pixell-river.com",
        role: "manager",
      };
      return next();
    }

    if (token === "admin-token-abc123") {
      res.locals.user = {
        uid: "admin-uid-001",
        email: "admin@pixell-river.com",
        role: "admin",
      };
      return next();
    }

    return next(
      new AuthenticationError(
        "Unauthorized: Invalid token",
        "TOKEN_INVALID"
      )
    );
  } catch (error) {
    return next(
      new AuthenticationError(
        "Unauthorized: Invalid token",
        "TOKEN_INVALID"
      )
    );
  }
};