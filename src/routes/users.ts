import auth from "../middleware/auth";
import User, { validateUser } from "../models/user";
import _ from "lodash";
import bcrypt from "bcrypt";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/me", auth, async (req: Request, res: Response) => {
  const user = await User.findById(req.user._id).select("-password");
  res.send(_.pick(user, ["_id", "name", "email"]));
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  res.header("x-auth-token", token).send(_.pick(user, ["_id", "name", "email"]));
});

export default router;
