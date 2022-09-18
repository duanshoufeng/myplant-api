import { Express } from "express";
import helmet from "helmet";
import compression from "compression";

export default function prod(app: Express) {
  app.use(helmet());
  app.use(compression());
}
