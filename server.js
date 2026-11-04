import express from "express";
import userRouter from "./src/modules/users/user.router.js";
import postRouter from "./src/modules/posts/post.router.js";
import commentRouter from "./src/modules/comments/comment.router.js";

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);
app.use((req, res) => {
  res.status(404).json({ message: "This page not found" });
});
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "Internal Server Error",
    error: err.message,
  });
});

export default app;
