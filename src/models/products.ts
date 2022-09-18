import mongoose from "mongoose";
import Joi from "joi";

interface Product {
  name: string;
  customer: string;
  status: string;
  date?: Date;
}

const Product = mongoose.model(
  "Product",
  new mongoose.Schema({
    name: { type: String, required: true, minlength: 5, maxlength: 50, trim: true },
    customer: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Customer" },
    status: { type: String, required: true, minlength: 5, maxlength: 50 },
    date: { type: Date, default: Date.now },
  })
);

function validateProduct(customer: Product) {
  const schema = Joi.object({
    name: Joi.string().min(5).max(50).required(),
    customerId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required(),
    status: Joi.string().min(5).max(50).required(),
    date: Joi.date(),
  });

  return schema.validate(customer);
}

export { Product as default, validateProduct };
