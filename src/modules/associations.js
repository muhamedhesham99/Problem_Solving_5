import userModel from "./users/user.modle.js";
import postModel from "./posts/post.modle.js";
import commentModel from "./comments/comment.modle.js";

userModel.hasMany(postModel, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

postModel.belongsTo(userModel, {
  foreignKey: "userId",
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});

userModel.hasMany(commentModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

commentModel.belongsTo(userModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

postModel.hasMany(commentModel, {
  foreignKey: "postId",
  onDelete: "CASCADE",
});

commentModel.belongsTo(postModel, {
  foreignKey: "postId",
  as:"post",
  onDelete: "CASCADE",
});
