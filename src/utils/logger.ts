import "express-async-errors";
import winston from "winston";
import "winston-mongodb";

const transports = [
  new winston.transports.Console(),
  new winston.transports.File({ filename: "logs/all.log" }),
  new winston.transports.File({
    filename: "logs/error.log",
    level: "error",
  }),
  new winston.transports.MongoDB({
    db: process.env.MONGODB_URL!,
    level: "error",
    options: { useUnifiedTopology: true },
    collection: "logs",
    capped: true,
    metaKey: "meta",
  }),
];

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.prettyPrint()
  ),
  transports,
  // exitOnError: false,
  exceptionHandlers: transports,
  rejectionHandlers: transports,
});

export default logger;
