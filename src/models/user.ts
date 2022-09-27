import { Model, Schema, model } from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";

interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  date?: Date;
}

interface IUserMethods {
  generateAuthToken(): string;
}

type UserModel = Model<IUser, {}, IUserMethods>;

const userSchema = new Schema<IUser, UserModel, IUserMethods>({
  name: { type: String, required: true, minlength: 5, maxlength: 50, trim: true },
  email: { type: String, required: true, minlength: 5, maxlength: 255, unique: true, trim: true },
  password: { type: String, required: true, minlength: 5, maxlength: 1024 },
  isAdmin: Boolean,
  date: { type: Date, default: Date.now }
});

userSchema.method("generateAuthToken", function generateAuthToken() {
  return jwt.sign({ _id: this._id, name: this.name, email: this.email, isAdmin: this.isAdmin }, process.env.JWT_KEY!);
});

const User = model<IUser, UserModel>("User", userSchema);

function validateUser(user: IUser) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
    date: Joi.date()
  });

  return schema.validate(user);
}

export { User as default, validateUser };
