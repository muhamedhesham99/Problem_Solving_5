import { Op } from "sequelize";
import commentModel from "./comment.modle.js";
import userModel from "../users/user.modle.js";
import postModel from "../posts/post.modle.js";

export const createBulkOfComments = async (comments) => {
  const commented = await commentModel.bulkCreate(comments);
  return commented;
};

export const updateTheComment = async (content, commentId) => {
  await commentModel.update(
    { content },
    {
      where: { id: commentId },
    },
  );
};

export const getCommentWithUserId = async (commentId) => {
  const comment = await commentModel.findOne({ where: { id: commentId } });
  return comment;
};

export const findCommentOrInsert = async (inputs) => {
  const { userId, postId, content } = inputs;
  const findInsertComment = await commentModel.findOrCreate({
    where: { userId, postId, content },
    defaults: { userId, postId, content },
  });
  return findInsertComment;
};

export const findAndCountAllComments = async (word) => {
  const comment = await commentModel.findAndCountAll({
    where: {
      content: {
        [Op.like]: `%${word}%`,
      },
    },
  });
  return comment;
};

export const newestComments = async (postId) => {
  const getNewestCommentsPost = await commentModel.findAll({
    where: { postId },
    order: [["createdAt", "DESC"]],
    limit: 3,
  });
  return getNewestCommentsPost;
};

export const commentDetails = async (commentId) => {
  const comment = await commentModel.findByPk(commentId, {
    attributes: ["id", "content"],
    include: [
      {
        model: userModel,
        attributes: ["id", "name", "email"],
      },
      {
        model: postModel,
        as: "post",
        attributes: ["id", "title", "content"],
      },
    ],
  });
  return comment;
};
