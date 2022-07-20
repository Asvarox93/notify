import { MessageModel, UserModel } from "../../types/models.types";
import { DataTypes, ModelStatic, Sequelize } from "sequelize";

const messageModel = (db: Sequelize, user: ModelStatic<UserModel>) => {
  const Message = db.define<MessageModel>("Message", {
    ID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    senderID: { type: DataTypes.INTEGER },
    receiverID: { type: DataTypes.INTEGER },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  user.hasOne(Message, {
    foreignKey: { name: "senderID", allowNull: false },
  });

  user.hasOne(Message, {
    foreignKey: { name: "receiverID", allowNull: false },
  });

  return Message;
};

export default messageModel;
