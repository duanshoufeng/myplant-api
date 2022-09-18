import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

export default function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error({ message: err.message, stack: err.stack, meta: err });
  res.status(500).send("Somthing failed.");
}
