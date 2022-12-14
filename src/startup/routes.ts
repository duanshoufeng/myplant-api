import express, { Express } from "express";
import compression from "compression";
import cors from "cors";
import errorHandler from "../middleware/error";
import home from "../routes/home";
import users from "../routes/users";
import auth from "../routes/auth";
import customers from "../routes/customers";
import products from "../routes/products";
import posts from "../routes/posts";

export default function routes(app: Express) {
  app.use(compression());
  app.use(cors());
  app.use(express.json());
  app.use(express.static("src/public"));
  app.use("/", home);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/customers", customers);
  app.use("/products", products);
  app.use("/posts", posts);

  app.use(errorHandler);
}
