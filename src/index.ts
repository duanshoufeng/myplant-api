import dotenv from "dotenv";
dotenv.config();

import logger from "./utils/logger";
import db from "./startup/db";
import routes from "./startup/routes";
import config from "./startup/config";
import prod from "./startup/prod";
import express from "express";
const app = express();

config();
routes(app);
db();
prod(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
