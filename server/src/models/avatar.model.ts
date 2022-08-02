import { ModelStatic } from "sequelize/types";
import { AvatarModel, UserModel } from "../../types/models.types";
import { DataTypes, Sequelize } from "sequelize";

const avatarModel = (db: Sequelize, user: ModelStatic<UserModel>) => {
  const Avatar = db.define<AvatarModel>("Avatar", {
    userID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    filename: { type: DataTypes.STRING, allowNull: false },
    filepath: { type: DataTypes.STRING, allowNull: false },
    mimetype: { type: DataTypes.STRING },
    size: { type: DataTypes.BIGINT },
  });
  user.hasOne(Avatar, {
    foreignKey: { name: "userID", allowNull: false },
  });
  return Avatar;
};

export default avatarModel;
