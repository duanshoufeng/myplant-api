import { Request, Response, NextFunction } from "express";

export default function admin(req: Request, res: Response, next: NextFunction) {
  if (!req.user.isAdmin) return res.status(403).send("Access denied.");

  next();
}
