// catch all express errors
import "express-async-errors";

import winston from "winston";
import logger from "../utils/logger";

export default function logging() {
  logger.exceptions.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/exceptions.log" })
  );

  logger.rejections.handle(
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logs/exceptions.log" })
  );
}
