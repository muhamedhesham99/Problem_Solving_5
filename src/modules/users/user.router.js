import { Router } from "express";
import {
  signUp,
  updateInsertUser,
  userByEmail,
  userByIdExeclude,
} from "./user.controller.js";

const userRouter = Router();

userRouter.get("/health", (req, res) => {
  res.json({ message: "userRouter is running" });
});

userRouter.post("/signUp", signUp);
userRouter.put("/:id", updateInsertUser);
userRouter.get("/by-email", userByEmail);
userRouter.get("/:id", userByIdExeclude);

export default userRouter;
