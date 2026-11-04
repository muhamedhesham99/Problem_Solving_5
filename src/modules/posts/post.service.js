import userModel from "../users/user.modle.js";
import postModel from "./post.modle.js";
import commentModel from "./../comments/comment.modle.js";
import { col, fn } from "sequelize";
export const createPost = (inputs) => {
  const { title, content, userId } = inputs;
  const post = new postModel({
    title,
    content,
    userId,
  });
  return post;
};

export const deletePost = async (id) => {
  const deletedPost = await postModel.destroy({ where: { id } });
  return deletedPost;
};

export const findPostById = async (id) => {
  const post = await postModel.findByPk(id);
  return post;
};

export const getAllPosts = async () => {
  const posts = await postModel.findAll({
    attributes: ["id", "title"],
    include: [
      {
        model: userModel,
        attributes: ["id", "name"],
      },
      {
        model: commentModel,
        attributes: ["id", "content"],
      },
    ],
  });
  return posts;
};

export const PostsCommentCount = async () => {
  console.log({ postModel, commentModel });
  const posts = await postModel.findAll({
    attributes: [
      "id",
      "title",
      [fn("COUNT", col("commentModels.id")), "commentsCount"],
    ],
    include: [{ model: commentModel, attributes: [] }],
    group: ["postModel.id"],
  });
  return posts;
};
