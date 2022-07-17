import { RoomModel } from "../../types/model.types";
import { DataTypes } from "sequelize";
import db from "../services/db.services";
import User from "./user.model";

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

User.hasOne(Room, {
  foreignKey: { name: "firstUserID", allowNull: false },
});

User.hasOne(Room, {
  foreignKey: { name: "secondUserID", allowNull: false },
});

export default Room;
