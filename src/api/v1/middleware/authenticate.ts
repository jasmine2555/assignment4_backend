import { NextFunction, Request, Response } from "express";
import admin from "../../config/firebase";
import { AuthenticationError } from "../errors/authenticationError";
import { AuthUser } from "../types/expressTypes";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader: string | undefined = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(
        new AuthenticationError(
          "Unauthorized: No token provided",
          "TOKEN_NOT_FOUND",
        ),
      );
    }

    const token: string = authHeader.split(" ")[1];

    const decodedToken = await admin.auth().verifyIdToken(token);

    const user: AuthUser = {
      uid: decodedToken.uid,
      email: decodedToken.email,
      role: decodedToken.role,
    };

    res.locals.user = user;
    next();
  } catch (error) {
    next(
      new AuthenticationError(
        "Unauthorized: Invalid token",
        "TOKEN_INVALID",
      ),
    );
  }
};