import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import logger from "../utils/logger";
// import { AppError } from "../errors/AppError";

export const errorMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error(`[${err.name}] ${err.message}`, { stack: err.stack });

  console.error(`[Error] ${err.name}: ${err.message}`);

  if (err.stack) console.error(err.stack);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(400).json({ message: err.message, code: err.code });
  }

  //   if (err instanceof AppError) {
  //     return res.status(err.statusCode).json({ message: err.message });
  //   }

  return res.status(500).json({
    message: "Internal Server Error",
    detail: err.message || "Something went wrong",
  });
};
