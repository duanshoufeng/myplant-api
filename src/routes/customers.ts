import auth from "../middleware/auth";
import admin from "../middleware/admin";
import Customer, { validateCustomer } from "../models/customer";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

router.get("/:id", async (req: Request, res: Response) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("The customer with the given ID is not found.");

  res.send(customer);
});

router.post("/", auth, async (req: Request, res: Response) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = new Customer({
    name: req.body.name,
    city: req.body.city,
  });
  await customer.save();

  res.send(customer);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      city: req.body.city,
    },
    { new: true }
  );

  if (!customer) return res.status(404).send("The customer with the given ID is not found.");

  res.send(customer);
});

router.delete("/:id", [auth, admin], async (req: Request, res: Response) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send("The customer with the given ID is not found.");

  res.send(customer);
});

export default router;
