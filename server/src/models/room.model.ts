import { RoomModel, UserModel } from "../../types/models.types";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";

const roomModel = (db: Sequelize, user: ModelStatic<UserModel>) => {
  const Room = db.define<RoomModel>("Room", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    secondUserID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomUid: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  user.hasOne(Room, {
    foreignKey: { name: "firstUserID", allowNull: false },
  });

  user.hasOne(Room, {
    foreignKey: { name: "secondUserID", allowNull: false },
  });

  return Room;
};

export default roomModel;
