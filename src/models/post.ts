import mongoose from "mongoose";
import Joi from "joi";

interface Post {
  title: string;
  content: string;
  date?: Date;
}

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    title: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
      trim: true
    },
    content: {
      type: String,
      required: true
    },
    date: { type: Date, default: Date.now }
  })
);

function validatePost(post: Post) {
  const schema = Joi.object({
    title: Joi.string().min(5).max(50).required(),
    content: Joi.string().required(),
    date: Joi.date()
  });

  return schema.validate(post);
}

export { Post as default, validatePost };
