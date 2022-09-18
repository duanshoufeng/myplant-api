import mongoose from "mongoose";
import Joi from "joi";

interface Customer {
  name: string;
  city: string;
  date?: Date;
}

const Customer = mongoose.model(
  "Customer",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50, trim: true },
    city: { type: String, required: true, minlength: 5, maxlength: 50, trim: true },
    date: { type: Date, default: Date.now },
  })
);

function validateCustomer(customer: Customer) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    city: Joi.string().min(5).max(50).required(),
    date: Joi.date(),
  });

  return schema.validate(customer);
}

export { Customer as default, validateCustomer };
