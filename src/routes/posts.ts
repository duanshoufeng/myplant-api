import Post, { validatePost } from "../models/post";
import express, { Request, Response } from "express";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  const posts = await Post.find().select("title content").sort("title");
  res.send(posts);
});

router.get("/:id", async (req: Request, res: Response) => {
  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID is not found.");

  res.send(post);
});

router.post("/", async (req: Request, res: Response) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  await post.save();

  res.send(post);
});

router.put("/:id", async (req: Request, res: Response) => {
  const { error } = validatePost(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const post = await Post.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      content: req.body.content
    },
    { new: true }
  );

  if (!post)
    return res.status(404).send("The post with the given ID is not found.");

  res.send(post);
});

router.delete("/:id", async (req: Request, res: Response) => {
  const post = await Post.findByIdAndRemove(req.params.id);

  if (!post)
    return res.status(404).send("The post with the given ID is not found.");

  res.send(post);
});

export default router;
