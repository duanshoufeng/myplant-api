import User from "../models/user";
import _ from "lodash";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import express, { Request, Response } from "express";
const router = express.Router();

router.post("/", async (req: Request, res: Response) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password.");

  const token = user.generateAuthToken();
  res.send({ user: _.pick(user, ["_id", "name", "email"]), accessToken: token });
});

router.post("/sign-in-with-token", async (req: Request, res: Response) => {
  const token = req.body.accessToken;
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY!);
    req.user = decoded;
    res.send({ user: decoded, accessToken: token });
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
});

function validate(login: { email: string; password: string }) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    rememberMe: Joi.boolean()
  });

  return schema.validate(login);
}

export default router;
