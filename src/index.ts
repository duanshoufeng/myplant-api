// load .env file into process.env
// will never modify any environment variables that have already been set
import * as dotenv from "dotenv";
dotenv.config();

import logging from "./startup/logging";
import db from "./startup/db";
import routes from "./startup/routes";
import config from "./startup/config";
import logger from "./utils/logger";
import express from "express";
const app = express();

logging();
config();
routes(app);
db();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
