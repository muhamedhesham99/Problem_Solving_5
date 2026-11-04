import { DataTypes, Model } from "sequelize";
import sequelize from "../../config/db.js";

class commentModel extends Model {}

commentModel.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  { sequelize: sequelize, timestamps: true, tableName: "comments" },
);

export default commentModel;
