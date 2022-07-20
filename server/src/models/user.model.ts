import { UserModel } from "../../types/models.types";
import { DataTypes, Sequelize } from "sequelize";

// class User extends
const userModel = (db: Sequelize) => {
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

  return User;
};

export default userModel;
