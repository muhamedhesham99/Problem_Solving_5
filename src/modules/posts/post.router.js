import { Router } from "express";
import {
  allPosts,
  createPosts,
  deletePosts,
  PostsHasCommentsCount,
} from "./post.controller.js";

const postRouter = Router();

postRouter.get("/health", (req, res) => {
  res.json({ message: "postRouter is running" });
});

postRouter.post("", createPosts);
postRouter.delete("/:postId", deletePosts);
postRouter.get("/details", allPosts);
postRouter.get("/comment-count", PostsHasCommentsCount);

export default postRouter;
