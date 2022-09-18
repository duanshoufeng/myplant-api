import mongoose from "mongoose";
import logger from "../utils/logger";

export default function db() {
  mongoose.connect(process.env.MONGODB_URL!).then(() => logger.info("Connected to MongoDB..."));
}
