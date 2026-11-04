import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class postModel extends Model {}

postModel.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: sequelize, timestamps: true, tableName: "posts", paranoid: true },
);

export default postModel;
