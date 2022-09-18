import Product, { validateProduct } from "../models/products";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  throw new Error("could not get the products.");
  const products = await Product.find().populate("customer", "name -_id").select("name customer").sort("name");
  res.send(products);
});

router.get("/:id", async (req: Request, res: Response) => {
  const product = await Product.findById(req.params.id);

  if (!product) return res.status(404).send("The customer with the given ID is not found.");

  res.send(product);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = new Product({
    name: req.body.name,
    customer: req.body.customerId,
    status: req.body.status,
  });
  await product.save();

  res.send(product);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      customer: req.body.customer,
      status: req.body.status,
    },
    { new: true }
  );

  if (!product) return res.status(404).send("The customer with the given ID is not found.");

  res.send(product);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const product = await Product.findByIdAndRemove(req.params.id);

  if (!product) return res.status(404).send("The customer with the given ID is not found.");

  res.send(product);
});

export default router;
