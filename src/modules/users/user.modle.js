import { DataTypes } from "sequelize";
import sequelize from "../../config/db.js";

const userModel = sequelize.define(
  "user",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error("Password must be greater than 6 characters");
          }
        },
      },
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeCreate: checkNameLength,
    },
  },
);

function checkNameLength(user) {
  if (user.name.length <= 2) {
    throw new Error("The Name must be greater than 2 characters");
  }
}

export default userModel;
