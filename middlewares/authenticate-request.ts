import dotenv from "dotenv";
import type { NextFunction, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { AuthenticatedRequest } from "../interfaces/request.interface";
import type { IReqUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";

dotenv.config();

// Extend Express Request type to include authenticated user

export const authenticateToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.startsWith("Bearer ")
      ? authHeader.split(" ")[1]
      : null;

    if (!token) {
      res
        .status(401)
        .jsend.fail({ code: 401, message: "Missing Bearer token" });
      return;
    }

    const secret = process.env.ACCESS_SECRET;
    if (!secret) throw new Error("JWT secret not configured");

    const decoded = jwt.verify(token, secret) as JwtPayload;

    // Securely look up the user in the database
    const user = await User.findById(decoded.id);

    if (!user) {
      res
        .status(401)
        .jsend.fail({ code: 401, message: "User not found or deleted" });
      return;
    }
    const {
      verification_token,
      isVerified,
      valid_for,
      password,
      pass_salt,
      ...other
    } = user.toObject();
    const userInReq: IReqUser = { ...other };
    req.user = userInReq;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res
      .status(401)
      .jsend.fail({ code: 401, message: "Invalid or expired token" });
    return;
  }
};
