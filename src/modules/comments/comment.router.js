import { Router } from "express";
import {
  createComments,
  findCommentBySearch,
  findOrInsertComment,
  getCommentDetails,
  getNewestPostComments,
  updateComment,
} from "./comment.controller.js";

const commentRouter = Router();

commentRouter.get("/health", (req, res) => {
  res.json({ message: "commentRouter is running" });
});
commentRouter.post("", createComments);
commentRouter.patch("/:commentId", updateComment);
commentRouter.post("/find-or-create", findOrInsertComment);
commentRouter.get("/search", findCommentBySearch);
commentRouter.get("/newest/:postId", getNewestPostComments);
commentRouter.get("/details/:id", getCommentDetails);

export default commentRouter;
