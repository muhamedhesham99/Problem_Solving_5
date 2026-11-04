import { findUserById } from "../users/user.service.js";
import {
  createPost,
  deletePost,
  findPostById,
  getAllPosts,
  PostsCommentCount,
} from "./post.service.js";

export const createPosts = async (req, res) => {
  const inputs = req.body;
  const user = await findUserById(inputs.userId);
  if (!user) return res.status(404).json({ message: `this userId not found` });
  try {
    const post = createPost(inputs);
    await post.save();
    res.status(201).json({ message: "Post is created successfully", post });
  } catch (err) {
    throw new Error(err);
  }
};

export const deletePosts = async (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;

  try {
    const postExist = await findPostById(postId);
    if (!postExist) return res.status(404).json({ message: "Post not found" });
    if (postExist.userId !== Number(userId))
      return res
        .status(403)
        .json({ message: "Your aren't authorized to delete this post" });
    await deletePost(postId);
    return res.json({
      message: "Post Deleted Successfully",
    });
  } catch (err) {
    throw new Error(err);
  }
};

export const allPosts = async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.json({ message: "All posts get successfully", posts });
  } catch (err) {
    throw new Error(err);
  }
};

export const PostsHasCommentsCount = async (req, res) => {
  try {
    const posts = await PostsCommentCount();
    res.json({ message: "All posts get successfully", posts });
  } catch (err) {
    throw new Error(err);
  }
};
