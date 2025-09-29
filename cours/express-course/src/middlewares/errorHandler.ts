import { ExtendsError } from "../types/ExtendsError";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: ExtendsError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.statusCode) {
    return res.status(error.statusCode).json({ error: error.error.message });
  }

  res.status(500).json({ error: "Internal server error" });
};
