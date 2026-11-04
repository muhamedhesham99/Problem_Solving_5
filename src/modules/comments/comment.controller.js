import { findPostById } from "../posts/post.service.js";
import { findUserById } from "../users/user.service.js";
import {
  commentDetails,
  createBulkOfComments,
  findAndCountAllComments,
  findCommentOrInsert,
  getCommentWithUserId,
  newestComments,
  updateTheComment,
} from "./comment.service.js";

export const createComments = async (req, res) => {
  const { comments } = req.body;
  try {
    const commented = await createBulkOfComments(comments);
    res
      .status(201)
      .json({ message: "Comments Created seccssfully", commented });
  } catch (err) {
    res.status(400).json({ message: "user id or post id has fault value" });
  }
};

export const updateComment = async (req, res) => {
  const { userId, content } = req.body;
  const { commentId } = req.params;
  try {
    const comment = await getCommentWithUserId(commentId);
    if (!comment) return res.status(404).json({ message: "Comment Not Found" });
    if (comment.userId !== Number(userId))
      return res
        .status(403)
        .json({ message: "you aren't authorized to update this comment" });
    await updateTheComment(content, commentId);
    res.json({ message: "Comment Updated" });
  } catch (err) {
    throw new Error(err);
  }
};

export const findOrInsertComment = async (req, res) => {
  const { ...inputs } = req.body;
  try {
    const user = await findUserById(inputs.userId);
    if (!user) return res.status(404).json({ message: "User Not Found" });
    const post = await findPostById(inputs.postId);
    if (!post) return res.status(404).json({ message: "Post Not Found" });
    const [comment, created] = await findCommentOrInsert(inputs);
    if (!created)
      return res.json({ message: "Comment Successfully Retrive", comment });
    res.status(201).json({ message: "Created Comment Successfully", comment });
  } catch (err) {
    throw new Error(err);
  }
};

export const findCommentBySearch = async (req, res) => {
  const { word } = req.query;
  try {
    const { count, rows } = await findAndCountAllComments(word);
    res.json({ message: "Successfully get the result of search", count, rows });
  } catch (err) {
    throw new Error(err);
  }
};

export const getNewestPostComments = async (req, res) => {
  const { postId } = req.params;
  try {
    const comments = await newestComments(postId);
    if (!comments[0])
      return res.status(404).json({ message: "No Comments or Post Found" });
    res.json({ message: "Get the 3 newest comments", comments });
  } catch (err) {
    throw new Error(err);
  }
};

export const getCommentDetails = async (req, res) => {
  const { id: commentId } = req.params;
  try {
    const comment = await commentDetails(commentId);
    if (!comment) return res.status(404).json({ message: "No Comment Found" });
    res.json({ message: "Comment Details", comment });
  } catch (err) {
    throw new Error(err);
  }
};
