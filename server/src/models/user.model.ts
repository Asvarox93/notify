import { UserModel } from "../../types/model.types";
import { DataTypes } from "sequelize";
import db from "../services/db.services";

const User = db.define<UserModel>("User", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  refToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

export default User;
