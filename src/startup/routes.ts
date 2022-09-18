import errorHandler from "../middleware/error";
import home from "../routes/home";
import users from "../routes/users";
import auth from "../routes/auth";
import customers from "../routes/customers";
import products from "../routes/products";
import express, { Express } from "express";

export default function routes(app: Express) {
  app.use(express.json());
  app.use("/", home);
  app.use("/users", users);
  app.use("/auth", auth);
  app.use("/customers", customers);
  app.use("/products", products);

  app.use(errorHandler);
}
