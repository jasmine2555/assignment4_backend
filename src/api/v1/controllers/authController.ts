import { Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/httpConstants";

interface SignInBody {
  email: string;
  password: string;
}

export const signIn = (req: Request, res: Response): void => {
  const body: SignInBody = req.body as SignInBody;

  if (body.email === "officer@pixell-river.com" && body.password === "password123") {
    res.status(HTTP_STATUS.OK).json({
      idToken: "officer-token-abc123",
      email: body.email,
      localId: "officer-uid-001",
      expiresIn: "3600",
      refreshToken: "mock-refresh-token",
    });
    return;
  }

  if (body.email === "manager@pixell-river.com" && body.password === "password123") {
    res.status(HTTP_STATUS.OK).json({
      idToken: "manager-token-abc123",
      email: body.email,
      localId: "manager-uid-001",
      expiresIn: "3600",
      refreshToken: "mock-refresh-token",
    });
    return;
  }

  if (body.email === "admin@pixell-river.com" && body.password === "password123") {
    res.status(HTTP_STATUS.OK).json({
      idToken: "admin-token-abc123",
      email: body.email,
      localId: "admin-uid-001",
      expiresIn: "3600",
      refreshToken: "mock-refresh-token",
    });
    return;
  }

  res.status(HTTP_STATUS.UNAUTHORIZED).json({
    success: false,
    error: {
      message: "Unauthorized: Invalid email or password",
      code: "INVALID_CREDENTIALS",
    },
    timestamp: new Date().toISOString(),
  });
};